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
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
