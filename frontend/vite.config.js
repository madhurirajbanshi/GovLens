import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target:
          "https://scrapgov-weapi-service-288217385136.asia-southeast1.run.app",
        changeOrigin: true,
      },
    },
  },
});
