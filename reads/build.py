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
