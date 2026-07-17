import type { Page } from "@playwright/test"
import type { MockEmployee } from "./fixtures/employees"

// --- REMPLIT UN CHAMP DATEPICKER (FORMAT MM/DD/YYYY, VALIDATION AU BLUR). ---
export async function fillDatePicker(page: Page, label: string, mmddyyyy: string) {
  await page.getByLabel(label).fill(mmddyyyy)
  // Le DatePicker propage la valeur ISO à onBlur
  await page.getByLabel(label).press("Tab")
}

// --- REMPLIT ET SOUMET LE FORMULAIRE POUR UN EMPLOYÉ, FERME LA MODALE. ---
// Laisse la page sur /employees après exécution.
// Utilise le lien "Home" si on est déjà sur /employees pour préserver le store Redux
// (page.goto() ferait un rechargement complet qui vide l'état en mémoire).
export async function createEmployee(page: Page, emp: MockEmployee) {
  const currentUrl = page.url()
  if (currentUrl.includes("/employees")) {
    await page.getByRole("link", { name: "Home" }).click()
  } else {
    await page.goto("/")
  }

  await page.getByLabel("First Name").fill(emp.firstName)
  await page.getByLabel("Last Name").fill(emp.lastName)
  await page.getByLabel("Street").fill(emp.street)
  await page.getByLabel("City").fill(emp.city)
  await page.getByLabel("Zip Code").fill(emp.zipCode)
  await page.getByLabel("State").selectOption({ label: emp.state })
  await page.getByLabel("Department").selectOption({ label: emp.department })
  await fillDatePicker(page, "Date of Birth", emp.dateOfBirth)
  await fillDatePicker(page, "Start Date", emp.startDate)
  await page.getByRole("button", { name: "Save" }).click()
  // Ferme la modale → redirige vers /employees
  await page.getByRole("button", { name: "View Current Employees" }).click()
}
