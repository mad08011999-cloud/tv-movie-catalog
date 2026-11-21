#!/usr/bin/env python3
"""Build adult/data.json and adult/catalog.js from adult/entries.json (curated by research scripts).
Separate from the hypnosis catalog: this never touches /data.json, assets/data.js or scripts/sync.py.
Run: python3 adult/build.py"""
import json,os,collections,datetime
here=os.path.dirname(os.path.abspath(__file__))
src=json.load(open(os.path.join(here,'entries.json'),encoding='utf-8'))
E=src['entries']
E.sort(key=lambda e:(e['title'].lower(),e.get('year','')))
for i,e in enumerate(E,1): e['id']=i
cc=collections.Counter(c for e in E for c in e['categories'])
cats=[dict(key=k,label=v,entry_count=cc.get(k,0)) for k,v in src['categories'].items() if cc.get(k)]
fmt=collections.Counter(e['format'] for e in E)
out=dict(generated=datetime.date.today().isoformat(),categories=cats,formats=dict(fmt),entries=E,dropped=src.get('dropped',[]))
json.dump(out,open(os.path.join(here,'data.json'),'w',encoding='utf-8'),ensure_ascii=False,indent=1)
print(len(E),'entries',dict(fmt))
FMT_KEY=lambda f:'fmt-'+''.join(ch if ch.isalnum() else '-' for ch in f.lower()).strip('-')
def conv(e):
    return dict(id=e['id'],title=e['title'],subtitle='',year=str(e.get('year') or ''),meta=e.get('meta',''),
      character='',summary=e.get('summary',''),note=e.get('note',''),provenance='',
      already_married='',pregnant_end=e.get('pregnant_end',''),kids_together=e.get('kids_together',''),kids_status=e.get('kids_before',''),
      evidence=e.get('evidence',''),
      episodes=[],tags=e.get('tags',[]),fit_note='',format=FMT_KEY(e['format']),categories=e['categories'],sources=e.get('sources',[]),
      youtube_ids=[],from_sources=['adult'],merged_from=[],watch_links=[],index_only=False,thumbnail='',creator='',adult='yes')
CE=[conv(e) for e in E]
secs=[dict(title=c['label'],category=c['key'],description='',notes=[],from_sources=['adult'],groups=[dict(title='',notes=[],items=[dict(id=e['id']) for e in E if c['key'] in e['categories']])]) for c in cats]
drop=src.get('dropped_summary',{})
dl=''.join(f"<li>{k}: {v}</li>" for k,v in drop.items())
bd=[dict(html=f"<b>{n}</b> {f}") for f,n in fmt.most_common()]
C=dict(source=dict(kicker='ADULT SCREEN CATALOG (18+): EROTIC AND R-RATED TITLES',
  description=src.get('description',''),
  snapshot_label='Adult catalog snapshot: '+out['generated'],snapshot_breakdowns=bd,
  research_notes_html=f'<details><summary>How this list was built and what was excluded</summary><div class="note-body"><p>{src.get("method","")}</p><ul>{dl}</ul></div></details>'),
  sources=[dict(id='adult',label='Curated adult screen list',kind='local',share_url='entries.json',check=dict(raw_count=len(E)),status='live')],
  entry_count=len(E),categories=[dict(c,legend_label=c['label']) for c in cats],
  formats=[dict(key=FMT_KEY(f),label=f'{f} ({n})') for f,n in sorted(fmt.items())],entries=CE,sections=secs,unplaced_entry_ids=[])
open(os.path.join(here,'catalog.js'),'w',encoding='utf-8').write('window.CATALOG = '+json.dumps(C,ensure_ascii=False)+';\nwindow.CATALOG_UI = {episodes: "Episodes", married: "Married", kids_status: "Had kids before", summary: "Plot"};\n')
