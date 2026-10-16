(async function(){
  const d=await (await fetch('data.json',{cache:'no-cache'})).json();
  const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const LABEL_CATS=['hardcore-adult','fan-made-roleplay'];const st={q:'',cat:'',fmt:'',labelled:false};
  const catLabel=Object.fromEntries(d.categories.map(c=>[c.key,c.label]));
  d.categories.forEach(c=>$('#cat').insertAdjacentHTML('beforeend',`<option value="${c.key}">${esc(c.label)} (${c.entry_count})</option>`));
  Object.entries(d.formats).sort().forEach(([f,n])=>$('#fmt').insertAdjacentHTML('beforeend',`<option>${esc(f)}</option>`));
  d.dropped.forEach(x=>$('#dropped').insertAdjacentHTML('beforeend',`<li>${esc(x.title)} — <em>${esc(x.reason)}</em></li>`));
  $('#gen').textContent='Built '+d.generated+' · '+d.entries.length+' entries';
  function card(e){return `<article class="rcard">${e.content_label?`<p class="content-label">${esc(e.content_label)}</p>`:''}
   <h3>${esc(e.title)}</h3><p class="orig">${esc(e.original_title)} · ${esc(e.creator)} · ${esc(e.year)}</p>
   <p>${esc(e.gist)}</p><dl><dt>Format</dt><dd>${esc(e.format)} · ${esc(e.language)}</dd><dt>Publisher</dt><dd>${esc(e.publisher)}</dd>
   <dt>Where</dt><dd>${esc(e.where)}</dd><dt>Wife?</dt><dd>${esc(e.wife)}</dd><dt>Pregnant by end</dt><dd>${esc(e.pregnant_end)}</dd>
   <dt>Kids together</dt><dd>${esc(e.kids_together)}</dd><dt>Kids before</dt><dd>${esc(e.kids_before)}</dd>
   ${e.adult_basis?`<dt>Adult basis</dt><dd>${esc(e.adult_basis)}</dd>`:''}</dl>
   ${e.loose_fit?`<p class="loose">Loose fit${e.note?': '+esc(e.note):''}</p>`:(e.note?`<p>${esc(e.note)}</p>`:'')}
   <p class="chips">${e.categories.map(c=>`<span>${esc(catLabel[c]||c)}</span>`).join('')}</p>
   <p>${e.sources.map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join(' · ')}</p></article>`}
  function render(){const q=st.q.toLowerCase();
   const list=d.entries.filter(e=>(!e.content_label||st.labelled||LABEL_CATS.includes(st.cat))&&(!st.cat||e.categories.includes(st.cat))&&(!st.fmt||e.format===st.fmt)&&(!q||JSON.stringify([e.title,e.original_title,e.creator,e.gist,e.publisher]).toLowerCase().includes(q)));
   $('#grid').innerHTML=list.map(card).join('')||'<p>No matches.</p>';$('#count').textContent=list.length+' shown';}
  $('#q').oninput=e=>{st.q=e.target.value;render()};$('#cat').onchange=e=>{st.cat=e.target.value;render()};$('#fmt').onchange=e=>{st.fmt=e.target.value;render()};
  $('#labelToggle').onclick=e=>{st.labelled=!st.labelled;e.target.setAttribute('aria-pressed',st.labelled);render()};render();
})();
