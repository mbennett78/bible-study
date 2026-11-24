import json, os, collections
osis="Gen Exod Lev Num Deut Josh Judg Ruth 1Sam 2Sam 1Kgs 2Kgs 1Chr 2Chr Ezra Neh Esth Job Ps Prov Eccl Song Isa Jer Lam Ezek Dan Hos Joel Amos Obad Jonah Mic Nah Hab Zeph Hag Zech Mal Matt Mark Luke John Acts Rom 1Cor 2Cor Gal Eph Phil Col 1Thess 2Thess 1Tim 2Tim Titus Phlm Heb Jas 1Pet 2Pet 1John 2John 3John Jude Rev".split()
ids="GEN EXO LEV NUM DEU JOS JDG RUT 1SA 2SA 1KI 2KI 1CH 2CH EZR NEH EST JOB PSA PRO ECC SNG ISA JER LAM EZK DAN HOS JOL AMO OBA JON MIC NAM HAB ZEP HAG ZEC MAL MAT MRK LUK JHN ACT ROM 1CO 2CO GAL EPH PHP COL 1TH 2TH 1TI 2TI TIT PHM HEB JAS 1PE 2PE 1JN 2JN 3JN JUD REV".split()
M=dict(zip(osis,ids))
def conv(r):
    b,c,v=r.split("."); return M[b],int(c),int(v)
chap=collections.defaultdict(lambda: collections.defaultdict(list))
for line in open("cr.txt").read().splitlines()[1:]:
    f,t,votes=line.split("\t"); votes=int(votes)
    if votes<3: continue
    fb,fc,fv=conv(f)
    if "-" in t:
        a,b=t.split("-"); ab,ac,av=conv(a); bb,bc,bv=conv(b)
        s=f"{ab}.{ac}.{av}-{bv}" if (ab,ac)==(bb,bc) else f"{ab}.{ac}.{av}-{bc}:{bv}" if ab==bb else f"{ab}.{ac}.{av}"
    else:
        ab,ac,av=conv(t); s=f"{ab}.{ac}.{av}"
    chap[(fb,fc)][fv].append((votes,s))
out="/home/user/bible-study/data/xref"; os.makedirs(out,exist_ok=True)
total=0
for (b,c),vs in chap.items():
    d={str(v):[s for _,s in sorted(l,key=lambda x:-x[0])[:6]] for v,l in sorted(vs.items())}
    js=json.dumps(d,separators=(",",":")); total+=len(js)
    open(f"{out}/{b}.{c}.json","w").write(js)
print(len(chap), total)
