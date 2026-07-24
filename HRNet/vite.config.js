import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { resolve } from "path"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Force une seule instance de React même quand une lib liée localement a son propre node_modules/react
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
    alias: {
      // Permet d'importer date-utils depuis la source TypeScript du package lié (pour les tests unitaires)
      "@date-utils": resolve(__dirname, "../wh-react-datepicker/src/date-utils.ts"),
    },
  },
  test: {
    environment: "node",
    // Exclut les fichiers Playwright pour ne pas les ramasser dans Vitest
    include: ["src/__tests__/**/*.test.ts"],
  },
})
