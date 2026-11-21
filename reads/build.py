#!/usr/bin/env python3
"""Build reads/data.json from reads/entries.json (hand-curated). Run: python3 reads/build.py"""
import json,os,collections,datetime
here=os.path.dirname(os.path.abspath(__file__))
src=json.load(open(os.path.join(here,'entries.json'),encoding='utf-8'))
E=src['entries']
for i,e in enumerate(E,1): e['id']=i
cc=collections.Counter(c for e in E for c in e['categories'])
cats=[dict(key=k,label=v,entry_count=cc.get(k,0)) for k,v in src['categories'].items() if cc.get(k)]
fmt=collections.Counter(e['format'] for e in E)
out=dict(generated=datetime.date.today().isoformat(),categories=cats,formats=dict(fmt),entries=E,dropped=src.get('dropped',[]))
json.dump(out,open(os.path.join(here,'data.json'),'w',encoding='utf-8'),ensure_ascii=False,indent=1)
print(len(E),'entries',dict(fmt))

# ---- catalog.js: the same window.CATALOG schema the main page uses, so reads/index.html runs the shared ../assets/app.js ----
FMT_KEY=lambda f:'fmt-'+''.join(ch if ch.isalnum() else '-' for ch in f.lower()).strip('-')
cat_label=src['categories']
def conv(e):
    sub=e.get('original_title') if e.get('original_title') and e.get('original_title')!=e['title'] else ''
    meta=' · '.join(x for x in [e.get('format'),e.get('language'),e.get('publisher')] if x)
    r=dict(id=e['id'],title=e['title'],subtitle=sub,year=str(e.get('year') or ''),meta=meta,
      character='Author / artist: '+e['creator'] if e.get('creator') else '',
      summary=e.get('gist',''),note=e.get('note',''),
      provenance=('Adult basis: '+e['adult_basis']) if e.get('adult_basis') else '',
      already_married=e.get('wife',''),pregnant_end=e.get('pregnant_end',''),kids_together=e.get('kids_together',''),kids_status=e.get('kids_before',''),
      episodes=[dict(episode=e['where'],gist='where the hypnosis / mind control happens')] if e.get('where') else [],
      tags=['loose fit'] if e.get('loose_fit') else [],fit_note='Loose fit' if e.get('loose_fit') else '',
      format=FMT_KEY(e['format']),categories=e['categories'],sources=e.get('sources',[]),youtube_ids=[],from_sources=['reads'],
      merged_from=[],watch_links=[],index_only=False,thumbnail='',creator=e.get('creator',''))
    if e.get('content_label'): r['content_label']=e['content_label']
    return r
CE=[conv(e) for e in E]
secs=[dict(title=c['label'],category=c['key'],description='',notes=[],from_sources=['reads'],groups=[dict(title='',notes=[],items=[dict(id=e['id']) for e in E if c['key'] in e['categories']])]) for c in cats]
drop=''.join(f"<li>{d['title']}: {d['reason']}</li>" for d in src.get('dropped',[]))
bd=[dict(html=f"<b>{n}</b> {f}") for f,n in fmt.most_common()]
C=dict(source=dict(kicker='READS: WRITTEN-FICTION STORY-PATTERN INDEX',
  description='Comics, manga, manhwa, manhua, webtoons, novels, light and web novels, hentai and erotica in which an adult woman, especially a wife, is hypnotized or mind-controlled. These are text listings only, with every entry sourced. Adults only: anything with a minor or a character of unverifiable age is excluded.',
  snapshot_label='Reads snapshot: '+out['generated'],snapshot_breakdowns=bd,
  research_notes_html=f'<details><summary>Excluded under the adults-only rule ({len(src.get("dropped",[]))})</summary><div class="note-body"><ul>{drop}</ul></div></details>'),
  sources=[dict(id='reads',label='Curated reads list',kind='local',share_url='entries.json',check=dict(raw_count=len(E)),status='live')],
  entry_count=len(E),categories=[dict(c,legend_label=c['label']) for c in cats],
  formats=[dict(key=FMT_KEY(f),label=f'{f} ({n})') for f,n in sorted(fmt.items())],entries=CE,sections=secs,unplaced_entry_ids=[])
open(os.path.join(here,'catalog.js'),'w',encoding='utf-8').write('window.CATALOG = '+json.dumps(C,ensure_ascii=False)+';\nwindow.CATALOG_UI = {episodes: "Chapters", married: "Wife", kids_status: "Kids before", summary: "Hypnosis summary"};\n')
