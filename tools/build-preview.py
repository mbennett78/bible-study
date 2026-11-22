"""Bundles the app into one HTML file for a claude.ai preview page.
The preview can't reach Bible text services, so text.js is swapped for a placeholder."""
import re, sys
out = sys.argv[1]
html = open('index.html').read()
css = open('styles.css').read()
body = re.search(r'<body>(.*)</body>', html, re.S).group(1)
body = re.sub(r'\s*<script type="module" src="js/app.js"></script>', '', body)
stub = '''
class TextError extends Error { constructor(m, k) { super(m); this.kind = k; } }
async function listEnglishBibles() { throw new TextError("Versions load once the app is on its own web address.", "preview"); }
async function getChapter(version, book, ch) {
  const name = BOOK_BY_ID[book].name;
  return { html: `<div class="message"><strong>Preview</strong>The ${version} text of ${name} ${ch} will appear here once the app is on its own web address and your free key is in Settings. Everything else works here: paths, progress, trivia, journal, history, favorites and drive mode.</div>`, copyright: "", label: version };
}
function bibleGatewayUrl(version, book, ch) {
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(`${BOOK_BY_ID[book].name} ${ch}`)}&version=${version === "ESV" ? "ESV" : "NASB"}`;
}
'''
files = ['js/books.js', 'js/store.js', None, 'js/paths.js', 'js/speech.js', 'js/trivia-bank.js', 'js/trivia.js', 'js/app.js']
parts = []
for f in files:
    if f is None: parts.append(stub); continue
    t = open(f).read()
    if f == 'js/store.js': t = t.replace('"bible-study:v1"', '"bible-study-preview:v1"')
    parts.append(t)
js = '\n'.join(parts)
js = re.sub(r'^import [\s\S]*?;\s*$', '', js, flags=re.M)
js = re.sub(r'^export (const|function|class|async function)', r'\1', js, flags=re.M)
js = js.replace('if ("serviceWorker" in navigator) {\n  navigator.serviceWorker.register("sw.js").catch(() => {});\n}', '')
open(out, 'w').write(f'<title>Bible Study</title>\n<style>\n{css}\n</style>\n{body}\n<script>\n(() => {{\n{js}\n}})();\n</script>\n')
