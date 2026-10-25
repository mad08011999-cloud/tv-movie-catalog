import json,sys,urllib.request
src=sys.argv[1] if len(sys.argv)>1 else "data.json"
d=json.load(urllib.request.urlopen(src)) if src.startswith("http") else json.load(open(src))
ids={e["id"]:e for e in d["entries"]}
blob=lambda i: json.dumps(ids[i],ensure_ascii=False)
assert ids[2968]["title"]=="Bhabi Ji Ghar Par Hai!" and "E223" in blob(2968) and "E224" in blob(2968)
assert ids[155]["title"]=="Sasural Simar Ka" and "E1066" in blob(155)
assert ids[615]["title"]=="Suhani Si Ek Ladki" and "S23E08" in blob(615)
assert sum(e["title"].startswith("Pandya Store") for e in d["entries"])==1
assert "E203" in json.dumps([e for e in d["entries"] if e["title"].startswith("Pandya Store")][0],ensure_ascii=False)
assert len({e["id"] for e in d["entries"]})==len(d["entries"])
assert ids[3348]["id"]==3348 and ids[865]["title"]=="7 Aum Arivu"   # ids stable
print("OK",d["entry_count"])
