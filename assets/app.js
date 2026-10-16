(function(){
  const D = window.CATALOG;
  // optional per-page wording (reads/ sets chapters, wife, etc.); the main page leaves it undefined
  const UI = Object.assign({episodes: 'Episodes', married: 'Already married when hypnotized', kids_status: 'Already has children', summary: ''}, window.CATALOG_UI || {});
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
  let state = {q:'', cat:'all', fmt:'all', src:'all', tag:'all', yr:'all', ymin:'', ymax:'', free:false, again:'all', view:'grid', limit:PAGE, drop:new Set()};

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
    {key:'pre1960', label:'Before 1960', lo:null, hi:1959, test: y => y !== null && y < 1960},
    {key:'1960s-70s', label:'1960s–1970s', lo:1960, hi:1979, test: y => y !== null && y >= 1960 && y <= 1979},
    {key:'1980s-90s', label:'1980s–1990s', lo:1980, hi:1999, test: y => y !== null && y >= 1980 && y <= 1999},
    {key:'2000s', label:'2000s', lo:2000, hi:2009, test: y => y !== null && y >= 2000 && y <= 2009},
    {key:'2010s', label:'2010s', lo:2010, hi:2019, test: y => y !== null && y >= 2010 && y <= 2019},
    {key:'2020s', label:'2020s+', lo:2020, hi:null, test: y => y !== null && y >= 2020},
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
    e._hay = [e.title, e.subtitle, e.creator, e.year, e.meta, e.summary, e.character, e.mechanism, e.confidence_flag, e.note, e.provenance, e.pregnancy_outcome, e.pregnancy_note, e.pregnant_has_children, e.kids_together, e.kids_together_note, e.married && 'marries her ' + e.married, e.married_note, e.already_married && 'already married when hypnotized ' + e.already_married, e.already_married_note, e.pregnant_end && 'pregnant by the end ' + e.pregnant_end, e.pregnant_end_note, e.evidence, e.source_conflict, e.fit_note, e.child_witness, e.rating && 'rating ' + e.rating, e.adult && 'adult title ' + e.adult, e.existing_kids && 'children before ' + e.existing_kids, e.pregnancy_again && 'pregnant again ' + e.pregnancy_again, e.pregnancy_again_note, ...(e.watch_links || []).map(l => [l.service, l.channel].join(' ')), ...(e.tags || []).map(t => 'tag:' + t + ' ' + t), ...(e.episodes || []).map(x => [x.episode, x.air_date, x.gist].join(' ')),
      ...e.categories.map(c => catLabel[c] || c), ...(e.merged_from || []).map(m => [m.label, m.summary, m.character, m.note].join(' '))].join(' \u0001 ').toLowerCase();
  });
  // ---------- smart context search (client-side; no external services) ----------
  // Any recognised concept term (even one word) switches the search box into context mode:
  //  * hard filters: years/decades, format, country/language, free link, pregnancy status, exclusions;
  //  * concepts (mother, wife, pregnant again, hypnosis, vampire, …): each has a STRONG test (the site's
  //    own categories / structured fields) and a WEAK test (the term appears in the plot text);
  //  * results come in tiers: title matches, then best matches (every concept matched strongly), then near
  //    matches (every concept matched, some only in the text; text-only terms must sit near each other),
  //    then partial matches (all but one concept) when the first tiers are small. Dividers show the tiers.
  // Searches with no recognised term behave exactly as before (every word must appear).
  const low = v => String(v ?? '').toLowerCase();
  const isYes = v => v === true || /^yes/.test(low(v));
  const hasCat = (e, keys) => e.categories.some(c => keys.includes(c));
  // plot text without the category labels (labels such as 'Wife hypnotized (by … vampire …)' would
  // otherwise make every wife record 'mention' vampires)
  D.entries.forEach(e => { let t = e._hay; e.categories.forEach(c => { const l = low(catLabel[c]); if (l) t = t.split(l).join(' '); }); e._txt = t; });
  const geo = e => e._geo || (e._geo = [e.title, e.subtitle, e.meta, ...(e.merged_from || []).map(m => m.label)].join(' ').toLowerCase());   // provenance is per source batch, so it is not used for country
  const metaL = e => low(e.meta);
  const PREG_POS = ['becomes pregnant by the end', 'still pregnant at the end', 'pregnant', 'gives birth', 'gives birth (twins)', 'pregnant at start', 'pregnant before the hypnosis'];
  const PREG_CATS = D.categories.filter(c => /pregnan/i.test(c.key + ' ' + c.label)).map(c => c.key);
  const HYP_CATS = D.categories.filter(c => /hypno|mesmer|trance|mind-control|mind control/i.test(c.label)).map(c => c.key);
  const pregKnown = e => { const o = low(e.pregnancy_outcome), p = low(e.pregnant_end);
    return (o && !/^(unknown|not stated)/.test(o)) || /^(yes|no)/.test(p); };
  const MOM_CATS = ['mother', 'mom-pregnancy', 'mom-partner-control', 'hypnotised-mother-marriage', 'pregnant-walkin', 'family', 'another-man', 'stepfather-control'];
  const WIFE_CATS = ['wife', 'wife-hypnotized', 'therapist-wife', 'partner-control', 'index-54', 'remarried-wife-control', 'partner-commissioned', 'partner-pregnant-hire', 'index-48', 'exwife-control', 'mom-partner-control', 'another-man', 'agegap-marriage', 'polygamy-hypnosis', 'polygamy-pregnancy', 'cheat-control'];
  const HUSB_CATS = ['wife', 'index-54', 'partner-control', 'mom-partner-control', 'remarried-wife-control', 'stepfather-control', 'partner-commissioned', 'partner-pregnant-hire', 'index-48'];
  const AGAIN_CATS = ['mom-pregnancy', 'widow-divorcee-remarry-pregnant', 'family', 'another-man'];
  const gm = (e, re) => re.test([].concat(e.gain_motive || []).join(' ').toLowerCase());
  const hyp = (e, re) => re.test(low(e.hypnotist));
  const COUNTRIES = [
    ['Korea', /\b(south )?koreans?\b|\bkorea\b|\bk-?dramas?\b/, e => /korea|k-drama|\bkbs\d?\b|\bsbs\b|\bmbc\b|\btvn\b|\bjtbc\b|tv chosun/.test(geo(e)) || /[\uac00-\ud7af]/.test(e.title + (e.subtitle || ''))],
    ['China', /\bchin(a|ese)\b|\bmandarin\b|\bc-?dramas?\b|\bmainland\b/, e => /china|chinese|mandarin|c-drama|iqiyi|youku|tencent|mango tv|hongguo|douyin|kuaishou/.test(geo(e)) || (/[\u4e00-\u9fff]/.test(e.title + (e.subtitle || '')) && !/[\u3040-\u30ff]/.test(e.title + (e.subtitle || '')) && !/hong kong|taiwan|japan/.test(metaL(e)))],
    ['Hong Kong', /\bhong kong\b|\bhk\b|\bcantonese\b|\btvb\b/, e => /hong kong|cantonese|\btvb\b|\bhk\b/.test(geo(e))],
    ['Taiwan', /\btaiwan(ese)?\b/, e => /taiwan/.test(geo(e))],
    ['Japan', /\bjapan(ese)?\b|\banime\b|\bj-?dramas?\b/, e => /japan|anime|j-drama/.test(metaL(e)) || /[\u3040-\u30ff]/.test(e.title + (e.subtitle || ''))],
    ['Hindi', /\bhindi\b|\bbollywood\b/, e => /hindi|bollywood/.test(geo(e))],
    ['Tamil', /\btamil\b|\bkollywood\b/, e => /tamil/.test(geo(e))],
    ['Telugu', /\btelugu\b|\btollywood\b/, e => /telugu/.test(geo(e))],
    ['Malayalam', /\bmalayalam\b/, e => /malayalam/.test(geo(e))],
    ['Kannada', /\bkannada\b/, e => /kannada/.test(geo(e))],
    ['Bengali', /\bbengali\b|\bbangla\b/, e => /bengali|bangla/.test(geo(e))],
    ['Marathi', /\bmarathi\b/, e => /marathi/.test(geo(e))],
    ['India', /\bindian?\b|\bdesi\b/, e => /india|hindi|tamil|telugu|malayalam|kannada|bengali|marathi|bollywood|star plus|zee tv|colors tv|sony tv/.test(geo(e))],
    ['Turkey', /\bturk(ey|ish|iye)\b/, e => /turk/.test(geo(e))],
    ['Spanish-language', /\bspanish\b|\bspain\b|\bmexic(o|an)\b|\blatin( american)?\b|\btelenovelas?\b|\bargentin\w*|\bcolombian?\b/, e => /spanish|spain|mexic|telenovela|argentin|colombia|venezuel|chile|peru/.test(geo(e))],
    ['Brazil / Portuguese', /\bbrazil\w*|\bportugu\w*/, e => /brazil|portug/.test(metaL(e))],
    ['Indonesia', /\bindonesian?\b|\bsinetron\b/, e => /indonesia|sinetron/.test(geo(e))],
    ['Philippines', /\bfilipino\b|\bphilippines?\b|\bpinoy\b/, e => /philippin|filipino|pinoy/.test(geo(e))],
    ['Thailand', /\bthai(land)?\b/, e => /thai/.test(metaL(e))],
    ['Pakistan', /\bpakistan\w*|\burdu\b/, e => /pakistan|urdu/.test(geo(e))],
    ['Russia', /\brussian?\b|\bsoviet\b/, e => /russia|soviet/.test(metaL(e))],
    ['France', /\bfrench\b|\bfrance\b/, e => /french|france/.test(metaL(e))],
    ['Germany', /\bgerman(y)?\b/, e => /german/.test(metaL(e))],
    ['Italy', /\bital(y|ian)\b/, e => /ital/.test(metaL(e))],
    ['UK', /\bbritish\b|\buk\b|\bengland\b/, e => /\buk\b|british|england|bbc|itv/.test(metaL(e))],
    ['US', /\bamerican\b|\busa\b|\bhollywood\b/, e => /\bus\b|usa|united states|american|hollywood/.test(metaL(e))]];
  const STOP_CAT = new Set(['female', 'females', 'character', 'characters', 'woman', 'women', 'with', 'by', 'and', 'or', 'the', 'a', 'an', 'of', 'her', 'for', 'into', 'to', 'while', 'then', 'gets', 'india', 'worldwide']);
  const catPhrases = [];
  D.categories.forEach(c => String(c.label).toLowerCase().split(/\s*(?:\/|—|–|\(|\)|,|&|\+|;|:)\s*/).forEach(seg => {
    const ph = seg.replace(/[^\p{L}\p{N}' -]/gu, ' ').replace(/\s+/g, ' ').trim();
    const w = ph.split(' ').filter(x => x && !STOP_CAT.has(x));
    if (w.length >= 2 && ph.length >= 9) catPhrases.push([ph, c.key]);
  }));
  const STOP = new Set(('a an and or the of in on at by to for with without where which who whose whom that this these those is are was were be been being am ' +
    'she her hers he him his they them their it its from as if whether specify specifies specified say says said show shows showing find finding looking look want wants ' +
    'titles title any some all also etc movie movies film films tv series show shows female females woman women girl girls lady ladies character characters story stories ' +
    'plot plots get gets got end ending ends up out about like kind type one ones me my i you your please list give us we our there here then than so such very more most ' +
    'into onto over under while when what how why can could would should will just only even still already both each other others state states ' +
    'storyline storylines scene scenes include includes including research style cases case drama dramas episode episodes couple couples').split(' '));
  const R = (re, mk) => ({re, mk});
  // kind: 'hard' (filter, OR inside a group) | 'not' (exclusion) | 'concept' (strong test + weak text regex) | 'text'
  const C = (id, label, group, kind, test, weak) => ({id, label, group, kind, test, weak: weak || null});
  const K = (id, label, strong, weak) => C(id, label, id, 'concept', strong, weak);
  const RULES = [
    // years (hard)
    R(/\b(?:from |between )?((?:18|19|20)\d\d)\s*(?:-|to|until|through|and|till)\s*((?:18|19|20)\d\d)\b/g, m => ['range', +m[1], +m[2]]),
    R(/\b(before|pre|earlier than|older than|until|up to|through)\s*((?:18|19|20)\d\d)\b/g, m => ['range', null, /before|pre|earlier|older/.test(m[1]) ? +m[2] - 1 : +m[2]]),
    R(/\b(after|since|from|post|newer than|later than)\s*((?:18|19|20)\d\d)\b/g, m => ['range', /after|post|newer|later/.test(m[1]) ? +m[2] + 1 : +m[2], null]),
    R(/\b(?:the )?((?:18|19|20)\d)0'?s\b/g, m => ['range', +(m[1] + '0'), +(m[1] + '9')]),
    R(/\b(?:the )?'?([0-9])0'?s\b/g, m => { const d = +m[1]; const base = d <= 2 ? 2000 : 1900; return ['range', base + d * 10, base + d * 10 + 9]; }),
    R(/\b(?:in )?((?:18|19|20)\d\d)\b/g, m => ['range', +m[1], +m[1]]),
    // pregnancy status (hard field filters)
    R(/\b(?:specify|specifies|specified|state[sd]?|says?|whether|if|tell me if|mention\w*)\b[^|]{0,30}?\bpregnan\w*(?: (?:or not|at the end|in the end|by the end|at end))?/g, () => C('preg:known', 'Pregnancy: status recorded', 'preg', 'hard', pregKnown)),
    R(/\b(?:not|never|isn't|is not) pregnan\w*/g, () => C('preg:no', 'Pregnancy: not pregnant', 'preg', 'hard', e => low(e.pregnancy_outcome) === 'not pregnant' || /^no/.test(low(e.pregnant_end)))),
    // pregnancy concepts
    R(/\bpregnan\w* again\b|\bagain pregnant\b|\bexpecting again\b|\b(?:second|2nd|third|3rd|another|next) (?:pregnancy|baby|child)\b|\bpregnancy again\b|\bre-?pregnan\w*/g, () => K('again', 'Pregnant again', e => !!e.pregnancy_again || hasCat(e, AGAIN_CATS), /pregnan\w* again|again pregnant|expecting again|(second|another|next) (pregnancy|baby)/)),
    R(/\bmiscarr\w*|\blos(?:es|t|e) (?:the|her) baby\b/g, () => K('misc', 'Pregnancy: miscarriage', e => low(e.pregnancy_outcome) === 'miscarriage' || /miscarr/.test(low(e.pregnant_end) + low(e.pregnancy_note) + low(e.pregnant_end_note)) || e.pregnancy_again === 'miscarriage', /miscarr|lost (the|her) baby/)),
    R(/\bgives? birth\b|\bgave birth\b|\bhas the baby\b|\bbaby is born\b|\bchildbirth\b|\bdelivers? (?:the |a )?baby\b/g, () => K('birth', 'Pregnancy: gives birth', e => /birth/.test(low(e.pregnancy_outcome)) || /born|birth/.test(low(e.pregnant_end)) || e.pregnancy_again === 'birth', /gives birth|gave birth|giving birth|baby is born|childbirth|delivers (a|the|her) baby/)),
    R(/\bpregnan\w* (?:at|in|by) the end\b|\bpregnant at end\b|\bends? (?:up )?pregnant\b|\bbecomes? pregnant\b|\bgets? pregnant\b|\bfalls? pregnant\b/g, () => K('pregend', 'Pregnancy: pregnant at end', e => PREG_POS.slice(0, 5).includes(low(e.pregnancy_outcome)) || isYes(e.pregnant_end), /pregnant (at|by) the end|becomes pregnant|gets pregnant/)),
    R(/\bpregnan\w*|\bexpecting\b|\bbaby bump\b|\bwith child\b|\bmother-to-be\b/g, () => K('preg', 'Pregnant', e => PREG_POS.includes(low(e.pregnancy_outcome)) || isYes(e.pregnant_end) || !!e.pregnancy_again || hasCat(e, PREG_CATS), /pregnan|expecting a baby|baby bump/)),
    R(/\badopt\w*/g, () => K('adopt', 'Adoption', e => hasCat(e, ['adopt-pregnancy']), /adopt/)),
    // who she is
    R(/\b(?:kids?|child(?:ren)?|sons?|daughters?)\s+(?:see|sees|saw|seeing|watch|watches|watching|witness\w*|notice\w*|catch\w*|find\w*)\b|\bchild witness\w*|\bwitness(?:ed)? by (?:her )?(?:kids|children)\b/g, () => K('witness', 'Child witness', e => !!e.child_witness || hasCat(e, ['walkin', 'pregnant-walkin']), /(kids?|child(ren)?|son|daughter)\W+(\w+\W+){0,3}?(see|sees|saw|watch\w*|witness\w*|notice\w*)/)),
    R(/\b(?:couple|they|together)\b[^|]{0,20}?\b(?:kids|children|baby)\b|\b(?:kids|children) together\b|\bend(?:s|ing)? (?:up )?with (?:kids|children|a baby|a child)\b|\bhave kids at the end\b/g, () => K('kidsend', 'Couple has kids at end', e => isYes(e.kids_together))),
    R(/\b(?:no|without) (?:kids|children|child)\b|\bchildless\b/g, () => K('nokids', 'No kids before', e => /^no/.test(low(e.kids_status)) || e.existing_kids === '0' || /^no/.test(low(e.pregnant_has_children)))),
    R(/\bstep-?mo(?:m|ms|ther|thers)\b|\bstep-?mum\b|\bbonus moms?\b/g, () => K('stepmom', 'Stepmother', e => hasCat(e, ['stepmom-control', 'stepmom-pregnancy']), /step-?mo(m|ther)|stepmum|bonus mom/)),
    R(/\bmother[- ]in[- ]law\b|\bsaas\b/g, () => K('mil', 'Mother-in-law', e => false, /mother[- ]in[- ]law|\bsaas\b/)),
    R(/\b(?:already )?(?:has|have|having|with) (?:kids|children|a child|a son|a daughter|existing kids)\b(?: from before)?|\bkids from before\b|\bexisting (?:kids|children)\b|\bmothers?\b|\bmoms?\b|\bmums?\b|\bmommy\b|\bmummy\b|\bmommies\b|\bmama\b|\bmaa\b/g, () => K('mom', 'Mother / has kids', e => hasCat(e, MOM_CATS) || isYes(e.kids_status) || +e.existing_kids > 0 || isYes(e.pregnant_has_children), /\b(mother|mom|mum|mommy|mummy|mama)s?\b/)),
    R(/\bwi(?:fe|ves)\b|\bmarried wom[ae]n\b|\bhousewi(?:fe|ves)\b|\bbrides?\b/g, () => K('wife', 'Wife', e => hasCat(e, WIFE_CATS) || isYes(e.already_married), /\b(house)?wi(fe|ves)\b|\bmarried\b/)),
    R(/\blesbians?\b|\bsame[- ]sex\b|\btwo moms\b|\bwlw\b/g, () => K('lesbian', 'Lesbian couple', e => hasCat(e, ['lesbian-couple-pregnancy', 'pregnant-lesbian-intimate']), /lesbian|same-sex|two mothers|two moms/)),
    R(/\b(?:rich|wealthy) (?:wife|wives|woman|women|lady|heiress|widow)\b|\bheiress\w*|\bmillionair\w*|\bbillionair\w*|\brich\b|\bwealthy\b/g, () => K('rich', 'Rich woman / heiress', e => hasCat(e, ['index-49', 'index-50', 'index-51', 'index-52', 'index-53', 'index-54']), /heiress|\brich\b|wealthy|millionair|billionair|fortune/)),
    R(/\bwidow\w*|\bdivorc\w*/g, () => K('widow', 'Widow / divorcee', e => hasCat(e, ['widow-divorcee', 'widow-divorcee-remarry-pregnant']), /widow|divorc/)),
    R(/\bsurroga\w*|\bivf\b/g, () => K('surrogate', 'Surrogacy / IVF', e => hasCat(e, ['index-55', 'index-59']), /surroga|ivf/)),
    R(/\bpolygam\w*|\bco-?wives?\b|\bsecond wife\b/g, () => K('polygamy', 'Polygamy', e => hasCat(e, ['polygamy-hypnosis', 'polygamy-pregnancy']), /polygam|second wife|co-wife/)),
    R(/\b(?:queens?|princess(?:es)?|royal\w*)\b/g, () => K('royal', 'Queen / princess', e => hasCat(e, ['royal-hypnosis']), /\bqueen|princess|royal/)),
    R(/\bcults?\b|\bbrainwash\w*/g, () => K('cult', 'Cult / brainwashing', e => hasCat(e, ['cult']), /\bcult\b|brainwash/)),
    R(/\bdevil\b|\bdeal with (?:a|the) (?:devil|demon)\b/g, () => K('devil', "Devil's deal", e => hasCat(e, ['devil-deal-pregnancy-hypnosis', 'devil-deal-pregnancy']), /devil/)),
    R(/\b(?:age[- ]gap|young wife|older husband|older man)\b/g, () => K('agegap', 'Age-gap marriage', e => hasCat(e, ['agegap-marriage']), /age gap|older husband|older man/)),
    R(/\b(?:cheat\w*|infidelity|affair)\b/g, () => K('cheat', 'Infidelity', e => hasCat(e, ['cheat-control', 'index-57']), /cheat|infidelity|affair/)),
    R(/\bultrasound|\bscan\b|\bgender reveal\b/g, () => K('scan', 'Ultrasound / scan', e => hasCat(e, ['index-56', 'index-64', 'index-65', 'index-66']), /ultrasound|gender reveal/)),
    R(/\bwalks? in\b|\bwalk-?in\b/g, () => K('walkin', 'Child walk-in', e => hasCat(e, ['walkin', 'pregnant-walkin']), /walks? in/)),
    R(/\badults?(?: only| title| rated)?\b|\br-?rated\b|\bnc-?17\b|\b18\+|\berotic\w*|\bexplicit\b|\bsteamy\b/g, () => K('adult', 'Adult / R-rated', e => isYes(e.adult) || /^(r\b|nc-17|tv-ma)/i.test(e.rating || '') || hasCat(e, ['adult-hypnosis', 'erotic-mainstream', 'hardcore-adult', 'index-64', 'adult-pregnancy']))),
    // who controls her
    R(/\bstep-?(?:father|dad)\b/g, () => K('stepdad', 'Controller: stepfather', e => hasCat(e, ['stepfather-control', 'remarried-wife-control']), /step-?(father|dad)/)),
    R(/\bhusbands?\b|\bspouse\b/g, () => K('husband', 'Controller: husband', e => hasCat(e, HUSB_CATS) || hyp(e, /husband/), /husband/)),
    R(/\bboyfriend\b|\bex[- ]?(?:husband|boyfriend)\b|\bpartner\b/g, () => K('partner', 'Controller: partner / ex', e => hasCat(e, ['partner-control', 'mom-partner-control', 'partner-commissioned']) || hyp(e, /boyfriend|partner|\bex\b/), /boyfriend|partner/)),
    R(/\b(?:hypno)?therapists?\b|\bpsychiatrists?\b|\bpsychologists?\b|\bshrinks?\b|\bcounsel+ors?\b|\bhypnotherap\w*/g, () => K('therapist', 'Controller: therapist', e => hasCat(e, ['therapist-wife', 'medical']) || hyp(e, /therap|psychiat|psycholog/), /therap|psychiat|psycholog/)),
    R(/\bdoctors?\b|\bdr\b/g, () => K('doctor', 'Controller: doctor', e => hasCat(e, ['doctor-gain', 'medical']) || hyp(e, /doctor|\bdr\b|physician/), /doctor|\bdr\b/)),
    R(/\bvillains?\b|\bbad guy\b/g, () => K('villain', 'Controller: villain', e => hasCat(e, ['human', 'villain']))),
    R(/\btantri[ck]\w*|\bblack magic\b|\bwitchcraft\b|\bsorcer\w*/g, () => K('magic', 'Tantrik / black magic', e => hasCat(e, ['tantrik', 'villain', 'occult']), /tantri|black magic|witchcraft|sorcer/)),
    // why
    R(/\binherit\w*|\bestate\b/g, () => K('inherit', 'Motive: inheritance', e => gm(e, /inherit/), /inherit/)),
    R(/\bmoney\b|\bwealth\b|\bfortune\b|\bproperty\b|\binsurance\b|\bgreed\b/g, () => K('money', 'Motive: money', e => gm(e, /money|inherit|fraud/) || hasCat(e, ['index-49']), /\bmoney\b|fortune|property|insurance|inherit/)),
    R(/\bmarr(?:y|iage|ied|ies)\b|\bwedding\b/g, () => K('marriage', 'Marriage', e => gm(e, /marr/) || hasCat(e, ['hypnotized-to-marry', 'hypnotized-marriage', 'index-51', 'hypnotised-mother-marriage']) || isYes(e.married), /marr(y|iage|ies)|wedding/)),
    R(/\blove potions?\b|\bpotions?\b|\blove spells?\b/g, () => K('potion', 'Love potion', e => hasCat(e, ['index-53']), /potion|love spell/)),
    R(/\blove\b|\bromance\b|\bromantic\b/g, () => K('love', 'Love', e => gm(e, /love/) || hasCat(e, ['love', 'index-51', 'index-53']))),
    R(/\bsex\w*|\blust\b|\bintima\w*|\bseduc\w*/g, () => K('sex', 'Sex / intimacy', e => gm(e, /sex/) || hasCat(e, ['hypno-intimacy', 'index-50', 'pregnant-sex', 'pregnant-intimate', 'pregnant-lesbian-intimate']), /\bsex|intima|seduc/)),
    R(/\bcrimes?\b|\bcriminal\b|\bmurder\w*|\bkill\w*|\brobber\w*|\bheist\b|\bfraud\b/g, () => K('crime', 'Crime', e => gm(e, /crime|fraud|murder/) || hasCat(e, ['crime']), /crime|murder|robber|heist|fraud/)),
    R(/\brevenge\b|\bvengeance\b/g, () => K('revenge', 'Revenge', e => gm(e, /revenge/) || hasCat(e, ['index-52']), /revenge|vengeance/)),
    // how
    R(/\bmind[- ]?control\w*/g, () => K('mind', 'Mind control', e => hasCat(e, HYP_CATS), /mind[- ]?control|brainwash/)),
    R(/\bhypno\w*|\bmesmeri[sz]\w*|\btrance\w*|\bspell-?bound\b/g, () => K('hypno', 'Hypnotized', e => hasCat(e, HYP_CATS), /hypno|mesmer|trance/)),
    R(/\bdevices?\b|\bgadgets?\b|\bmicrochip\w*|\bmachines?\b/g, () => K('device', 'Device / tech', e => hasCat(e, ['tech', 'scifi']), /device|chip|machine/)),
    R(/\bvampir\w*/g, () => K('vampire', 'Vampire', e => hasCat(e, ['vampire']), /vampir|dracula/)),
    R(/\bmagic\w*|\bspells?\b|\benchant\w*/g, () => K('spell', 'Magic / spell', e => hasCat(e, ['tantrik', 'fantasy', 'occult']), /magic|spell|enchant/)),
    R(/\bdrug\w*|\bpills?\b/g, () => K('drug', 'Drugs', e => hasCat(e, ['tech']), /drug|pill/)),
    R(/\bhigh[- ]confidence\b|\bverified\b|\bconfirmed\b|\breliable\b/g, () => K('conf', 'High confidence', e => /^high|verified|cross-checked/i.test((e.confidence_flag || '') + ' ' + (e.evidence || '')))),
    // format / free (hard)
    R(/\bvertical(?: short)?(?: dramas?| series| shorts?| plays?)?\b|\bmicro-?dramas?\b|\bshort (?:dramas?|plays?)\b|\breelshort\b|\bdramabox\b|\bshortmax\b|\bflextv\b|\bgoodshort\b|\bnetshort\b|\bdramawave\b|\bhongguo\b|\bdouyin\b|\bkuaishou\b/g, () => C('fmt:vertical', 'Format: vertical short / microdrama', 'fmt', 'hard', e => e.format === 'vertical series' || /vertical|micro-?drama|short drama|reelshort|dramabox|shortmax|flextv|goodshort|netshort|dramawave|hongguo|douyin|kuaishou/.test(metaL(e)))),
    R(/\bfree (?:link|links|to watch|streaming|online)\b|\bwatch free\b|\bfree\b/g, () => C('free', 'Has free link', 'free', 'hard', e => (e.watch_links || []).length > 0)),
    R(/\b(?:web )?movies?\b|\b(?:feature |web )?films?\b|\bcinema\b/g, () => C('fmt:movie', 'Format: movie', 'fmt', 'hard', e => e.format === 'movie')),
    R(/\btv(?: series| shows?| dramas?)?\b|\b(?:web )?series\b|\bsoaps?(?: operas?)?\b|\bserials?\b|\bepisodes?\b|\bsitcoms?\b|\btelenovelas?\b|\bsinetron\b|\bdramas?\b/g, () => C('fmt:tv', 'Format: TV / soap / episode', 'fmt', 'hard', e => e.format === 'tv')),
    R(/\bshorts\b|\bshort films?\b/g, () => C('fmt:short', 'Format: shorts', 'fmt', 'hard', e => e.format === 'short'))];
  const NEG = [   // words that may be excluded with 'not' / 'no' / 'without' / 'excluding'
    [/^possess\w*|^spirits?$|^ghosts?$|^djinn$/, 'possession / spirits', e => hasCat(e, ['spirit', 'pregnancy-evil', 'exwife-control']) || /possess/.test(e._txt)],
    [/^supernatural$|^demons?$|^demonic$|^occult$/, 'supernatural', e => hasCat(e, ['occult', 'spirit', 'pregnancy-evil', 'index-60', 'evil-female'])],
    [/^vampir\w*$/, 'vampires', e => hasCat(e, ['vampire']) || /vampir/.test(e._txt)],
    [/^magic\w*$|^tantri\w*$|^spells?$/, 'magic', e => hasCat(e, ['tantrik', 'fantasy', 'occult'])],
    [/^horror$/, 'horror', e => /horror/.test(metaL(e)) || hasCat(e, ['index-60'])],
    [/^comed\w*$/, 'comedy', e => /comedy/.test(metaL(e)) || hasCat(e, ['index-62'])],
    [/^hardcore$|^porn\w*$/, 'hardcore', e => hasCat(e, ['hardcore-adult']) || !!e.content_label],
    [/^fan[- ]?made$|^roleplay$/, 'fan-made', e => hasCat(e, ['fan-made-roleplay'])],
    [/^anim\w*$|^cartoons?$|^anime$/, 'animation', e => /anim|cartoon/.test(metaL(e))],
    [/^aliens?$|^sci-?fi$/, 'sci-fi', e => hasCat(e, ['scifi'])]];
  let parsedFor = null, parsed = null;
  function parseQuery(q){
    if (q === parsedFor) return parsed;
    let s = ' ' + q.toLowerCase().replace(/[–—]/g, '-').replace(/[’‘`]/g, "'").replace(/[^\p{L}\p{N}'+\- ]+/gu, ' | ').replace(/\s+/g, ' ') + ' ';
    const crit = [], ids = new Set(); let lo = null, hi = null, yearHit = false;
    const push = c => { if (!ids.has(c.id)) { ids.add(c.id); crit.push(c); } };
    s = s.replace(/\b(?:not|no|non|without|excluding|exclude|except|minus)[- ]([\p{L}-]+)/gu, (m, w) => {
      const hit = NEG.find(([re]) => re.test(w)); if (!hit) return m;
      push(C('not:' + hit[1], 'Exclude: ' + hit[1], 'not:' + hit[1], 'not', hit[2])); return ' | ';
    });
    for (const [label, qre, test] of COUNTRIES) s = s.replace(new RegExp(qre.source, 'g'), () => { push(C('geo:' + label, 'Country: ' + label, 'geo', 'hard', test)); return ' | '; });
    for (const {re, mk} of RULES) s = s.replace(re, (...a) => { const r = mk(a); if (Array.isArray(r)) { yearHit = true; if (r[1] !== null) lo = lo === null ? r[1] : Math.min(lo, r[1]); if (r[2] !== null) hi = hi === null ? r[2] : Math.max(hi, r[2]); } else push(r); return ' | '; });
    // category phrases taken from the site's own labels (whatever the concept rules did not already cover)
    for (const [ph, key] of catPhrases) if (s.includes(' ' + ph + ' ')) { s = s.split(' ' + ph + ' ').join(' | '); push(K('cat:' + key, 'Category: ' + (legendLabel[key] || key), e => e.categories.includes(key))); }
    if (yearHit) { const L = lo, H = hi; push(C('year', 'Years: ' + (L !== null && H !== null ? (L === H ? L : L + '–' + H) : L !== null ? L + ' or later' : 'up to ' + H), 'year', 'hard', e => e._year !== null && (L === null || e._year >= L) && (H === null || e._year <= H))); }
    const text = [...new Set(s.split(/[\s|]+/).map(w => w.replace(/^[-']+|[-']+$/g, '')).filter(w => w.length >= 3 && !STOP.has(w) && !/^\d+$/.test(w)))];
    text.forEach(w => { const stem = w.length > 4 ? w.replace(/(ies|es|s)$/, '') : w;
      crit.push(C('text:' + w, '“' + w + '”', 'text:' + w, 'text', e => e._hay.includes(stem))); });
    parsedFor = q; parsed = crit; return crit;
  }
  // context mode whenever any recognised (non-text) term is present
  const smartOn = () => !!state.q && parseQuery(state.q).some(c => c.kind !== 'text');
  const activeCrit = () => parseQuery(state.q).filter(c => !state.drop.has(c.id));
  const idxs = (h, re) => { const g = new RegExp(re.source, 'g'), r = []; let m; while ((m = g.exec(h)) && r.length < 60) { r.push(m.index); if (!m[0]) g.lastIndex++; } return r; };
  const near = (h, a, b, d) => { const A = idxs(h, a), B = idxs(h, b); return A.some(i => B.some(j => Math.abs(i - j) <= d)); };
  // tier 0 = title match, 1 = every concept strong, 2 = every concept matched (some only in the text),
  // 3 = all but one concept matched (only shown when tiers 1+2 are small); -1 = excluded
  function tierOf(e, cs){
    const groups = {};
    for (const c of cs) if (c.kind === 'hard') (groups[c.group] = groups[c.group] || []).push(c);
    for (const g in groups) if (!groups[g].some(c => c.test(e))) return [-1, 0];
    for (const c of cs) if (c.kind === 'not' && c.test(e)) return [-1, 0];
    const ks = cs.filter(c => c.kind === 'concept'), text = cs.filter(c => c.kind === 'text');
    const tHit = text.filter(c => c.test(e)).length;
    const words = (cs._titleWords || []);
    const tl = low(e.title + ' ' + (e.subtitle || ''));
    const titleHit = words.length && words.every(w => tl.includes(w));
    if (!ks.length) return titleHit ? [0, 9] : (text.length && !tHit ? [-1, 0] : [1, tHit]);
    const strong = [], weak = [], miss = [];
    for (const c of ks) { if (c.test(e)) strong.push(c); else if (c.weak && c.weak.test(e._txt)) weak.push(c); else miss.push(c); }
    // two or more concepts found only in the text must be mentioned close together
    if (weak.length >= 2) for (const c of [...weak]) if (!weak.some(o => o !== c && near(e._txt, c.weak, o.weak, 160))) { weak.splice(weak.indexOf(c), 1); miss.push(c); }
    const score = strong.length * 3 + weak.length + tHit * 0.5;
    if (titleHit) return [0, score];
    if (!miss.length) return [weak.length ? 2 : 1, score];
    if (ks.length >= 3 && miss.length === 1 && strong.length >= 2) return [3, score];
    return [-1, 0];
  }
  let tierCache = {key: null};
  function tierStats(cs){   // how many records reach tiers 1-2 for this query (ignoring the other UI filters)
    const key = state.q + '|' + [...state.drop].join(',');
    if (tierCache.key !== key) { let n = 0; for (const e of D.entries) { const t = tierOf(e, cs)[0]; if (t === 0 || t === 1 || t === 2) n++; } tierCache = {key, n}; }
    return tierCache.n;
  }
  function smartScore(e){
    const cs = activeCrit();
    if (!cs._titleWords) {   // words a title would need to contain to count as a title match
      const w = state.q.split(/[^\p{L}\p{N}']+/u).filter(x => x.length >= 3 && !STOP.has(x));
      cs._titleWords = w.length ? w : [];
    }
    const [t, s] = tierOf(e, cs);
    if (t === 3 && tierStats(cs) >= 15) { e._tier = -1; return -1; }
    e._tier = t; return t < 0 ? -1 : s;
  }
  const TIER_LABEL = ['Title matches', 'Best matches: every term matched by the catalog’s own categories / fields', 'Near matches: some terms found only in the plot text', 'Partial matches: all but one term'];
  function renderChips(){
    const box = $('#chips');
    if (!smartOn()) { box.hidden = true; box.innerHTML = ''; return; }
    const cs = parseQuery(state.q);
    box.hidden = false;
    box.innerHTML = `<span class="chips-lbl">Understood as:</span>` + cs.map(c => {
      const off = state.drop.has(c.id);
      return `<button type="button" class="chip ${c.kind === 'concept' ? 'soft' : c.kind}${off ? ' off' : ''}" data-chip="${esc(c.id)}" aria-pressed="${!off}" title="${off ? 'Dropped: click to use again' : (c.kind === 'hard' ? 'Filter' : c.kind === 'not' ? 'Exclusion' : c.kind === 'text' ? 'Extra word (ranking only)' : 'Main term') + ': click to drop'}">${c.kind === 'text' ? 'Text: ' : ''}${esc(c.label)} <span aria-hidden="true">${off ? '+' : '×'}</span></button>`; }).join('') +
      `<span class="chips-help">Solid chips filter; outlined chips are the main terms (best matches first). Click a chip to drop it.</span>`;
  }
  // year filter: one min–max range (dual-handle slider) whose bounds come from the data; the period
  // buckets are presets that move the slider ('custom' = any other range). Records without a year are
  // shown only when the full range is selected ('All years') or under 'Year unknown'.
  let YMIN = Infinity, YMAX = -Infinity;
  D.entries.forEach(e => { if (e._year !== null) { YMIN = Math.min(YMIN, e._year); YMAX = Math.max(YMAX, e._year); } });
  const clampY = y => Math.max(YMIN, Math.min(YMAX, y));
  const curRange = () => { const lo = parseInt(state.ymin, 10), hi = parseInt(state.ymax, 10);
    return [isNaN(lo) ? YMIN : clampY(lo), isNaN(hi) ? YMAX : clampY(hi)]; };
  const bucketRange = p => [p.lo === null ? YMIN : clampY(p.lo), p.hi === null ? YMAX : clampY(p.hi)];
  function setRange(lo, hi){   // store a range and work out which bucket (if any) it equals
    lo = clampY(lo); hi = clampY(hi); if (lo > hi) [lo, hi] = [hi, lo];
    state.ymin = lo <= YMIN ? '' : String(lo); state.ymax = hi >= YMAX ? '' : String(hi);
    if (!state.ymin && !state.ymax) { state.yr = 'all'; return; }
    const b = PERIODS.find(p => p.key !== 'unknown' && (([l, h]) => l === lo && h === hi)(bucketRange(p)));
    state.yr = b ? b.key : 'custom';
  }
  const rangeOk = e => { if (!state.ymin && !state.ymax) return true; if (e._year === null) return false;
    const [lo, hi] = curRange(); return e._year >= lo && e._year <= hi; };
  const yearOk = (e, skipPeriod) => skipPeriod ? true : state.yr === 'unknown' ? e._year === null : rangeOk(e);
  const baseMatch = e => (state.cat === 'all' || e.categories.includes(state.cat)) &&
    (state.fmt === 'all' || e.format === state.fmt) &&
    (state.src === 'all' || e.from_sources.includes(state.src)) &&
    (state.tag === 'all' || (e.tags || []).includes(state.tag)) &&
    (state.again === 'all' || (state.again === 'any' ? !!e.pregnancy_again : e.pregnancy_again === state.again)) &&
    (!state.q || (smartOn() ? (e._score = smartScore(e)) >= 0 : state.q.split(/\s+/).every(t => e._hay.includes(t))));
  const LABEL_CATS = ['hardcore-adult', 'fan-made-roleplay'];
  const labelOk = e => !e.content_label || state.labelled || LABEL_CATS.includes(state.cat);
  const freeOk = e => labelOk(e) && (!state.free || (e.watch_links || []).length > 0);
  const matches = e => baseMatch(e) && yearOk(e) && freeOk(e);
  function periodCounts(){   // live counts per period under the other active filters
    const base = D.entries.filter(e => baseMatch(e) && yearOk(e, true) && freeOk(e));
    $('#freeToggle').textContent = `Has free link (${D.entries.filter(e => baseMatch(e) && yearOk(e) && (e.watch_links || []).length).length})`;
    const sel = $('#period');
    sel.querySelector('option[value="all"]').textContent = `All years (${base.length})`;
    PERIODS.forEach(p => { sel.querySelector(`option[value="${p.key}"]`).textContent = `${p.label} (${base.filter(e => p.test(e._year)).length})`; });
    const cu = sel.querySelector('option[value="custom"]'); cu.hidden = state.yr !== 'custom';
    if (state.yr === 'custom') { const [lo, hi] = curRange(); cu.textContent = `Custom: ${lo}–${hi} (${base.filter(rangeOk).length})`; }
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
    const ch = app.character || (e.character ? `Character: ${e.character.replace(/^Character:\s*/i, '')}` : '');
    const note = app.entry_note || (e.note ? `Note: ${e.note}` : '');
    const prov = app.provenance || (e.provenance ? `Source basis: ${e.provenance}` : '');
    const subgroup = app._group ? `<p class="entry-note subgroup"><strong>Subgroup:</strong> ${esc(app._group)}</p>` : '';
    const copies = e.merged_from && e.merged_from.length ? [e.primary_copy, ...e.merged_from] : [];
    const distinct = copies.filter(m => m.distinct_story).length;
    const copyRow = (m, i) => {
      const plot = m.summary ? esc(m.summary) : `<em>${m.index_title ? 'title-index listing only; the source gives no plot for this copy' : 'no plot in the source for this copy'}</em>`;
      const extra = [m.character ? `<strong>Character:</strong> ${esc(m.character.replace(/^Character:\s*/i, ''))}` : '', (Array.isArray(m.episodes) ? m.episodes : []).length ? `<strong>${esc(UI.episodes)}:</strong> ${m.episodes.map(x => esc(x.episode) + ' — ' + esc(x.gist)).join('; ')}` : '', m.pregnant_has_children ? `<strong>Already has children:</strong> ${esc(m.pregnant_has_children)}` : '', m.married ? `<strong>Marries her:</strong> ${esc(m.married)}` : '', m.already_married ? `<strong>Already married when hypnotized:</strong> ${esc(m.already_married)}` : '', m.pregnant_end ? `<strong>Pregnant by the end:</strong> ${esc(m.pregnant_end)}` : '', m.kids_together ? `<strong>Kids together:</strong> ${esc(m.kids_together)}` : '', m.kids_status ? `<strong>Already has children:</strong> ${esc(m.kids_status)}` : '', m.pregnancy_again ? `<strong>Pregnant again:</strong> ${esc(m.pregnancy_again)}` : '', m.rating ? `<strong>Rating:</strong> ${esc(m.rating)}` : '', m.evidence ? `<strong>${/^single source/i.test(m.evidence) ? 'Single source' : 'Sources cross-checked'}:</strong> ${esc(m.evidence.replace(/^single source\s*[—-]\s*/i, ''))}` : '', m.source_conflict ? `<strong>Source conflict:</strong> ${esc(m.source_conflict)}` : '', m.fit_note ? `<strong>Fit:</strong> ${esc(m.fit_note)}` : '', (m.tags || []).length ? `<strong>Tags:</strong> ${m.tags.map(esc).join(', ')}` : '', m.note ? `<strong>Note:</strong> ${esc(m.note)}` : '', (m.categories || []).length ? `<strong>Listed under:</strong> ${m.categories.map(c => esc(catLabel[c] || c)).join(', ')}` : '',
        m.identifiers.length ? '' : '<span class="noid">no episode, date or alternate title given in the source</span>'].filter(Boolean).join(' · ');
      const links = (m.sources || []).length ? ` <span class="clinks">${m.sources.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label || 'Source')} ↗</a>`).join(' ')}</span>` : '';
      return `<li class="${m.distinct_story ? 'distinct' : ''}"><span class="csrc" title="${esc(srcLabel[m.source])}">${esc(srcShort[m.source])}</span> <strong class="clabel">${esc(m.label)}</strong>${i === 0 ? ' <span class="cmain">shown above</span>' : ''} — <span class="cplot">${plot}</span>${extra ? `<span class="cextra">${extra}</span>` : ''}${links}</li>`;
    };
    const merged = copies.length ? `<details class="merged"><summary>Merged copies (${copies.length})${distinct ? ` · ${distinct + 1} different episodes/storylines` : ''}</summary><ol>${copies.map(copyRow).join('')}</ol></details>` : '';
    const idxNote = e.index_only ? `<p class="entry-note"><strong>Title index only:</strong> listed by ${esc(srcLabel[e.from_sources[0]] || 'the title index')} without plot details.</p>` : '';
    const badges = `<span class="srcbadges">${e.from_sources.map(s => `<span title="${esc(srcLabel[s])}">${esc(srcShort[s])}</span>`).join('')}</span>`;
    const lab = (s) => s.replace(/^(Character:|Note:|Source basis:|Author \/ artist:|Adult basis:)/, '<strong>$1</strong>');
    return `<article class="card" id="r${e.id}">${thumb}
      <div class="card-top"><span>${esc(e.meta)}</span><span class="year">${badges}${esc(app.year_display || e.year || 'Year unresolved')}</span></div>
      ${e.content_label ? `<p class="content-label" role="note"><strong>${esc(e.content_label)}</strong></p>` : ''}
      <h3>${esc(e.title)}${e.subtitle ? `<small>${esc(e.subtitle)}</small>` : ''}</h3>${subgroup}
      ${ch ? `<p class="character">${lab(esc(ch))}</p>` : ''}
      ${summary ? `<p class="summary">${UI.summary ? `<strong>${esc(UI.summary)}:</strong> ` : ''}${esc(summary)}</p>` : ''}
      ${note ? `<p class="entry-note">${lab(esc(note))}</p>` : ''}${idxNote}
      ${e.pregnant_has_children ? `<p class="entry-note"><strong>Pregnant character already has children:</strong> ${esc(e.pregnant_has_children)}</p>` : ''}
      ${e.hypnotist ? `<p class="entry-note"><strong>Hypnotized for gain:</strong> by ${esc(e.hypnotist)}${(e.gain_motive || []).length ? ' · gain: ' + esc([].concat(e.gain_motive).join(', ')) : ''}${e.method ? ' · method: ' + esc(e.method) : ''}</p>` : ''}
      ${e.married ? `<p class="entry-note outcome"><strong>Marries her:</strong> ${esc(e.married)}${e.married_note ? ' — ' + esc(e.married_note) : ''}</p>` : ''}
      ${e.already_married ? `<p class="entry-note"><strong>${esc(UI.married)}:</strong> ${esc(e.already_married)}${e.already_married_note ? ' — ' + esc(e.already_married_note) : ''}</p>` : ''}
      ${e.pregnant_end ? `<p class="entry-note outcome"><strong>Pregnant by the end:</strong> ${esc(e.pregnant_end)}${e.pregnant_end_note ? ' — ' + esc(e.pregnant_end_note) : ''}</p>` : ''}
      ${e.kids_status ? `<p class="entry-note"><strong>${esc(UI.kids_status)}:</strong> ${esc(e.kids_status)}${e.kids_note ? ' — ' + esc(e.kids_note) : ''}</p>` : ''}
      ${e.pregnancy_again ? `<p class="entry-note outcome"><strong>Pregnant again — outcome:</strong> ${esc(e.pregnancy_again)}${e.pregnancy_again_note ? ' — ' + esc(e.pregnancy_again_note) : ''}</p>` : ''}
      ${e.rating || e.adult || e.existing_kids ? `<p class="entry-note">${[e.existing_kids ? `<strong>Children before this pregnancy:</strong> ${esc(e.existing_kids)}` : '', e.rating ? `<strong>Rating:</strong> ${esc(e.rating)}` : '', e.adult ? `<strong>Adult title:</strong> ${esc(e.adult)}` : ''].filter(Boolean).join(' · ')}</p>` : ''}
      ${e.child_witness ? `<p class="entry-note witness"><strong>Who saw it:</strong> ${esc(e.child_witness)}</p>` : ''}
      ${e.kids_together ? `<p class="entry-note"><strong>${e.married ? 'Kids together' : 'Kids together with husband'}:</strong> ${esc(e.kids_together)}${e.kids_together_note ? ' — ' + esc(e.kids_together_note) : ''}</p>` : ''}
      ${e.evidence ? `<p class="entry-note evidence${/^single source/i.test(e.evidence) ? ' single' : ''}"><strong>${/^single source/i.test(e.evidence) ? 'Single source' : 'Sources cross-checked'}:</strong> ${esc(e.evidence.replace(/^single source\s*[—-]\s*/i, ''))}</p>` : ''}
      ${e.source_conflict ? `<p class="entry-note conflict"><strong>Source conflict:</strong> ${esc(e.source_conflict)}</p>` : ''}
      ${e.fit_note ? `<p class="entry-note"><strong>Fit:</strong> ${esc(e.fit_note)}</p>` : ''}
      ${Array.isArray(e.episodes) && e.episodes.length ? `<div class="episodes"><strong>${esc(UI.episodes)}</strong><ul>${e.episodes.map(x => `<li><b>${esc(x.episode)}</b>${x.air_date ? ` <span class="epdate">(${esc(x.air_date)})</span>` : ''}${x.number_verified === false ? ' <em>episode number not verified</em>' : ''} — ${esc(x.gist)}</li>`).join('')}</ul></div>` : ''}
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
    const smart = smartOn();
    const hits = D.entries.filter(matches).sort(smart && state.view === 'grid' ? (x, y) => (x._tier - y._tier) || (y._score - x._score) || byEntry(x, y) : byEntry);
    periodCounts(); renderChips();
    $('#count').textContent = `${hits.length} record${hits.length === 1 ? '' : 's'}` + (hits.length !== D.entries.length ? ` of ${D.entries.length}` : '');
    if (!hits.length){ grid.innerHTML = '<div class="empty">No records match these filters.</div>'; return; }
    let html = '';
    if (state.view === 'grid'){
      if (smart) {   // tier dividers: title matches / best / near / partial
        const per = {}; hits.forEach(e => { per[e._tier] = (per[e._tier] || 0) + 1; });
        const multi = Object.keys(per).length > 1; let last = null;
        html = hits.slice(0, state.limit).map(e => { let d = '';
          if (multi && e._tier !== last) { last = e._tier; d = `<div class="tier tier${e._tier}" role="separator"><strong>${esc(TIER_LABEL[e._tier])}</strong> <span>${per[e._tier]} record${per[e._tier] === 1 ? '' : 's'}</span></div>`; }
          return d + card(e); }).join('');
      } else html = hits.slice(0, state.limit).map(e => card(e)).join('');
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
    $('#category').value = state.cat; $('#format').value = state.fmt; $('#source').value = state.src; $('#tag').value = state.tag; $('#again').value = state.again;
    $('#period').value = state.yr; $('#freeToggle').setAttribute('aria-pressed', state.free); $('#labelToggle').setAttribute('aria-pressed', !!state.labelled);
    paintSlider();
    document.querySelectorAll('.view-toggle button').forEach(b => b.setAttribute('aria-pressed', b.dataset.view === state.view));
    document.querySelectorAll('#legend button').forEach(b => b.setAttribute('aria-pressed', b.dataset.cat === state.cat));
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q); if (state.cat !== 'all') p.set('cat', state.cat);
    if (state.fmt !== 'all') p.set('fmt', state.fmt); if (state.src !== 'all') p.set('src', state.src); if (state.tag !== 'all') p.set('tag', state.tag); if (state.again !== 'all') p.set('again', state.again);
    if (state.yr !== 'all') p.set('yr', state.yr); if (state.ymin) p.set('ymin', state.ymin); if (state.ymax) p.set('ymax', state.ymax); if (state.free) p.set('free', '1'); if (state.labelled) p.set('lab', '1'); if (state.view !== 'grid') p.set('view', state.view); if (state.q && state.drop.size) p.set('xq', [...state.drop].join(','));
    if (push) history.replaceState(null, '', (p.toString() ? '#' + p : location.pathname));
    updateMore();
    render();
  }
  // 'More filters' disclosure: source, tag, view, years and free-link live in a panel that is collapsed by
  // default; the button shows how many of those hidden filters are active
  const moreBtn = $('#moreBtn'), morePanel = $('#morePanel');
  const hiddenActive = () => [state.src !== 'all', state.tag !== 'all', state.again !== 'all', state.view !== 'grid', state.yr !== 'all', state.free].filter(Boolean).length;
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
  state.again = ['any', 'birth', 'miscarriage', 'ongoing', 'unknown'].includes(init.get('again')) ? init.get('again') : 'all';
  state.drop = new Set((init.get('xq') || '').split(',').filter(Boolean));
  { const yr = init.get('yr'), lo = parseInt(init.get('ymin'), 10), hi = parseInt(init.get('ymax'), 10);
    if (yr === 'unknown') { state.yr = 'unknown'; }
    else if (!isNaN(lo) || !isNaN(hi)) setRange(isNaN(lo) ? YMIN : lo, isNaN(hi) ? YMAX : hi);
    else if (periodOf[yr]) setRange(...bucketRange(periodOf[yr])); } state.free = init.get('free') === '1'; state.labelled = init.get('lab') === '1'; state.view = init.get('view') || 'grid';
  if (hiddenActive()) setMore(true);   // a hidden filter set from the URL hash opens the panel
  let t;
  $('#search').addEventListener('input', e => { clearTimeout(t); t = setTimeout(() => { const q = e.target.value.trim().toLowerCase(); if (q !== state.q) state.drop = new Set(); state.q = q; state.limit = PAGE; sync(true); }, 160); });
  $('#chips').addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; const id = b.dataset.chip;
    if (state.drop.has(id)) state.drop.delete(id); else state.drop.add(id); state.limit = PAGE; sync(true); });
  $('#category').addEventListener('change', e => { state.cat = e.target.value; state.limit = PAGE; sync(true); });
  $('#format').addEventListener('change', e => { state.fmt = e.target.value; state.limit = PAGE; sync(true); });
  $('#source').addEventListener('change', e => { state.src = e.target.value; state.limit = PAGE; sync(true); });
  $('#tag').addEventListener('change', e => { state.tag = e.target.value; state.limit = PAGE; sync(true); });
  // pregnant-again outcome filter (records carrying 'pregnancy_again': birth / miscarriage / ongoing / unknown)
  const againCounts = {}; D.entries.forEach(e => { if (e.pregnancy_again) againCounts[e.pregnancy_again] = (againCounts[e.pregnancy_again] || 0) + 1; });
  $('#again').insertAdjacentHTML('beforeend', `<option value="any">Pregnant again: any outcome (${Object.values(againCounts).reduce((a, b) => a + b, 0)})</option>` +
    ['birth', 'miscarriage', 'ongoing', 'unknown'].filter(k => againCounts[k]).map(k => `<option value="${k}">Pregnant again: ${k} (${againCounts[k]})</option>`).join(''));
  $('#again').addEventListener('change', e => { state.again = e.target.value; state.limit = PAGE; sync(true); });
  $('#period').insertAdjacentHTML('beforeend', PERIODS.map(p => `<option value="${p.key}">${esc(p.label)}</option>`).join('') + '<option value="custom" hidden>Custom</option>');
  $('#period').addEventListener('change', e => { const v = e.target.value;
    if (v === 'all') { state.yr = 'all'; state.ymin = state.ymax = ''; }
    else if (v === 'unknown') { state.yr = 'unknown'; state.ymin = state.ymax = ''; }
    else if (periodOf[v]) setRange(...bucketRange(periodOf[v]));
    state.limit = PAGE; sync(true); });
  // dual-handle slider: two range inputs on one track; the label updates live, the list after a short pause
  const yMinEl = $('#ymin'), yMaxEl = $('#ymax');
  [yMinEl, yMaxEl].forEach(el => { el.min = YMIN; el.max = YMAX; });
  function paintSlider(lo, hi){
    if (lo === undefined) { [lo, hi] = curRange(); yMinEl.value = lo; yMaxEl.value = hi; }
    const span = (YMAX - YMIN) || 1, pl = (lo - YMIN) / span, ph = (hi - YMIN) / span;
    // the fill sits between the thumb centres (thumbs are ~24px wide, so inset by 12px)
    $('#yrFill').style.left = `calc(${pl * 100}% + ${12 - pl * 24}px)`; $('#yrFill').style.right = `calc(${(1 - ph) * 100}% + ${12 - (1 - ph) * 24}px)`;
    yMinEl.style.zIndex = lo > YMIN + span / 2 ? 3 : 1; yMaxEl.style.zIndex = 2;   // keep the min thumb grabbable when both sit at the right end
    const full = lo === YMIN && hi === YMAX;
    $('#yrOut').textContent = state.yr === 'unknown' ? 'Year unknown only' : full ? `All years (${YMIN} – ${YMAX}, incl. undated)` : `${lo} – ${hi}`;
    yMinEl.setAttribute('aria-valuetext', `From ${lo}`); yMaxEl.setAttribute('aria-valuetext', `To ${hi}`);
  }
  let yt;
  [yMinEl, yMaxEl].forEach(el => el.addEventListener('input', () => {
    let lo = +yMinEl.value, hi = +yMaxEl.value;
    if (lo > hi) { if (el === yMinEl) { hi = lo; yMaxEl.value = hi; } else { lo = hi; yMinEl.value = lo; } }
    if (state.yr === 'unknown') state.yr = 'all';
    setRange(lo, hi); paintSlider(lo, hi); $('#period').value = state.yr;
    clearTimeout(yt); yt = setTimeout(() => { state.limit = PAGE; sync(true); }, 180); }));
  $('#freeToggle').addEventListener('click', () => { state.free = !state.free; state.limit = PAGE; sync(true); });
  $('#labelToggle').addEventListener('click', () => { state.labelled = !state.labelled; state.limit = PAGE; sync(true); });
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
