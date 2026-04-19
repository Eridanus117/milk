#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
INDEX_FILE="$ROOT_DIR/index.html"
BUILD_INFO_FILE="$ROOT_DIR/build-info.json"

if [[ ! -f "$INDEX_FILE" ]]; then
  echo "index.html not found: $INDEX_FILE" >&2
  exit 1
fi

VERSION="${1:-$(date '+%Y.%m.%d')}"
ASSET_VERSION="${2:-$(date '+%Y%m%d-%H%M%S')}"
BUILD_TIME="$(date '+%Y-%m-%dT%H:%M:%S%z')"

cat > "$BUILD_INFO_FILE" <<JSON
{
  "version": "$VERSION",
  "buildTime": "$BUILD_TIME",
  "assetVersion": "$ASSET_VERSION"
}
JSON

perl -0pi -e "s/version: '[^']*'/version: '$VERSION'/g; s/buildTime: '[^']*'/buildTime: '$BUILD_TIME'/g; s/assetVersion: '[^']*'/assetVersion: '$ASSET_VERSION'/g; s/(css\\/styles\\.css\\?v=)[^\"']*/\${1}$ASSET_VERSION/g; s/(js\\/[a-zA-Z0-9_\\/-]+\\.js\\?v=)[^\"']*/\${1}$ASSET_VERSION/g" "$INDEX_FILE"

echo "Updated build metadata:"
echo "  version: $VERSION"
echo "  buildTime: $BUILD_TIME"
echo "  assetVersion: $ASSET_VERSION"
