import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Force une seule instance de React même quand une lib liée localement a son propre node_modules/react
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
  test: {
    environment: "node",
    // Exclut les fichiers Playwright pour ne pas les ramasser dans Vitest
    include: ["src/__tests__/**/*.test.ts"],
  },
})
