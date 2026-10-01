(function(){
  const D = window.CATALOG;
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const byId = new Map(D.entries.map(e => [e.id, e]));
  const catLabel = Object.fromEntries(D.categories.map(c => [c.key, c.label]));
  const legendLabel = Object.fromEntries(D.categories.map(c => [c.key, c.legend_label || c.label]));
  const PAGE = 120;
  let state = {q:'', cat:'all', fmt:'all', src:'all', view:'grid', limit:PAGE};
  const srcLabel = Object.fromEntries((D.sources || []).map((s, i) => [s.id, `Source ${i + 1}: ${s.label}`]));
  const srcShort = Object.fromEntries((D.sources || []).map((s, i) => [s.id, `S${i + 1}`]));

  // header
  $('#kicker').textContent = D.source.kicker;
  $('#dek').textContent = D.source.description;
  $('#total').textContent = $('#total2').textContent = D.entries.length;
  if (D.source.snapshot_label) $('#snapdate').textContent = D.source.snapshot_label;
  const bd = D.source.snapshot_breakdowns;
  $('#breakdowns').innerHTML = bd.slice(0,4).map(b => `<span class="breakdown">${b.html}</span>`).join('') +
    (bd.length > 4 ? `<details><summary>Show all ${bd.length} breakdowns</summary>${bd.slice(4).map(b => `<span class="breakdown">${b.html}</span>`).join('')}</details>` : '');
  $('#legend').innerHTML = D.categories.map(c => `<button type="button" class="${esc(c.key)}" data-cat="${esc(c.key)}" aria-pressed="false" title="${c.entry_count} records"><i></i>${esc(c.legend_label)}</button>`).join('');
  $('#category').insertAdjacentHTML('beforeend', D.categories.map(c => `<option value="${esc(c.key)}">${esc(c.label)} (${c.entry_count})</option>`).join(''));
  $('#format').insertAdjacentHTML('beforeend', D.formats.map(f => `<option value="${esc(f.key)}">${esc(f.label)}</option>`).join(''));
  $('#source').insertAdjacentHTML('beforeend', (D.sources || []).map(s => `<option value="${esc(s.id)}">${esc(srcLabel[s.id])}</option>`).join(''));
  const extra = (D.sources || []).filter(s => s.kind === 'index').map(s => `
    <details><summary>${esc(srcLabel[s.id])}: research notes (${s.boundaries.length})</summary><div class="note-body"><ul>${s.boundaries.map(b => `<li>${esc(b)}</li>`).join('')}</ul></div></details>
    <details><summary>${esc(srcLabel[s.id])}: snapshot figures (${s.stats.length})</summary><div class="note-body"><ul>${s.stats.map(b => `<li>${esc(b)}</li>`).join('')}</ul></div></details>`).join('');
  $('#notes').innerHTML = D.source.research_notes_html + extra;
  $('#srcinfo').innerHTML = (D.sources || []).map(s => `<a href="${esc(s.share_url)}" target="_blank" rel="noopener">${esc(srcLabel[s.id])}</a> (${s.check.raw_count} raw${s.status !== 'live' ? ', ' + esc(s.status) : ''}) · ${s.kind === 'local' ? `<a href="${esc(s.share_url)}">curated JSON in repo</a>` : `<a href="original/${esc(s.id)}/index.html">archived copy</a>`}`).join(' · ') +
    ` · ${D.entry_count} records after removing duplicates`;

  // search index
  D.entries.forEach(e => {
    e._hay = [e.title, e.subtitle, e.year, e.meta, e.summary, e.character, e.mechanism, e.confidence_flag, e.note, e.provenance, e.pregnancy_outcome, e.pregnancy_note,
      ...e.categories.map(c => catLabel[c] || c), ...(e.merged_from || []).map(m => [m.label, m.summary, m.character, m.note].join(' '))].join(' \u0001 ').toLowerCase();
  });
  const matches = e => (state.cat === 'all' || e.categories.includes(state.cat)) &&
    (state.fmt === 'all' || e.format === state.fmt) &&
    (state.src === 'all' || e.from_sources.includes(state.src)) &&
    (!state.q || state.q.split(/\s+/).every(t => e._hay.includes(t)));

  function card(e, app){
    app = app || {};
    const summary = app.summary || e.summary;
    const tags = app.tags ? null : [
      ...e.categories.map(c => `<span class="tag ${esc(c)}">${esc(catLabel[c] || c)}</span>`),
      e.mechanism ? `<span class="tag flag">${esc(e.mechanism)}</span>` : '',
      e.pregnancy_highlight ? `<span class="tag flag">Pregnancy × hypnosis</span>` : '',
      e.confidence_flag ? `<span class="tag flag">${esc(e.confidence_flag)}</span>` : ''].join('');
    const appTags = app.tags ? app.tags.map(t => {
      const key = Object.keys(catLabel).find(k => catLabel[k] === t || legendLabel[k] === t);
      return t ? `<span class="tag ${key ? esc(key) : 'flag'}">${esc(t)}</span>` : ''; }).join('') : '';
    const sources = app.sources || e.sources;
    const vid = e.youtube_ids[0];
    const thumb = e.thumbnail ? `<button class="thumb" type="button" data-yt="${esc(vid)}" data-title="${esc(e.title)}" aria-label="Play clip: ${esc(e.title)}"><img loading="lazy" src="${esc(e.thumbnail)}" alt=""><span class="play"><span></span></span><span class="lbl">YouTube clip</span></button>` : '';
    const ch = app.character || (e.character ? `Character: ${e.character}` : '');
    const note = app.entry_note || (e.note ? `Note: ${e.note}` : '');
    const prov = app.provenance || (e.provenance ? `Source basis: ${e.provenance}` : '');
    const copies = e.merged_from && e.merged_from.length ? [e.primary_copy, ...e.merged_from] : [];
    const distinct = copies.filter(m => m.distinct_story).length;
    const copyRow = (m, i) => {
      const plot = m.summary ? esc(m.summary) : `<em>${m.index_title ? 'title-index listing only; the source gives no plot for this copy' : 'no plot in the source for this copy'}</em>`;
      const extra = [m.character ? `<strong>Character:</strong> ${esc(m.character)}` : '', m.note ? `<strong>Note:</strong> ${esc(m.note)}` : '', (m.categories || []).length ? `<strong>Listed under:</strong> ${m.categories.map(c => esc(catLabel[c] || c)).join(', ')}` : '',
        m.identifiers.length ? '' : '<span class="noid">no episode, date or alternate title given in the source</span>'].filter(Boolean).join(' · ');
      const links = (m.sources || []).length ? ` <span class="clinks">${m.sources.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label || 'Source')} ↗</a>`).join(' ')}</span>` : '';
      return `<li class="${m.distinct_story ? 'distinct' : ''}"><span class="csrc" title="${esc(srcLabel[m.source])}">${esc(srcShort[m.source])}</span> <strong class="clabel">${esc(m.label)}</strong>${i === 0 ? ' <span class="cmain">shown above</span>' : ''} — <span class="cplot">${plot}</span>${extra ? `<span class="cextra">${extra}</span>` : ''}${links}</li>`;
    };
    const merged = copies.length ? `<details class="merged"${distinct ? ' open' : ''}><summary>Merged copies (${copies.length})${distinct ? ` · ${distinct + 1} different episodes/storylines` : ''}</summary><ol>${copies.map(copyRow).join('')}</ol></details>` : '';
    const idxNote = e.index_only ? `<p class="entry-note"><strong>Title index only:</strong> listed by ${esc(srcLabel[e.from_sources[0]] || 'the title index')} without plot details.</p>` : '';
    const badges = `<span class="srcbadges">${e.from_sources.map(s => `<span title="${esc(srcLabel[s])}">${esc(srcShort[s])}</span>`).join('')}</span>`;
    const lab = (s) => s.replace(/^(Character:|Note:|Source basis:)/, '<strong>$1</strong>');
    return `<article class="card" id="r${e.id}">${thumb}
      <div class="card-top"><span>${esc(e.meta)}</span><span class="year">${badges}${esc(app.year_display || e.year || 'Year unresolved')}</span></div>
      <h3>${esc(e.title)}${e.subtitle ? `<small>${esc(e.subtitle)}</small>` : ''}</h3>
      ${ch ? `<p class="character">${lab(esc(ch))}</p>` : ''}
      ${summary ? `<p class="summary">${esc(summary)}</p>` : ''}
      ${note ? `<p class="entry-note">${lab(esc(note))}</p>` : ''}${idxNote}
      ${e.pregnancy_outcome ? `<p class="entry-note"><strong>Pregnancy outcome:</strong> ${esc(e.pregnancy_outcome)}${e.pregnancy_note ? ' — ' + esc(e.pregnancy_note) : ''}</p>` : ''}
      <div class="tags">${tags || appTags}</div>
      ${sources.length ? `<div class="sources" aria-label="Sources">${sources.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join('')}</div>` : ''}
      ${merged}
      ${prov ? `<p class="provenance">${lab(esc(prov))}</p>` : ''}
    </article>`;
  }

  function render(){
    const grid = $('#grid');
    const hits = D.entries.filter(matches);
    $('#count').textContent = `${hits.length} record${hits.length === 1 ? '' : 's'}` + (hits.length !== D.entries.length ? ` of ${D.entries.length}` : '');
    if (!hits.length){ grid.innerHTML = '<div class="empty">No records match these filters.</div>'; return; }
    let html = '';
    if (state.view === 'grid'){
      html = hits.slice(0, state.limit).map(e => card(e)).join('');
      if (hits.length > state.limit) html += `<div class="more-wrap"><button type="button" id="more">Show more (${hits.length - state.limit} remaining)</button></div>`;
    } else {
      const ok = new Set(hits.map(e => e.id)); const shown = new Set();
      for (const sec of D.sections){
        if (state.cat !== 'all' && sec.category !== state.cat) continue;
        let body = '';
        for (const g of sec.groups){
          const items = g.items.filter(it => ok.has(it.id));
          if (!items.length) continue;
          if (g.title) body += `<h3 class="subcategory-heading">${esc(g.title)}${g.from_source ? ` <small class="from">${esc(srcShort[g.from_source])}</small>` : ''}</h3>`;
          body += (g.notes || []).map(n => `<aside class="category-note"><strong>${esc(srcShort[n.source] || '')} note:</strong> ${esc(n.text)}</aside>`).join('');
          body += items.map(it => { shown.add(it.id); return card(byId.get(it.id), it); }).join('');
        }
        if (body) html += `<header class="category-heading"><h2>${esc(sec.title)}</h2>${sec.description ? `<p>${esc(sec.description)}</p>` : ''}</header>` +
          sec.notes.map(n => n.html ? `<aside class="category-note">${n.html}</aside>` :
            `<aside class="category-note"><strong>${esc(srcShort[n.source] || '')} note${n.group ? ' (' + esc(n.group) + ')' : ''}:</strong> ${esc(n.text)}</aside>`).join('') + body;
      }
      const rest = hits.filter(e => !shown.has(e.id));
      if (rest.length) html += `<header class="category-heading"><h2>${state.cat === 'all' ? 'Other records' : esc(catLabel[state.cat])}</h2><p>${state.cat === 'all' ? 'Records present in the source data that the source page does not place under a section heading.' : 'Records tagged with this category in the source data.'}</p></header>` + rest.map(e => card(e)).join('');
    }
    grid.innerHTML = html;
  }

  function sync(push){
    $('#category').value = state.cat; $('#format').value = state.fmt; $('#source').value = state.src;
    document.querySelectorAll('.view-toggle button').forEach(b => b.setAttribute('aria-pressed', b.dataset.view === state.view));
    document.querySelectorAll('#legend button').forEach(b => b.setAttribute('aria-pressed', b.dataset.cat === state.cat));
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q); if (state.cat !== 'all') p.set('cat', state.cat);
    if (state.fmt !== 'all') p.set('fmt', state.fmt); if (state.src !== 'all') p.set('src', state.src); if (state.view !== 'grid') p.set('view', state.view);
    if (push) history.replaceState(null, '', (p.toString() ? '#' + p : location.pathname));
    render();
  }
  const init = new URLSearchParams(location.hash.slice(1));
  state.q = (init.get('q') || '').toLowerCase(); state.cat = init.get('cat') || 'all'; state.fmt = init.get('fmt') || 'all'; state.src = init.get('src') || 'all'; state.view = init.get('view') || 'grid';
  let t;
  $('#search').addEventListener('input', e => { clearTimeout(t); t = setTimeout(() => { state.q = e.target.value.trim().toLowerCase(); state.limit = PAGE; sync(true); }, 120); });
  $('#category').addEventListener('change', e => { state.cat = e.target.value; state.limit = PAGE; sync(true); });
  $('#format').addEventListener('change', e => { state.fmt = e.target.value; state.limit = PAGE; sync(true); });
  $('#source').addEventListener('change', e => { state.src = e.target.value; state.limit = PAGE; sync(true); });
  $('#legend').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; state.cat = state.cat === b.dataset.cat ? 'all' : b.dataset.cat; state.limit = PAGE; sync(true); $('#grid').scrollIntoView({behavior:'smooth'}); });
  document.querySelector('.view-toggle').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; state.view = b.dataset.view; sync(true); });
  $('#grid').addEventListener('click', e => {
    if (e.target.id === 'more'){ state.limit += PAGE; render(); return; }
    const th = e.target.closest('.thumb'); if (!th) return;
    $('#modalTitle').textContent = th.dataset.title;
    $('#modalLink').href = 'https://www.youtube.com/watch?v=' + th.dataset.yt;
    $('#modalFrame').src = 'https://www.youtube-nocookie.com/embed/' + th.dataset.yt + '?autoplay=1&rel=0';
    $('#modal').classList.add('open');
  });
  const close = () => { $('#modal').classList.remove('open'); $('#modalFrame').src = 'about:blank'; };
  $('#modalClose').addEventListener('click', close);
  $('#modal').addEventListener('click', e => { if (e.target.id === 'modal') close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  $('#search').value = state.q;
  sync(false);
})();
