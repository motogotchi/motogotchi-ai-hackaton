// src/frontend/vite.config.ts
import react from "@vitejs/plugin-react";
import environment from "vite-plugin-environment";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";

// Vite configuration
export default defineConfig({
  // publicDir: "assets", // REMOVE THIS LINE
  build: { emptyOutDir: true },
  base: "./",
  plugins: [
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
    react(),
    tailwindcss(),
  ],
  envDir: "../../", // Correct path relative to vite.config.ts to find .env
  define: { "process.env": process.env },
  optimizeDeps: {
    esbuildOptions: { define: { global: "globalThis" } },
  },
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(
          new URL("../declarations", import.meta.url) // Adjusted path relative to src/frontend/
        ),
      },
      {
        find: "src",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
    dedupe: ["@dfinity/agent"],
  },
  server: {
    host: "127.0.0.1",
    proxy: {
      "/api": {
        target: `http://127.0.0.1:4943`,
        changeOrigin: true,
      },
    },
  },
});
