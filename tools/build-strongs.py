#!/usr/bin/env python3
"""Builds the Strong's concordance data the study section shows under every chapter.

Sources (both free to reuse, credited in the app):
  - STEPBible TAHOT and TAGNT (Tyndale House, Cambridge; CC BY 4.0): every Hebrew and
    Greek word of the Bible tagged with its Strong's number, in English verse numbering.
  - Open Scriptures Strong's dictionaries (CC BY-SA): James Strong's original
    definitions (public domain) and KJV renderings.

Usage: python3 tools/build-strongs.py <download-dir>
  The download dir holds the four TAHOT_*.txt files, tagnt1.txt, tagnt2.txt, heb.js and grk.js.

Output:
  data/strongs/<BOOK>.<chapter>.json  one per chapter: [strongs, lemma, translit, gloss,
                                      whole-Bible count, verses in this chapter, (1 = small word)]
  data/lex/<H|G><bucket>.json         Strong's dictionary entries, 100 numbers per file
"""
import glob, json, os, re, sys
from collections import OrderedDict, defaultdict

SRC = sys.argv[1]
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_CH = os.path.join(ROOT, "data", "strongs")
OUT_LEX = os.path.join(ROOT, "data", "lex")

REF = re.compile(r"^([1-3A-Z][A-Za-z]{1,2})\.(\d+)\.(\d+)(?:\([^)]*\))?#\d+=(\S+)")

def num(s):  # "H0430G" -> "H430"
    m = re.match(r"([HG])0*(\d+)", s)
    return f"{m.group(1)}{m.group(2)}" if m else None

def load_dict(path):
    text = open(path, encoding="utf-8").read()
    start = text.index("{", text.index("Dictionary = "))
    end = text.rindex("}") + 1
    return json.loads(text[start:end])

heb = load_dict(os.path.join(SRC, "heb.js"))
grk = load_dict(os.path.join(SRC, "grk.js"))

# chapter key -> OrderedDict(strongs -> {lemma, gloss, verses set})
chapters = defaultdict(OrderedDict)
counts = defaultdict(int)
gloss_seen = {}

def add(book, ch, v, n, lemma, gloss, small=False):
    counts[n] += 1
    key = f"{book.upper()}.{ch}"
    e = chapters[key].get(n)
    if not e:
        e = chapters[key][n] = {"lemma": lemma, "gloss": gloss, "verses": [], "small": small}
    if not e["verses"] or e["verses"][-1] != v:
        e["verses"].append(v)
    gloss_seen.setdefault(n, gloss)

for path in sorted(glob.glob(os.path.join(SRC, "TAHOT_*.txt"))):
    for line in open(path, encoding="utf-8"):
        m = REF.match(line)
        if not m:
            continue
        book, ch, v, kind = m.group(1), int(m.group(2)), int(m.group(3)), m.group(4)
        if not (kind.startswith("L") or kind.startswith("Q")):
            continue  # skip written-only (Ketiv) and other variant lines so words aren't counted twice
        cols = line.rstrip("\n").split("\t")
        mm = re.search(r"\{(H\d+)[A-Za-z]?\}", cols[4]) if len(cols) > 4 else None
        if not mm:
            continue
        n = num(mm.group(1))
        segs = cols[4].split("/")
        idx = next((i for i, x in enumerate(segs) if "{" in x), 0)
        pos = cols[5].lstrip("H").split("/")
        small = idx < len(pos) and pos[idx][:1] in ("R", "C", "T", "P")  # preposition, conjunction, particle, pronoun
        if not n or int(n[1:]) >= 9000:  # H9xxx are prefixes and punctuation
            continue
        exp = cols[11] if len(cols) > 11 else ""
        em = re.search(r"\{H\d+[A-Za-z]?=([^=]*)=([^}]*)\}", exp)
        lemma = em.group(1) if em else heb.get(n, {}).get("lemma", "")
        gloss = em.group(2) if em else cols[3]
        gloss = re.split(r"[»@]", gloss)[0].lstrip(": ").replace("_", " ").strip()
        add(book, ch, v, n, lemma, gloss, small)

for path in (os.path.join(SRC, "tagnt1.txt"), os.path.join(SRC, "tagnt2.txt")):
    for line in open(path, encoding="utf-8"):
        m = REF.match(line)
        if not m:
            continue
        book, ch, v, kind = m.group(1), int(m.group(2)), int(m.group(3)), m.group(4)
        if "N" not in kind.upper():
            continue  # keep the words in the critical Greek text the NASB and ESV translate
        cols = line.rstrip("\n").split("\t")
        n = num(cols[3].split("=")[0]) if len(cols) > 4 else None
        if not n:
            continue
        lemma, _, gloss = cols[4].partition("=")
        g = cols[3].partition("=")[2]
        small = g.split("-")[0] in ("T", "CONJ", "PREP", "PRT", "P", "R", "COND", "INJ") or g.startswith("PRT")
        add(book, ch, v, n, lemma, gloss.split("/")[0].strip(), small)

def translit(n):
    d = heb.get(n) if n[0] == "H" else grk.get(n)
    return (d or {}).get("xlit") or (d or {}).get("translit") or ""

os.makedirs(OUT_CH, exist_ok=True)
for f in glob.glob(os.path.join(OUT_CH, "*.json")):
    os.remove(f)
for key, words in chapters.items():
    rows = [[n, e["lemma"], translit(n), e["gloss"], counts[n], e["verses"]] + ([1] if e["small"] else []) for n, e in words.items()]
    with open(os.path.join(OUT_CH, f"{key}.json"), "w", encoding="utf-8") as fh:
        json.dump(rows, fh, ensure_ascii=False, separators=(",", ":"))

os.makedirs(OUT_LEX, exist_ok=True)
for f in glob.glob(os.path.join(OUT_LEX, "*.json")):
    os.remove(f)
buckets = defaultdict(dict)
for src, letter in ((heb, "H"), (grk, "G")):
    for n, d in src.items():
        nn = num(n)
        if not nn:
            continue
        buckets[f"{letter}{int(nn[1:]) // 100}"][nn] = {
            "lemma": d.get("lemma", ""),
            "xlit": d.get("xlit") or d.get("translit") or "",
            "pron": d.get("pron", ""),
            "from": (d.get("derivation") or "").strip(),
            "def": (d.get("strongs_def") or "").strip(),
            "kjv": (d.get("kjv_def") or "").strip(),
            "count": counts.get(nn, 0),
        }
for b, entries in buckets.items():
    with open(os.path.join(OUT_LEX, f"{b}.json"), "w", encoding="utf-8") as fh:
        json.dump(entries, fh, ensure_ascii=False, separators=(",", ":"))

print(f"{len(chapters)} chapters, {len(buckets)} dictionary files, {len(counts)} Strong's numbers used")
