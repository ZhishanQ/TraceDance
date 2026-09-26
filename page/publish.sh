#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."

if [[ -n "$(git status --porcelain -- page)" ]]; then
  printf '%s\n' 'Commit the intended page/ changes before publishing.' >&2
  exit 1
fi

site_commit=$(git subtree split --prefix=page HEAD)
git push origin "${site_commit}:refs/heads/gh-pages"
