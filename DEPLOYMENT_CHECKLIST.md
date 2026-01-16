# GitHub Pages Deployment Checklist

## ✅ Build Status
Your build is **CORRECT**:
- ✓ 2190 modules transformed
- ✓ CSS file: `index-BX3LThAn.css` (89.91 kB)
- ✓ JS file: `index-BtnAn6bB.js` (561.64 kB)
- ✓ `dist/index.html` has correct references

## 🚨 Current Issue
You're seeing `main.tsx:1 404 error` because GitHub Pages is serving an **old version** of your HTML file.

## ✅ Deployment Steps

### Option 1: Deploy via gh-pages branch (Recommended)

```bash
# 1. Make sure you're on your main branch
git checkout main

# 2. Create/switch to gh-pages branch
git checkout --orphan gh-pages

# 3. Remove all files
git rm -rf .

# 4. Copy ONLY the dist/ folder contents (not the dist folder itself)
cp -r dist/* .

# 5. Verify you have these files in the root:
# - index.html (should reference index-BtnAn6bB.js, NOT main.tsx)
# - 404.html
# - .nojekyll
# - assets/ folder

# 6. Add and commit
git add .
git commit -m "Deploy latest build to GitHub Pages"

# 7. Push to gh-pages branch
git push origin gh-pages --force
```

### Option 2: Deploy from main branch /docs folder

If you're using the `/docs` folder method:

```bash
# 1. Copy dist contents to docs folder
rm -rf docs
cp -r dist docs

# 2. Commit and push
git add docs/
git commit -m "Update GitHub Pages deployment"
git push origin main
```

## 🔍 Verification

After deploying, check:

1. **View the deployed HTML source:**
   - Visit: `https://niloomon.github.io/CSE140-Website/`
   - Right-click → "View Page Source"
   - Look for: `<script src="/CSE140-Website/assets/index-BtnAn6bB.js">`
   - Should NOT see: `src="/src/main.tsx"`

2. **Check browser console:**
   - Should see: "main.tsx: Starting app initialization"
   - Should NOT see: 404 errors for main.tsx

3. **Hard refresh:**
   - Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
   - Or open in incognito/private window

## ⚠️ Common Mistakes

❌ **DON'T deploy the source `index.html`** - it has `/src/main.tsx` reference
✅ **DO deploy `dist/index.html`** - it has the built bundle reference

❌ **DON'T deploy the `dist/` folder itself** - deploy its contents
✅ **DO deploy the contents of `dist/`** - copy files from inside dist/

## 🎯 Expected Result

After correct deployment:
- ✅ No 404 errors
- ✅ Blue test banner visible (DOM test)
- ✅ Red test banner visible (React test)
- ✅ Full website loads correctly
- ✅ Console shows debug logs
