import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // raise or lower warning threshold (in KB)
    rollupOptions: {
      output: {
        manualChunks: {
          // put all firebase modules into “firebase” chunk
          firebase: [
            "firebase/app",
            "firebase/auth",
            "firebase/firestore",
            "firebase/analytics",
          ],
          // chart.js + wrapper
          chartjs: ["chart.js", "react-chartjs-2"],
          // react & router into a “vendor” chunk
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});
