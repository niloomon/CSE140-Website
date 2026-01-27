import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // For GitHub Pages: explicitly set the base path
  let base = process.env.VITE_BASE_PATH || "/CSE140-Website/";
  
  // For local development, you can override with VITE_BASE_PATH=/
  if (mode === "development" && !process.env.VITE_BASE_PATH) {
    base = "/";
  }
  
  // Ensure base ends with /
  if (base !== "/" && !base.endsWith("/")) {
    base = base + "/";
  }

  console.log(`[vite.config] Using base path: ${base}`);

  return {
    base,
    build: {
      assetsDir: 'assets',
      rollupOptions: {
        output: {
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
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});