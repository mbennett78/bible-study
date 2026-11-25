# Builds data/conc/: for every Strong's number, every chapter and verse where that Hebrew or
# Greek word appears, from the per-chapter word lists in data/strongs/. Files are grouped by
# hundreds (like data/lex), e.g. data/conc/G7.json holds G700-G799.
# Run from the repository root: python3 scripts/build-conc.py
import json, glob, os, collections
ids = "GEN EXO LEV NUM DEU JOS JDG RUT 1SA 2SA 1KI 2KI 1CH 2CH EZR NEH EST JOB PSA PRO ECC SNG ISA JER LAM EZK DAN HOS JOL AMO OBA JON MIC NAM HAB ZEP HAG ZEC MAL MAT MRK LUK JHN ACT ROM 1CO 2CO GAL EPH PHP COL 1TH 2TH 1TI 2TI TIT PHM HEB JAS 1PE 2PE 1JN 2JN 3JN JUD REV".split()
order = {b: i for i, b in enumerate(ids)}
idx = collections.defaultdict(list)
for f in glob.glob("data/strongs/*.json"):
    b, c = os.path.basename(f)[:-5].split(".")
    for r in json.load(open(f)):
        idx[r[0]].append((order[b], int(c), b, r[5]))
buckets = collections.defaultdict(dict)
for n, rows in idx.items():
    rows.sort()
    # Compact form: "JHN.1:1,2,14" strings, one per chapter, in Bible order.
    buckets[n[0] + str(int(n[1:]) // 100)][n] = [f"{b}.{c}:{','.join(map(str, vs))}" for _, c, b, vs in rows]
os.makedirs("data/conc", exist_ok=True)
total = 0
for k, d in buckets.items():
    js = json.dumps(d, separators=(",", ":"), ensure_ascii=False); total += len(js)
    open(f"data/conc/{k}.json", "w").write(js)
print(len(buckets), "files", total // 1024, "KB")
