import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import topLevelAwait from "vite-plugin-top-level-await"
import wasm from "vite-plugin-wasm"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), topLevelAwait(), wasm()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
