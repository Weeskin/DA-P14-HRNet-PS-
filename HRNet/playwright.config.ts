import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./e2e",
  // Build puis serveur de preview avant les tests. Le build est indispensable :
  // `preview` ne sert que le contenu de dist/, donc sans lui les tests valideraient
  // le dernier build en date et pourraient passer au vert sur du code déjà cassé.
  webServer: {
    command: "pnpm build && pnpm preview",
    url: "http://localhost:4173",
    // Jamais de réutilisation : un serveur déjà lancé servirait un dist/ obsolète
    // et court-circuiterait le build ci-dessus.
    reuseExistingServer: false,
  },
  use: {
    baseURL: "http://localhost:4173",
    // Capture d'écran uniquement en cas d'échec
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
})
