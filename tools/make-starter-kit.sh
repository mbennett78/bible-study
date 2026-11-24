#!/bin/sh
# Builds the starter kit: the whole app, ready for another family to run as their own copy.
# This family's web address, sign-in settings and tracker are taken out, so nothing of ours
# goes along. The kit is made from the last commit, so commit first.
# Run from the repository root: sh tools/make-starter-kit.sh [out.tar.gz]
set -eu
OUT="${1:-family-bible-study-starter-kit.tar.gz}"
case "$OUT" in /*) ;; *) OUT="$PWD/$OUT" ;; esac
WORK="$(mktemp -d)"
KIT="$WORK/family-bible-study"
mkdir -p "$KIT"
git archive HEAD | tar -x -C "$KIT"

# Our own things stay behind: the domain, the Supabase project, the starter password and
# this family's to-do list.
rm -f "$KIT/CNAME" "$KIT/STATUS.md"
cp "$KIT/js/config.example.js" "$KIT/js/config.js"
# The web address in the user guide and gift packet: blank until they put in their own.
sed -i.bak 's/^export const SITE = ".*";$/export const SITE = "";/' "$KIT/js/guide.js" && rm "$KIT/js/guide.js.bak"
grep -q '^export const SITE = "";$' "$KIT/js/guide.js"

# The one-page checklist goes at the top, with its links pointing into docs/.
sed -e 's#\](SETUP.md) (docs/SETUP.md)#](docs/SETUP.md)#' -e 's#\](\([A-Z-]*\.md\))#](docs/\1)#g' \
  docs/STARTER-CHECKLIST.md > "$KIT/START-HERE.md"

# Nothing of ours may slip through.
# (Patterns are pieces of our domain, Supabase project ref and publishable key.)
if grep -rIl -e "breakout""room" -e "cyelhrnrf""btfpeyrcxkv" -e "KxpSSotz""-ak6X" "$KIT"; then
  echo "Stopped: the kit still has this family's details in the files above." >&2; exit 1
fi

tar -czf "$OUT" -C "$WORK" family-bible-study
rm -rf "$WORK"
echo "Saved $OUT"
