import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    exclude: ["node_modules", "dist"],
  },
  resolve: {
    alias: {
      "@domain": path.resolve(__dirname, "src/domain"),
      "@context": path.resolve(__dirname, "src/context"),
      "@presenters": path.resolve(__dirname, "src/presenters"),
      "@data": path.resolve(__dirname, "src/data"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@views": path.resolve(__dirname, "src/views"),
    },
  },
});
