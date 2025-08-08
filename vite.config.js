import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".jsx", ".js", ".json", ".css"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["styled-components", "react-hot-toast"],
          icons: [
            "react-icons/fa",
            "react-icons/md",
            "react-icons/ci",
            "react-icons/io",
          ],
          query: ["@tanstack/react-query", "@tanstack/react-query-devtools"],
          forms: ["react-hook-form", "react-datepicker", "react-select"],
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "styled-components",
      "@supabase/supabase-js",
    ],
    exclude: ["@tanstack/react-query-devtools"],
  },
  server: {
    hmr: {
      overlay: false,
    },
    fs: {
      strict: true,
    },
  },
});
