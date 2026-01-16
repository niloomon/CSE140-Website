#!/bin/bash
# Build script for GitHub Pages deployment
# Usage: ./scripts/build-github-pages.sh [repository-name]
# If repository-name is not provided, it will try to detect from git or use "CSE-140-Website"

set -e  # Exit on error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

# Determine repository name
# If no argument provided, try to detect from git
if [ -z "$1" ]; then
  # Try to detect from git if not provided
  if command -v git &> /dev/null; then
    GIT_REMOTE=$(git remote get-url origin 2>/dev/null || echo "")
    if [ -n "$GIT_REMOTE" ]; then
      # Extract repo name from git remote URL
      DETECTED_NAME=$(basename -s .git "$GIT_REMOTE" 2>/dev/null || echo "")
      # Check if it's a user page (ends with .github.io)
      if [[ "$DETECTED_NAME" == *.github.io ]]; then
        REPO_NAME=""
        BASE_PATH="/"
      else
        REPO_NAME="$DETECTED_NAME"
        BASE_PATH="/$REPO_NAME/"
      fi
    else
      REPO_NAME="CSE140-Website"
      BASE_PATH="/$REPO_NAME/"
    fi
  else
    REPO_NAME="CSE140-Website"
    BASE_PATH="/$REPO_NAME/"
  fi
else
  REPO_NAME="$1"
  # Check if it's a user page
  if [[ "$REPO_NAME" == *.github.io ]] || [ "$REPO_NAME" = "USER_PAGES" ]; then
    BASE_PATH="/"
  else
    BASE_PATH="/$REPO_NAME/"
  fi
fi

echo "=== Building for GitHub Pages ==="
if [ -z "$REPO_NAME" ] || [ "$REPO_NAME" = "USER_PAGES" ]; then
  echo "Repository type: User Pages (username.github.io)"
  echo "Base path: /"
else
  echo "Repository name: $REPO_NAME"
  echo "Base path: /$REPO_NAME/"
fi

# Set the base path environment variable
export VITE_BASE_PATH="$BASE_PATH"

echo ""
echo "=== Fetching Canvas Staff Data ==="

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo "WARNING: python3 is not available, skipping Canvas data fetch"
else
    # Run the Python script to fetch Canvas data
    python3 "$SCRIPT_DIR/fetch-canvas-staff.py" || echo "WARNING: Failed to fetch Canvas data"
fi

echo ""
echo "=== Building Site ==="
npm run build:only

echo ""
echo "=== Setting up 404.html for SPA routing ==="
# Copy index.html to 404.html for GitHub Pages SPA support
if [ -f "$PROJECT_ROOT/dist/index.html" ]; then
  cp "$PROJECT_ROOT/dist/index.html" "$PROJECT_ROOT/dist/404.html"
  echo "Created 404.html from index.html"
else
  echo "WARNING: index.html not found in dist/, 404.html may not work correctly"
fi

echo ""
echo "=== Creating .nojekyll file ==="
# Create .nojekyll to prevent GitHub Pages from processing with Jekyll
touch "$PROJECT_ROOT/dist/.nojekyll"
echo "Created .nojekyll file"

echo ""
echo "=== Verifying base path in built files ==="
# Check if the base path was applied correctly
if [ -f "$PROJECT_ROOT/dist/index.html" ]; then
  if grep -q "$BASE_PATH" "$PROJECT_ROOT/dist/index.html" 2>/dev/null || [ "$BASE_PATH" = "/" ]; then
    echo "✓ Base path appears to be set correctly"
  else
    echo "⚠ WARNING: Base path may not be applied correctly in index.html"
    echo "  Expected base path: $BASE_PATH"
    echo "  Check dist/index.html to verify asset paths"
  fi
fi

echo ""
echo "=== Build Complete ==="
echo "The dist/ folder is ready for GitHub Pages deployment"
echo "Repository: $REPO_NAME"
echo "Base path: /$REPO_NAME/"
echo ""
echo "To deploy:"
echo "1. Push the dist/ folder contents to the gh-pages branch, or"
echo "2. Configure GitHub Actions to build and deploy automatically"

