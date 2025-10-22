import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "./", // ✅ ensures correct relative paths in Vercel build
  publicDir: "public",
  build: {
    outDir: "dist", // ✅ required for Vercel static deployment
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}));
