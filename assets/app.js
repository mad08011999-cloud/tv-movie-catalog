(function(){
  const D = window.CATALOG;
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const byId = new Map(D.entries.map(e => [e.id, e]));
  const catLabel = Object.fromEntries(D.categories.map(c => [c.key, c.label]));
  const legendLabel = Object.fromEntries(D.categories.map(c => [c.key, c.legend_label || c.label]));
  const PAGE = 120;
  // every expander (<details>) starts collapsed and opens only when tapped: strip any 'open' attribute that
  // arrives in source HTML (the muse.ai research notes ship with <details open>)
  const closedDetails = html => String(html ?? '').replace(/<details\b([^>]*)>/gi, (m, a) =>
    '<details' + a.replace(/\s+open(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?(?=\s|$)/gi, '') + '>');
  let state = {q:'', cat:'all', fmt:'all', src:'all', tag:'all', yr:'all', ymin:'', ymax:'', free:false, view:'grid', limit:PAGE};

  // A-Z ordering (done at render time so it survives every sync): accents folded, case-insensitive,
  // leading punctuation and a leading 'The' / 'A' / 'An' ignored; year is the tiebreaker
  const coll = new Intl.Collator('en', {sensitivity: 'base', numeric: true});
  const sortName = t => String(t ?? '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').trim()
    .replace(/^[^\p{L}\p{N}]+/u, '').replace(/^(the|an|a)\s+/i, '').replace(/^[^\p{L}\p{N}]+/u, '');
  const byName = (a, b) => coll.compare(sortName(a), sortName(b));
  // release year = first 4-digit year in the year field ('1966–71' -> 1966); null when there is none
  const yearOf = e => { const m = String(e.year || '').match(/\b(1[89]\d\d|20\d\d)\b/); return m ? +m[1] : null; };
  D.entries.forEach(e => { e._sort = sortName(e.title); e._year = yearOf(e); });
  const byEntry = (a, b) => coll.compare(a._sort, b._sort) || ((a._year ?? 1e4) - (b._year ?? 1e4)) || (a.id - b.id);
  const PERIODS = [
    {key:'pre1960', label:'Before 1960', test: y => y !== null && y < 1960},
    {key:'1960s-70s', label:'1960s–1970s', test: y => y !== null && y >= 1960 && y <= 1979},
    {key:'1980s-90s', label:'1980s–1990s', test: y => y !== null && y >= 1980 && y <= 1999},
    {key:'2000s', label:'2000s', test: y => y !== null && y >= 2000 && y <= 2009},
    {key:'2010s', label:'2010s', test: y => y !== null && y >= 2010 && y <= 2019},
    {key:'2020s', label:'2020s+', test: y => y !== null && y >= 2020},
    {key:'unknown', label:'Year unknown', test: y => y === null}];
  const periodOf = Object.fromEntries(PERIODS.map(p => [p.key, p]));
  const cats = [...D.categories].sort((a, b) => byName(a.label, b.label));
  const legendCats = [...D.categories].sort((a, b) => byName(a.legend_label || a.label, b.legend_label || b.label));
  const sectionsAZ = [...D.sections].sort((a, b) => byName(a.title, b.title));
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
  $('#legend').innerHTML = legendCats.map(c => `<button type="button" class="${esc(c.key)}" data-cat="${esc(c.key)}" aria-pressed="false" title="${c.entry_count} records"><i></i>${esc(c.legend_label)}</button>`).join('');
  $('#category').insertAdjacentHTML('beforeend', cats.map(c => `<option value="${esc(c.key)}">${esc(c.label)} (${c.entry_count})</option>`).join(''));
  $('#format').insertAdjacentHTML('beforeend', D.formats.map(f => `<option value="${esc(f.key)}">${esc(f.label)}</option>`).join(''));
  // reference tags (e.g. 'moaning'): not categories; filterable and searchable
  const tagCounts = {};
  D.entries.forEach(e => (e.tags || []).forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1; }));
  $('#tag').insertAdjacentHTML('beforeend', Object.keys(tagCounts).sort().map(t => `<option value="${esc(t)}">Tag: ${esc(t)} (${tagCounts[t]})</option>`).join(''));
  $('#source').insertAdjacentHTML('beforeend', (D.sources || []).map(s => `<option value="${esc(s.id)}">${esc(srcLabel[s.id])}</option>`).join(''));
  const extra = (D.sources || []).filter(s => s.kind === 'index').map(s => `
    <details><summary>${esc(srcLabel[s.id])}: research notes (${s.boundaries.length})</summary><div class="note-body"><ul>${s.boundaries.map(b => `<li>${esc(b)}</li>`).join('')}</ul></div></details>
    <details><summary>${esc(srcLabel[s.id])}: snapshot figures (${s.stats.length})</summary><div class="note-body"><ul>${s.stats.map(b => `<li>${esc(b)}</li>`).join('')}</ul></div></details>`).join('');
  $('#notes').innerHTML = closedDetails(D.source.research_notes_html) + extra;
  $('#srcinfo').innerHTML = (D.sources || []).map(s => `<a href="${esc(s.share_url)}" target="_blank" rel="noopener">${esc(srcLabel[s.id])}</a> (${s.check.raw_count} raw${s.status !== 'live' ? ', ' + esc(s.status) : ''}) · ${s.kind === 'local' ? `<a href="${esc(s.share_url)}">curated JSON in repo</a>` : `<a href="original/${esc(s.id)}/index.html">archived copy</a>`}`).join(' · ') +
    ` · ${D.entry_count} records after removing duplicates`;

  // search index
  D.entries.forEach(e => {
    e._hay = [e.title, e.subtitle, e.year, e.meta, e.summary, e.character, e.mechanism, e.confidence_flag, e.note, e.provenance, e.pregnancy_outcome, e.pregnancy_note, e.pregnant_has_children, e.kids_together, e.kids_together_note, e.married && 'marries her ' + e.married, e.married_note, e.pregnant_end && 'pregnant by the end ' + e.pregnant_end, e.pregnant_end_note, e.evidence, e.source_conflict, e.fit_note, e.child_witness, ...(e.watch_links || []).map(l => [l.service, l.channel].join(' ')), ...(e.tags || []).map(t => 'tag:' + t + ' ' + t), ...(e.episodes || []).map(x => [x.episode, x.air_date, x.gist].join(' ')),
      ...e.categories.map(c => catLabel[c] || c), ...(e.merged_from || []).map(m => [m.label, m.summary, m.character, m.note].join(' '))].join(' \u0001 ').toLowerCase();
  });
  // year filter: a release period and/or an optional min-max range; records without a year only
  // show under 'All years' (with no range set) and 'Year unknown'
  const yearOk = (e, skipPeriod) => {
    if (!skipPeriod && state.yr !== 'all' && periodOf[state.yr] && !periodOf[state.yr].test(e._year)) return false;
    const lo = parseInt(state.ymin, 10), hi = parseInt(state.ymax, 10);
    if ((!isNaN(lo) || !isNaN(hi)) && state.yr !== 'unknown') {
      if (e._year === null) return false;
      if (!isNaN(lo) && e._year < lo) return false;
      if (!isNaN(hi) && e._year > hi) return false;
    }
    return true;
  };
  const baseMatch = e => (state.cat === 'all' || e.categories.includes(state.cat)) &&
    (state.fmt === 'all' || e.format === state.fmt) &&
    (state.src === 'all' || e.from_sources.includes(state.src)) &&
    (state.tag === 'all' || (e.tags || []).includes(state.tag)) &&
    (!state.q || state.q.split(/\s+/).every(t => e._hay.includes(t)));
  const freeOk = e => !state.free || (e.watch_links || []).length > 0;
  const matches = e => baseMatch(e) && yearOk(e) && freeOk(e);
  function periodCounts(){   // live counts per period under the other active filters
    const base = D.entries.filter(e => baseMatch(e) && yearOk(e, true) && freeOk(e));
    $('#freeToggle').textContent = `Has free link (${D.entries.filter(e => baseMatch(e) && yearOk(e) && (e.watch_links || []).length).length})`;
    const sel = $('#period');
    sel.querySelector('option[value="all"]').textContent = `All years (${base.length})`;
    PERIODS.forEach(p => { sel.querySelector(`option[value="${p.key}"]`).textContent = `${p.label} (${base.filter(e => p.test(e._year)).length})`; });
  }

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
    const watch = (e.watch_links || []).length ? `<div class="watch" aria-label="Watch free"><strong>Watch free:</strong> ${e.watch_links.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener" title="${esc([l.verified_via, l.note].filter(Boolean).join(' · '))}">${esc(l.service)}${l.channel ? ' · ' + esc(l.channel) : ''} <span class="wregion">${esc(l.region || '')}</span>${l.note ? ` <span class="wnote">(${esc(l.note)})</span>` : ''} ↗</a>`).join('')}</div>` : '';
    const vid = e.youtube_ids[0];
    const thumb = e.thumbnail ? `<button class="thumb" type="button" data-yt="${esc(vid)}" data-title="${esc(e.title)}" aria-label="Play clip: ${esc(e.title)}"><img loading="lazy" src="${esc(e.thumbnail)}" alt=""><span class="play"><span></span></span><span class="lbl">YouTube clip</span></button>` : '';
    const ch = app.character || (e.character ? `Character: ${e.character}` : '');
    const note = app.entry_note || (e.note ? `Note: ${e.note}` : '');
    const prov = app.provenance || (e.provenance ? `Source basis: ${e.provenance}` : '');
    const subgroup = app._group ? `<p class="entry-note subgroup"><strong>Subgroup:</strong> ${esc(app._group)}</p>` : '';
    const copies = e.merged_from && e.merged_from.length ? [e.primary_copy, ...e.merged_from] : [];
    const distinct = copies.filter(m => m.distinct_story).length;
    const copyRow = (m, i) => {
      const plot = m.summary ? esc(m.summary) : `<em>${m.index_title ? 'title-index listing only; the source gives no plot for this copy' : 'no plot in the source for this copy'}</em>`;
      const extra = [m.character ? `<strong>Character:</strong> ${esc(m.character)}` : '', (m.episodes || []).length ? `<strong>Episodes:</strong> ${m.episodes.map(x => esc(x.episode) + ' — ' + esc(x.gist)).join('; ')}` : '', m.pregnant_has_children ? `<strong>Already has children:</strong> ${esc(m.pregnant_has_children)}` : '', (m.tags || []).length ? `<strong>Tags:</strong> ${m.tags.map(esc).join(', ')}` : '', m.note ? `<strong>Note:</strong> ${esc(m.note)}` : '', (m.categories || []).length ? `<strong>Listed under:</strong> ${m.categories.map(c => esc(catLabel[c] || c)).join(', ')}` : '',
        m.identifiers.length ? '' : '<span class="noid">no episode, date or alternate title given in the source</span>'].filter(Boolean).join(' · ');
      const links = (m.sources || []).length ? ` <span class="clinks">${m.sources.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label || 'Source')} ↗</a>`).join(' ')}</span>` : '';
      return `<li class="${m.distinct_story ? 'distinct' : ''}"><span class="csrc" title="${esc(srcLabel[m.source])}">${esc(srcShort[m.source])}</span> <strong class="clabel">${esc(m.label)}</strong>${i === 0 ? ' <span class="cmain">shown above</span>' : ''} — <span class="cplot">${plot}</span>${extra ? `<span class="cextra">${extra}</span>` : ''}${links}</li>`;
    };
    const merged = copies.length ? `<details class="merged"><summary>Merged copies (${copies.length})${distinct ? ` · ${distinct + 1} different episodes/storylines` : ''}</summary><ol>${copies.map(copyRow).join('')}</ol></details>` : '';
    const idxNote = e.index_only ? `<p class="entry-note"><strong>Title index only:</strong> listed by ${esc(srcLabel[e.from_sources[0]] || 'the title index')} without plot details.</p>` : '';
    const badges = `<span class="srcbadges">${e.from_sources.map(s => `<span title="${esc(srcLabel[s])}">${esc(srcShort[s])}</span>`).join('')}</span>`;
    const lab = (s) => s.replace(/^(Character:|Note:|Source basis:)/, '<strong>$1</strong>');
    return `<article class="card" id="r${e.id}">${thumb}
      <div class="card-top"><span>${esc(e.meta)}</span><span class="year">${badges}${esc(app.year_display || e.year || 'Year unresolved')}</span></div>
      <h3>${esc(e.title)}${e.subtitle ? `<small>${esc(e.subtitle)}</small>` : ''}</h3>${subgroup}
      ${ch ? `<p class="character">${lab(esc(ch))}</p>` : ''}
      ${summary ? `<p class="summary">${esc(summary)}</p>` : ''}
      ${note ? `<p class="entry-note">${lab(esc(note))}</p>` : ''}${idxNote}
      ${e.pregnant_has_children ? `<p class="entry-note"><strong>Pregnant character already has children:</strong> ${esc(e.pregnant_has_children)}</p>` : ''}
      ${e.hypnotist ? `<p class="entry-note"><strong>Hypnotized for gain:</strong> by ${esc(e.hypnotist)}${(e.gain_motive || []).length ? ' · gain: ' + esc([].concat(e.gain_motive).join(', ')) : ''}${e.method ? ' · method: ' + esc(e.method) : ''}</p>` : ''}
      ${e.married ? `<p class="entry-note outcome"><strong>Marries her:</strong> ${esc(e.married)}${e.married_note ? ' — ' + esc(e.married_note) : ''}</p>` : ''}
      ${e.pregnant_end ? `<p class="entry-note outcome"><strong>Pregnant by the end:</strong> ${esc(e.pregnant_end)}${e.pregnant_end_note ? ' — ' + esc(e.pregnant_end_note) : ''}</p>` : ''}
      ${e.kids_status ? `<p class="entry-note"><strong>Already has children:</strong> ${esc(e.kids_status)}${e.kids_note ? ' — ' + esc(e.kids_note) : ''}</p>` : ''}
      ${e.child_witness ? `<p class="entry-note witness"><strong>Who saw it:</strong> ${esc(e.child_witness)}</p>` : ''}
      ${e.kids_together ? `<p class="entry-note"><strong>${e.married ? 'Kids together' : 'Kids together with husband'}:</strong> ${esc(e.kids_together)}${e.kids_together_note ? ' — ' + esc(e.kids_together_note) : ''}</p>` : ''}
      ${e.evidence ? `<p class="entry-note evidence${/^single source/i.test(e.evidence) ? ' single' : ''}"><strong>${/^single source/i.test(e.evidence) ? 'Single source' : 'Sources cross-checked'}:</strong> ${esc(e.evidence.replace(/^single source\s*[—-]\s*/i, ''))}</p>` : ''}
      ${e.source_conflict ? `<p class="entry-note conflict"><strong>Source conflict:</strong> ${esc(e.source_conflict)}</p>` : ''}
      ${e.fit_note ? `<p class="entry-note"><strong>Fit:</strong> ${esc(e.fit_note)}</p>` : ''}
      ${(e.episodes || []).length ? `<div class="episodes"><strong>Episodes</strong><ul>${e.episodes.map(x => `<li><b>${esc(x.episode)}</b>${x.air_date ? ` <span class="epdate">(${esc(x.air_date)})</span>` : ''}${x.number_verified === false ? ' <em>episode number not verified</em>' : ''} — ${esc(x.gist)}</li>`).join('')}</ul></div>` : ''}
      ${e.pregnancy_outcome ? `<p class="entry-note"><strong>Pregnancy outcome:</strong> ${esc(e.pregnancy_outcome)}${e.pregnancy_note ? ' — ' + esc(e.pregnancy_note) : ''}</p>` : ''}
      ${watch}
      <div class="tags">${tags || appTags}${(e.tags || []).map(t => `<button type="button" class="tag reftag" data-tag="${esc(t)}" title="Reference tag — click to filter">#${esc(t)}</button>`).join('')}</div>
      ${sources.length ? `<div class="sources" aria-label="Sources">${sources.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join('')}</div>` : ''}
      ${merged}
      ${prov ? `<p class="provenance">${lab(esc(prov))}</p>` : ''}
    </article>`;
  }

  function render(){
    const grid = $('#grid');
    const hits = D.entries.filter(matches).sort(byEntry);
    periodCounts();
    $('#count').textContent = `${hits.length} record${hits.length === 1 ? '' : 's'}` + (hits.length !== D.entries.length ? ` of ${D.entries.length}` : '');
    if (!hits.length){ grid.innerHTML = '<div class="empty">No records match these filters.</div>'; return; }
    let html = '';
    if (state.view === 'grid'){
      html = hits.slice(0, state.limit).map(e => card(e)).join('');
      if (hits.length > state.limit) html += `<div class="more-wrap"><button type="button" id="more">Show more (${hits.length - state.limit} remaining)</button></div>`;
    } else {
      const ok = new Set(hits.map(e => e.id)); const shown = new Set();
      for (const sec of sectionsAZ){
        if (state.cat !== 'all' && sec.category !== state.cat) continue;
        // one A-Z list per section; each card keeps its subgroup heading as a label, group notes go to the top
        const items = [], gnotes = [];
        for (const g of sec.groups){
          const gi = g.items.filter(it => ok.has(it.id));
          if (!gi.length) continue;
          const label = g.title && !/^(catalog records|india-only research additions|worldwide hypnosis research)/i.test(g.title.trim()) ? g.title : '';
          gi.forEach(it => items.push({it, e: byId.get(it.id), group: label}));
          (g.notes || []).forEach(n => gnotes.push({n, g: g.title}));
        }
        if (!items.length) continue;
        items.sort((a, b) => byEntry(a.e, b.e));
        const body = gnotes.map(({n, g}) => `<aside class="category-note"><strong>${esc(srcShort[n.source] || '')} note${g ? ' (' + esc(g) + ')' : ''}:</strong> ${esc(n.text)}</aside>`).join('') +
          items.map(({it, e, group}) => { shown.add(it.id); return card(e, Object.assign({}, it, {_group: group})); }).join('');
        html += `<header class="category-heading"><h2>${esc(sec.title)} <span class="seccount">${items.length} record${items.length === 1 ? "" : "s"}</span></h2>${sec.description ? `<p>${esc(sec.description)}</p>` : ''}</header>` +
          sec.notes.map(n => n.html ? `<aside class="category-note">${n.html}</aside>` :
            `<aside class="category-note"><strong>${esc(srcShort[n.source] || '')} note${n.group ? ' (' + esc(n.group) + ')' : ''}:</strong> ${esc(n.text)}</aside>`).join('') + body;
      }
      const rest = hits.filter(e => !shown.has(e.id));
      if (rest.length) html += `<header class="category-heading"><h2>${state.cat === 'all' ? 'Other records' : esc(catLabel[state.cat])}</h2><p>${state.cat === 'all' ? 'Records present in the source data that the source page does not place under a section heading.' : 'Records tagged with this category in the source data.'}</p></header>` + rest.map(e => card(e)).join('');
    }
    grid.innerHTML = html;
  }

  function sync(push){
    $('#category').value = state.cat; $('#format').value = state.fmt; $('#source').value = state.src; $('#tag').value = state.tag;
    $('#period').value = state.yr; $('#freeToggle').setAttribute('aria-pressed', state.free);
    ['ymin', 'ymax'].forEach(k => { const el = $('#' + k); if (document.activeElement !== el) el.value = state[k]; });   // don't clobber a year being typed
    document.querySelectorAll('.view-toggle button').forEach(b => b.setAttribute('aria-pressed', b.dataset.view === state.view));
    document.querySelectorAll('#legend button').forEach(b => b.setAttribute('aria-pressed', b.dataset.cat === state.cat));
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q); if (state.cat !== 'all') p.set('cat', state.cat);
    if (state.fmt !== 'all') p.set('fmt', state.fmt); if (state.src !== 'all') p.set('src', state.src); if (state.tag !== 'all') p.set('tag', state.tag);
    if (state.yr !== 'all') p.set('yr', state.yr); if (state.ymin) p.set('ymin', state.ymin); if (state.ymax) p.set('ymax', state.ymax); if (state.free) p.set('free', '1'); if (state.view !== 'grid') p.set('view', state.view);
    if (push) history.replaceState(null, '', (p.toString() ? '#' + p : location.pathname));
    updateMore();
    render();
  }
  // 'More filters' disclosure: source, tag, view, years and free-link live in a panel that is collapsed by
  // default; the button shows how many of those hidden filters are active
  const moreBtn = $('#moreBtn'), morePanel = $('#morePanel');
  const hiddenActive = () => [state.src !== 'all', state.tag !== 'all', state.view !== 'grid', state.yr !== 'all',
    !!(state.ymin || state.ymax), state.free].filter(Boolean).length;
  function setMore(open){ morePanel.hidden = !open; moreBtn.setAttribute('aria-expanded', String(open)); }
  function updateMore(){
    const n = hiddenActive(), c = $('#moreCount');
    c.hidden = !n; c.textContent = n ? String(n) : '';
    moreBtn.setAttribute('aria-label', n ? `More filters, ${n} active` : 'More filters');
  }
  moreBtn.addEventListener('click', () => setMore(morePanel.hidden));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !morePanel.hidden && morePanel.contains(document.activeElement)) { setMore(false); moreBtn.focus(); } });
  const init = new URLSearchParams(location.hash.slice(1));
  state.q = (init.get('q') || '').toLowerCase(); state.cat = init.get('cat') || 'all'; state.fmt = init.get('fmt') || 'all'; state.src = init.get('src') || 'all'; state.tag = init.get('tag') || 'all';
  state.yr = periodOf[init.get('yr')] ? init.get('yr') : 'all'; state.ymin = init.get('ymin') || ''; state.ymax = init.get('ymax') || ''; state.free = init.get('free') === '1'; state.view = init.get('view') || 'grid';
  if (hiddenActive()) setMore(true);   // a hidden filter set from the URL hash opens the panel
  let t;
  $('#search').addEventListener('input', e => { clearTimeout(t); t = setTimeout(() => { state.q = e.target.value.trim().toLowerCase(); state.limit = PAGE; sync(true); }, 120); });
  $('#category').addEventListener('change', e => { state.cat = e.target.value; state.limit = PAGE; sync(true); });
  $('#format').addEventListener('change', e => { state.fmt = e.target.value; state.limit = PAGE; sync(true); });
  $('#source').addEventListener('change', e => { state.src = e.target.value; state.limit = PAGE; sync(true); });
  $('#tag').addEventListener('change', e => { state.tag = e.target.value; state.limit = PAGE; sync(true); });
  $('#period').insertAdjacentHTML('beforeend', PERIODS.map(p => `<option value="${p.key}">${esc(p.label)}</option>`).join(''));
  $('#period').addEventListener('change', e => { state.yr = e.target.value; state.limit = PAGE; sync(true); });
  let yt;
  const yv = id => { const v = $(id).value.trim(); return /^\d{4}$/.test(v) ? v : ''; };
  ['#ymin', '#ymax'].forEach(id => $(id).addEventListener('input', () => { clearTimeout(yt); yt = setTimeout(() => {
    state.ymin = yv('#ymin'); state.ymax = yv('#ymax'); state.limit = PAGE; sync(true); }, 250); }));
  $('#freeToggle').addEventListener('click', () => { state.free = !state.free; state.limit = PAGE; sync(true); });
  $('#yclear').addEventListener('click', () => { state.yr = 'all'; state.ymin = state.ymax = ''; state.limit = PAGE; sync(true); });
  $('#legend').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; state.cat = state.cat === b.dataset.cat ? 'all' : b.dataset.cat; state.limit = PAGE; sync(true); $('#grid').scrollIntoView({behavior:'smooth'}); });
  document.querySelector('.view-toggle').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; state.view = b.dataset.view; sync(true); });
  $('#grid').addEventListener('click', e => {
    const rt = e.target.closest('.reftag'); if (rt){ state.tag = state.tag === rt.dataset.tag ? 'all' : rt.dataset.tag; state.limit = PAGE; sync(true); return; }
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
  document.querySelectorAll('details[open]').forEach(d => { d.open = false; });   // safety net: nothing expanded on load
})();
