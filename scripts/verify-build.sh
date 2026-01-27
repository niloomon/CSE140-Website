#!/bin/bash
# Script to verify the build has correct paths for GitHub Pages

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

echo "=== Verifying Build ==="
echo ""

if [ ! -f "$PROJECT_ROOT/dist/index.html" ]; then
  echo "ERROR: dist/index.html not found. Please run the build first."
  exit 1
fi

echo "Checking index.html for asset paths..."
echo ""

# Check for absolute paths that don't include base path
ABSOLUTE_PATHS=$(grep -E '(src|href)=["\047]/assets/' "$PROJECT_ROOT/dist/index.html" | grep -v "/CSE140-Website/assets/" || true)

if [ -n "$ABSOLUTE_PATHS" ]; then
  echo "❌ FOUND ISSUES: Absolute paths without base path detected:"
  echo "$ABSOLUTE_PATHS"
  echo ""
  echo "These paths need to include /CSE140-Website/ prefix"
  exit 1
else
  echo "✅ All asset paths look correct"
fi

echo ""
echo "Checking for correct base path patterns..."
CORRECT_PATHS=$(grep -E '(src|href)=["\047]/CSE140-Website/assets/' "$PROJECT_ROOT/dist/index.html" | wc -l | tr -d ' ')

if [ "$CORRECT_PATHS" -gt 0 ]; then
  echo "✅ Found $CORRECT_PATHS asset references with correct base path"
else
  echo "⚠️  WARNING: No paths with /CSE140-Website/ prefix found"
fi

echo ""
echo "Sample of asset paths in index.html:"
grep -E '(src|href)=["\047].*assets/' "$PROJECT_ROOT/dist/index.html" | head -5

echo ""
echo "=== Verification Complete ==="
