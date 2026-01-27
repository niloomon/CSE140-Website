import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // For GitHub Pages: if VITE_BASE_PATH is not set, try to detect from environment
  // GitHub Pages sets GITHUB_REPOSITORY, or you can set VITE_BASE_PATH manually
  let base = process.env.VITE_BASE_PATH;
  
  if (!base) {
    // If GITHUB_REPOSITORY is set (e.g., "username/CSE-140-Website"), extract repo name
    if (process.env.GITHUB_REPOSITORY) {
      const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
      base = `/${repoName}/`;
    } else {
      // Default to root for local development
      base = "/";
    }
  }
  
  // Ensure base ends with /
  if (base !== "/" && !base.endsWith("/")) {
    base = base + "/";
  }

  return {
    base,
    build: {
      // Ensure all assets are placed correctly
      assetsDir: 'assets',
      // Ensure chunk filenames are deterministic
      rollupOptions: {
        output: {
          // Ensure all chunks use the base path
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
    },
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      // Plugin to transform HTML and fix all asset paths for GitHub Pages
      // This ensures paths work correctly even if Vite's base path transformation doesn't apply
      (() => {
        const basePath = base;
        return {
          name: "html-transform-base-path",
          enforce: "post", // Run after other plugins to ensure we catch all paths
          transformIndexHtml: {
            order: "post", // Run after Vite's default HTML transformations
            handler(html) {
              // If base is root, no transformation needed
              if (basePath === "/") {
                return html;
              }
              
              console.log(`[html-transform-base-path] Transforming HTML with base path: ${basePath}`);
              
              // Transform all absolute asset paths to include base path
              // This handles: script src, link href (stylesheets, favicon), etc.
              let transformed = html.replace(
                /(src|href)=["'](\/[^"']+)["']/g,
                (match, attr, path) => {
                  // Skip external URLs (http/https)
                  if (path.startsWith("http://") || path.startsWith("https://")) {
                    return match;
                  }
                  // Skip data URIs and mailto
                  if (path.startsWith("data:") || path.startsWith("mailto:")) {
                    return match;
                  }
                  // Skip if path already includes the base path
                  if (path.startsWith(basePath)) {
                    return match;
                  }
                  // Transform absolute paths to include base
                  // Remove leading slash and prepend base path
                  const newPath = basePath + path.slice(1);
                  console.log(`[html-transform-base-path] Transforming ${path} -> ${newPath}`);
                  return `${attr}="${newPath}"`;
                }
              );
              
              return transformed;
            },
          },
        };
      })(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
