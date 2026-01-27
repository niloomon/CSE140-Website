# GitHub Pages Deployment Checklist

## Before Deploying

1. **Verify Build:**
   ```bash
   npm run build:github-pages CSE140-Website
   bash scripts/verify-build.sh
   ```

2. **Check dist/index.html:**
   - Open `dist/index.html` in a text editor
   - Verify all asset paths start with `/CSE140-Website/assets/`
   - Should NOT see paths like `/assets/` or `/src/main.tsx`

3. **Check dist/404.html:**
   - Should be identical to `dist/index.html`
   - All paths should include `/CSE140-Website/`

## Deployment Steps

### Option 1: GitHub Actions (Recommended)
- Push your code to GitHub
- The workflow should automatically build and deploy
- Check Actions tab to ensure build succeeded

### Option 2: Manual Deployment
1. Build the site:
   ```bash
   npm run build:github-pages CSE140-Website
   ```

2. Deploy the `dist/` folder contents:
   - Either push to `gh-pages` branch
   - Or use GitHub Pages settings to deploy from `dist/` folder

## After Deployment

1. **Clear Browser Cache:**
   - Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
   - Or open DevTools → Application → Clear Storage → Clear site data

2. **Verify URLs:**
   - Main site: `https://niloomon.github.io/CSE140-Website/`
   - Check browser console for errors
   - Check Network tab - all requests should be to `/CSE140-Website/...`

3. **Common Issues:**
   - **White screen:** Check console for 404 errors
   - **404 on main.tsx:** This means old cached HTML is being served
   - **Assets not loading:** Verify paths in Network tab

## Debugging

If you see errors, check:

1. **Browser Console:**
   - Look for 404 errors
   - Note which files are failing to load
   - Check if paths are `/assets/...` (wrong) or `/CSE140-Website/assets/...` (correct)

2. **Network Tab:**
   - Refresh page
   - Look for failed requests (red)
   - Check the Request URL column - should include `/CSE140-Website/`

3. **View Page Source:**
   - Right-click → View Page Source
   - Search for `assets/` - should all have `/CSE140-Website/assets/`
   - Should NOT see `/src/main.tsx` anywhere
