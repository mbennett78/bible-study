import json, re, collections
osis="Gen Exod Lev Num Deut Josh Judg Ruth 1Sam 2Sam 1Kgs 2Kgs 1Chr 2Chr Ezra Neh Esth Job Ps Prov Eccl Song Isa Jer Lam Ezek Dan Hos Joel Amos Obad Jonah Mic Nah Hab Zeph Hag Zech Mal Matt Mark Luke John Acts Rom 1Cor 2Cor Gal Eph Phil Col 1Thess 2Thess 1Tim 2Tim Titus Phlm Heb Jas 1Pet 2Pet 1John 2John 3John Jude Rev".split()
ids="GEN EXO LEV NUM DEU JOS JDG RUT 1SA 2SA 1KI 2KI 1CH 2CH EZR NEH EST JOB PSA PRO ECC SNG ISA JER LAM EZK DAN HOS JOL AMO OBA JON MIC NAM HAB ZEP HAG ZEC MAL MAT MRK LUK JHN ACT ROM 1CO 2CO GAL EPH PHP COL 1TH 2TH 1TI 2TI TIT PHM HEB JAS 1PE 2PE 1JN 2JN 3JN JUD REV".split()
M=dict(zip(osis,ids))
places=[]; chap=collections.defaultdict(list)
strip=lambda t: re.sub(r"<[^>]+>","",t or "").strip()
for l in open("ancient.jsonl"):
    d=json.loads(l)
    idn=d.get("identifications") or []
    if not idn: continue
    top=idn[0]; res=(top.get("resolutions") or [{}])[0]
    ll=res.get("lonlat")
    if not ll: continue
    lon,lat=map(float,ll.split(","))
    score=top.get("score",{}).get("time_total",0)
    conf=3 if score>=750 else 2 if score>=350 else 1
    modern=strip(top.get("description"))
    t=(d.get("types") or ["place"])[0]
    i=len(places)
    places.append([d["friendly_id"], round(lat,3), round(lon,3), conf, modern if modern!=d["friendly_id"] else "", t, len(idn), d.get("url_slug","")])
    seen=set()
    for v in d.get("verses",[]):
        b,c,_=v["osis"].split(".")[:3]
        k=f"{M[b]}.{c}"
        if k not in seen: seen.add(k); chap[k].append(i)
out={"places":places,"chapters":chap}
js=json.dumps(out,separators=(",",":"),ensure_ascii=False)
open("/home/user/bible-study/data/places.json","w").write(js)
print(len(places), len(chap), len(js))
print(sorted(set(p[5] for p in places)))
