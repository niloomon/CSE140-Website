# GitHub Pages White Screen Fix Guide

## Quick Fix Steps

1. **Identify your exact GitHub repository name:**
   - Go to your GitHub repository
   - Check the URL: `https://github.com/username/REPO_NAME`
   - Note the exact repository name (case-sensitive, including hyphens)

2. **Rebuild with the correct repository name:**
   ```bash
   npm run build:github-pages
   ```
   
   Or specify it manually:
   ```bash
   bash scripts/build-github-pages.sh YOUR_EXACT_REPO_NAME
   ```

3. **Verify the base path in `dist/index.html`:**
   - Open `dist/index.html`
   - Check that asset URLs start with `/YOUR_REPO_NAME/`
   - Example: `/CSE140-Website/assets/index-xxx.js`

4. **Check browser console for errors:**
   - Open DevTools (F12)
   - Look for:
     - 404 errors on JS/CSS files (wrong base path)
     - JavaScript errors (check Console tab)
     - Network errors (check Network tab)

5. **Common Issues:**

   **Issue: Repository name mismatch**
   - If your repo is `CSE-140-Website` but build used `CSE140-Website`
   - Solution: Rebuild with exact name: `bash scripts/build-github-pages.sh CSE-140-Website`

   **Issue: Assets return 404**
   - Check that `dist/index.html` has correct base path in script/link tags
   - Verify `dist/.nojekyll` exists
   - Ensure files are in the correct branch/folder

   **Issue: White screen with no errors**
   - Check that `dist/404.html` exists (for SPA routing)
   - Verify React is loading (check if `root` element exists in DOM)
   - Check console for "App initialized" message

6. **Deploy:**
   - Push `dist/` contents to `gh-pages` branch
   - Or configure GitHub Actions to auto-deploy
   - Wait 2-5 minutes for GitHub Pages to update

## Debug Information

The app now includes console logging. Check the browser console for:
- `=== App Initialization ===`
- Build-time BASE_URL
- Final router basename
- Current pathname and URL

## Testing Locally

To test the production build locally:
```bash
npm run build:github-pages
npx serve dist -p 3000
```

Then visit `http://localhost:3000/CSE140-Website/` (adjust repo name as needed)
