import json,sys,urllib.request
src=sys.argv[1] if len(sys.argv)>1 else "data.json"
d=json.load(urllib.request.urlopen(src)) if src.startswith("http") else json.load(open(src))
E=d["entries"]; ids={e["id"]:e for e in E}
assert len(ids)==len(E)
def find(sub):
    r=[e for e in E if sub in e["title"]]; assert len(r)==1,(sub,len(r)); return r[0]
for sub,ep in [("Dihipnotis Perampok","4FWV_KlwO9Q"),("Tamu Misterius","qws5Ztd3R1I"),("Diikat Perampok","yzSeVoArVYM"),
               ("Penjahat Baju Hitam","S3Oz4Bi3zEQ"),("Revina Kena Hipnotis","mSU9tv3K6HQ"),("Утраченные воспоминания",None),("亡夫假面",None)]:
    e=find(sub); b=json.dumps(e,ensure_ascii=False)
    if ep: assert ep in b
assert "Part 4" in json.dumps(find("Утраченные воспоминания"),ensure_ascii=False)
assert ids[2334]["title"].startswith("Cuidado con el") and ids[1979]["id"]==1979   # stable ids
assert sum("Cuidado con el" in e["title"] for e in E)==1
before=json.load(open(sys.argv[2])) if len(sys.argv)>2 else {}
for k,t in before.items(): assert ids[int(k)]["title"]==t,(k,t)
print("OK",d["entry_count"])
