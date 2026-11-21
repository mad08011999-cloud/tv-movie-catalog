/* Catalog edit mode: remove / undo entries via sources/removed.json (GitHub Contents API).
   The GitHub token is kept only in this browser's localStorage and is never written to the repo. */
(function () {
  const REPO_OWNER = 'mad08011999-cloud';
  const REPO_NAME = 'tv-movie-catalog';
  const BRANCH = 'main';
  const FILE_PATH = 'sources/removed.json';
  const TOKEN_KEY = 'tvmc-github-token';
  const EDIT_KEY = 'tvmc-edit-mode';
  const API = 'https://api.github.com';
  const MAX_RETRIES = 5;

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function catalogKind() {
    if (window.__catalogUI && window.__catalogUI.kind) return window.__catalogUI.kind;
    const p = location.pathname;
    if (/\/reads(\/|$)/.test(p)) return 'reads';
    if (/\/adult(\/|$)/.test(p)) return 'adult';
    return 'main';
  }
  function rootPrefix() { return catalogKind() === 'main' ? '' : '../'; }
  function token() { return (localStorage.getItem(TOKEN_KEY) || '').trim(); }
  function editOn() { return localStorage.getItem(EDIT_KEY) === '1' && !!token(); }

  function toast(msg, kind) {
    let box = $('#edit-toasts');
    if (!box) {
      box = document.createElement('div');
      box.id = 'edit-toasts';
      box.className = 'edit-toasts';
      box.setAttribute('aria-live', 'polite');
      document.body.appendChild(box);
    }
    const el = document.createElement('div');
    el.className = 'edit-toast' + (kind ? ' ' + kind : '');
    el.textContent = msg;
    box.appendChild(el);
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 400); }, 4200);
  }

  function setMode(on) {
    if (on && !token()) on = false;
    localStorage.setItem(EDIT_KEY, on ? '1' : '0');
    document.body.classList.toggle('edit-mode', !!on);
    const btn = $('#editModeBtn');
    if (btn) {
      btn.setAttribute('aria-pressed', String(!!on));
      btn.textContent = on ? 'Edit mode on' : 'Edit mode';
    }
    const tools = $('#editTools');
    if (tools) tools.hidden = !on;
    refreshRemovedCount();
  }

  function encodeContent(obj) {
    const json = JSON.stringify(obj, null, 2) + '\n';
    const bytes = new TextEncoder().encode(json);
    let bin = '';
    bytes.forEach(b => { bin += String.fromCharCode(b); });
    return { json, b64: btoa(bin) };
  }

  async function api(path, opts) {
    const t = token();
    const headers = Object.assign({
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    }, opts && opts.headers);
    if (t) headers.Authorization = 'Bearer ' + t;
    const res = await fetch(API + path, Object.assign({}, opts, { headers }));
    let body = null;
    const text = await res.text();
    try { body = text ? JSON.parse(text) : null; } catch (e) { body = { message: text }; }
    return { res, body };
  }

  function emptyDoc() {
    return {
      description: 'Owner-removed entries from the published webpage. Applied by scripts/apply_removed.py on every catalog build (and by the apply-removed GitHub Action after this file changes) so later research passes and other bots cannot resurrect them. Stable key: catalog (main, reads, or adult) plus card id, together with title and year. Each item may include a \'record\' snapshot so Undo can restore the card without a full muse.ai sync. Never store tokens in this file.',
      entries: []
    };
  }

  async function getRemovedFile() {
    const { res, body } = await api(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${encodeURIComponent(BRANCH)}`
    );
    if (res.status === 404) return { sha: null, doc: emptyDoc() };
    if (!res.ok) {
      const err = new Error((body && body.message) || ('GitHub error ' + res.status));
      err.status = res.status;
      throw err;
    }
    const raw = atob(String(body.content || '').replace(/\s+/g, ''));
    const bytes = Uint8Array.from(raw, c => c.charCodeAt(0));
    const text = new TextDecoder().decode(bytes);
    let doc;
    try { doc = JSON.parse(text); } catch (e) { doc = emptyDoc(); }
    if (!Array.isArray(doc.entries)) doc.entries = [];
    return { sha: body.sha, doc };
  }

  async function putRemovedFile(doc, sha, message) {
    const { b64 } = encodeContent(doc);
    const payload = { message: message, content: b64, branch: BRANCH };
    if (sha) payload.sha = sha;
    return api(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  async function commitChange(mutator, message) {
    let lastErr = null;
    for (let i = 0; i < MAX_RETRIES; i++) {
      const { sha, doc } = await getRemovedFile();
      const next = mutator(JSON.parse(JSON.stringify(doc)));
      if (!next) return { skipped: true, doc };
      const { res, body } = await putRemovedFile(next, sha, message);
      if (res.ok) return { doc: next, body };
      if (res.status === 409 || res.status === 422) {
        lastErr = new Error('Conflict, retrying…');
        continue;
      }
      const err = new Error((body && body.message) || ('GitHub error ' + res.status));
      err.status = res.status;
      throw err;
    }
    throw lastErr || new Error('Could not save after several retries (the file was being updated by someone else).');
  }

  function snapshot(entry) {
    if (!entry) return null;
    const out = {};
    Object.keys(entry).forEach(k => {
      if (k.charAt(0) === '_') return;
      out[k] = entry[k];
    });
    return out;
  }

  function itemKey(it) {
    return [it.catalog || 'main', it.id, it.title, it.year].join('\0');
  }

  function sameItem(a, b) {
    if ((a.catalog || 'main') !== (b.catalog || 'main')) return false;
    if (a.id != null && b.id != null && Number(a.id) === Number(b.id)) return true;
    return a.title === b.title && String(a.year || '') === String(b.year || '');
  }

  let removedCache = [];

  function refreshRemovedCount() {
    const n = removedCache.filter(e => (e.catalog || 'main') === catalogKind()).length;
    const all = removedCache.length;
    const btn = $('#removedListBtn');
    if (btn) btn.textContent = all ? `Removed (${all})` : 'Removed (0)';
    const panel = $('#removedPanel');
    if (panel && !panel.hidden) renderRemovedPanel();
    return n;
  }

  function renderRemovedPanel() {
    const panel = $('#removedPanel');
    if (!panel) return;
    const kind = catalogKind();
    const here = removedCache.filter(e => (e.catalog || 'main') === kind);
    const other = removedCache.filter(e => (e.catalog || 'main') !== kind);
    let html = '<div class="removed-head"><strong>Removed entries</strong><button type="button" class="edit-x" data-close-removed aria-label="Close">Close</button></div>';
    if (!removedCache.length) html += '<p class="removed-empty">Nothing is on the removal list.</p>';
    else {
      html += '<ul class="removed-list">';
      here.forEach(e => {
        const label = (e.title || '(untitled)') + (e.year ? ' (' + e.year + ')' : '');
        html += `<li><span>${esc(label)}</span><button type="button" class="undo-entry" data-catalog="${esc(e.catalog || kind)}" data-id="${esc(e.id)}" data-title="${esc(e.title || '')}" data-year="${esc(e.year || '')}">Undo</button></li>`;
      });
      other.forEach(e => {
        const label = (e.title || '(untitled)') + (e.year ? ' (' + e.year + ')' : '') + ' · ' + (e.catalog || 'main');
        html += `<li class="other"><span>${esc(label)}</span><button type="button" class="undo-entry" data-catalog="${esc(e.catalog || 'main')}" data-id="${esc(e.id)}" data-title="${esc(e.title || '')}" data-year="${esc(e.year || '')}">Undo</button></li>`;
      });
      html += '</ul>';
    }
    panel.innerHTML = html;
  }

  async function refreshRemovedFromRepo() {
    try {
      const url = rootPrefix() + FILE_PATH + '?t=' + Date.now();
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) return;
      const doc = await res.json();
      removedCache = Array.isArray(doc.entries) ? doc.entries : [];
      applyLocalDrops();
      refreshRemovedCount();
    } catch (e) { /* pages may not have the file yet on a first local serve; ignore */ }
  }

  function applyLocalDrops() {
    const ui = window.__catalogUI;
    if (!ui || !ui.dropIds) return;
    const kind = catalogKind();
    const ids = removedCache.filter(e => (e.catalog || 'main') === kind && e.id != null).map(e => e.id);
    const titles = removedCache.filter(e => (e.catalog || 'main') === kind);
    if (ui.dropMatching) ui.dropMatching(titles);
    else if (ids.length) ui.dropIds(ids);
  }

  function publicLabel(entry) {
    return (entry.title || 'this entry') + (entry.year ? ' (' + entry.year + ')' : '');
  }

  async function removeEntry(entry) {
    if (!editOn()) return;
    const label = publicLabel(entry);
    if (!confirm('Remove “' + label + '” from the catalog?\n\nThis saves the change to the repository. The card will disappear here immediately, and the live site usually updates within 1–2 minutes.')) return;
    const ui = window.__catalogUI;
    if (ui && ui.dropIds) ui.dropIds([entry.id]);
    toast('Saving removal of “' + label + '”…', 'saving');
    const item = {
      catalog: catalogKind(),
      id: entry.id,
      title: entry.title,
      year: entry.year || '',
      removed_at: new Date().toISOString(),
      record: snapshot(entry)
    };
    try {
      const result = await commitChange(doc => {
        doc.entries = doc.entries || [];
        if (doc.entries.some(e => sameItem(e, item))) return null;
        doc.entries.push(item);
        return doc;
      }, 'Remove catalog entry: ' + label);
      removedCache = (result.doc && result.doc.entries) || removedCache.concat([item]);
      refreshRemovedCount();
      toast('Saved. Rebuild in progress — the live page usually updates in 1–2 minutes.', 'ok');
    } catch (err) {
      if (ui && ui.restore && entry) ui.restore([entry]);
      const msg = err && err.status === 401
        ? 'GitHub rejected the token. Check that it is a fine-grained token with Contents: Read and write on tv-movie-catalog, then paste it again.'
        : (err && err.message) || 'Could not save the removal.';
      toast('Error: ' + msg, 'err');
    }
  }

  async function undoEntry(spec) {
    if (!editOn()) return;
    const label = (spec.title || 'this entry') + (spec.year ? ' (' + spec.year + ')' : '');
    toast('Restoring “' + label + '”…', 'saving');
    try {
      let restored = null;
      const result = await commitChange(doc => {
        const before = doc.entries || [];
        const stay = [];
        before.forEach(e => {
          const hit = (e.catalog || 'main') === (spec.catalog || 'main')
            && ((spec.id != null && e.id != null && Number(e.id) === Number(spec.id))
              || (e.title === spec.title && String(e.year || '') === String(spec.year || '')));
          if (hit) restored = e;
          else stay.push(e);
        });
        if (stay.length === before.length) return null;
        doc.entries = stay;
        return doc;
      }, 'Restore catalog entry: ' + label);
      removedCache = (result.doc && result.doc.entries) || [];
      const rec = restored && restored.record;
      const ui = window.__catalogUI;
      if (rec && ui && ui.restore && (restored.catalog || 'main') === catalogKind()) ui.restore([rec]);
      refreshRemovedCount();
      toast('Saved. Rebuild in progress — the card should reappear on the live page within 1–2 minutes.', 'ok');
    } catch (err) {
      toast('Error: ' + ((err && err.message) || 'Could not undo.'), 'err');
    }
  }

  function injectChrome() {
    if ($('#editChrome')) return;
    const footer = document.querySelector('footer.wrap') || document.body;
    const chrome = document.createElement('div');
    chrome.id = 'editChrome';
    chrome.className = 'edit-chrome';
    chrome.innerHTML = `
      <button type="button" id="editModeBtn" class="edit-mode-btn" aria-pressed="false">Edit mode</button>
      <span id="editTools" class="edit-tools" hidden>
        <button type="button" id="removedListBtn" class="edit-ghost">Removed (0)</button>
        <button type="button" id="editTokenBtn" class="edit-ghost">GitHub token</button>
      </span>
      <div id="removedPanel" class="removed-panel" hidden></div>
      <div id="tokenPanel" class="token-panel" hidden>
        <div class="removed-head"><strong>Edit mode / Set GitHub token</strong><button type="button" class="edit-x" data-close-token aria-label="Close">Close</button></div>
        <p>Paste a fine-grained personal access token with access only to the <code>tv-movie-catalog</code> repository and permission <strong>Contents: Read and write</strong>. It stays in this browser only (localStorage) and is never written to the catalog. See the README for how to create one.</p>
        <label class="token-label">GitHub token
          <input id="tokenInput" type="password" autocomplete="off" spellcheck="false" placeholder="github_pat_…">
        </label>
        <div class="token-actions">
          <button type="button" id="tokenSave" class="edit-mode-btn">Save token and turn on edit mode</button>
          <button type="button" id="tokenClear" class="edit-ghost">Clear token from this browser</button>
        </div>
      </div>`;
    footer.appendChild(chrome);

    $('#editModeBtn').addEventListener('click', () => {
      if (!token()) { $('#tokenPanel').hidden = false; $('#tokenInput').focus(); return; }
      setMode(!editOn());
    });
    $('#editTokenBtn').addEventListener('click', () => {
      $('#tokenPanel').hidden = !$('#tokenPanel').hidden;
      if (!$('#tokenPanel').hidden) $('#tokenInput').focus();
    });
    $('#removedListBtn').addEventListener('click', () => {
      const panel = $('#removedPanel');
      panel.hidden = !panel.hidden;
      if (!panel.hidden) renderRemovedPanel();
    });
    $('#tokenSave').addEventListener('click', () => {
      const v = ($('#tokenInput').value || '').trim();
      if (!v) { toast('Paste a token first.', 'err'); return; }
      localStorage.setItem(TOKEN_KEY, v);
      $('#tokenInput').value = '';
      $('#tokenPanel').hidden = true;
      setMode(true);
      toast('Token saved in this browser. Remove buttons are now visible on each card.', 'ok');
    });
    $('#tokenClear').addEventListener('click', () => {
      localStorage.removeItem(TOKEN_KEY);
      $('#tokenInput').value = '';
      setMode(false);
      $('#tokenPanel').hidden = true;
      toast('Token cleared from this browser.', 'ok');
    });
    chrome.addEventListener('click', e => {
      if (e.target.closest('[data-close-token]')) $('#tokenPanel').hidden = true;
      if (e.target.closest('[data-close-removed]')) $('#removedPanel').hidden = true;
      const undo = e.target.closest('.undo-entry');
      if (undo) undoEntry({
        catalog: undo.dataset.catalog,
        id: undo.dataset.id === '' ? null : Number(undo.dataset.id),
        title: undo.dataset.title,
        year: undo.dataset.year
      });
    });
  }

  function bindGrid() {
    const grid = $('#grid');
    if (!grid) return;
    grid.addEventListener('click', e => {
      const btn = e.target.closest('.remove-entry');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      if (!editOn()) return;
      const id = Number(btn.dataset.id);
      const ui = window.__catalogUI;
      const entry = (ui && ui.get && ui.get(id)) || { id, title: btn.dataset.title, year: btn.dataset.year };
      removeEntry(entry);
    });
  }

  injectChrome();
  bindGrid();
  setMode(editOn());
  refreshRemovedFromRepo();
})();
