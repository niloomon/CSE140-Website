#!/bin/bash
# Test the build locally with the correct base path

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

echo "=== Testing Build Locally ==="
echo ""
echo "This will start a local server with the base path /CSE140-Website/"
echo "Open: http://localhost:4173/CSE140-Website/"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Build first
echo "Building..."
export VITE_BASE_PATH="/CSE140-Website/"
npm run build:only

# Start preview server
echo ""
echo "Starting preview server..."
npm run preview
