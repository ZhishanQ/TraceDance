#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."

if [[ -n "$(git status --porcelain -- page)" ]]; then
  printf '%s\n' 'Commit the intended page/ changes before publishing.' >&2
  exit 1
fi

git fetch --prune origin
source_commit=$(git rev-parse --short HEAD)
site_tree=$(git rev-parse HEAD:page)
parent_args=()
if git show-ref --verify --quiet refs/remotes/origin/gh-pages; then
  parent_args=(-p refs/remotes/origin/gh-pages)
fi
site_commit=$(git commit-tree "$site_tree" "${parent_args[@]}" -m "Publish page from ${source_commit}")
git push origin "${site_commit}:refs/heads/gh-pages"
