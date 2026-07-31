import type { Employee } from "../types"

// Clé volontairement identique à celle utilisée par la version jQuery d'origine :
// les deux applications se seedent donc exactement de la même façon pour les mesures Lighthouse.
const STORAGE_KEY = "employees"

// --- VÉRIFIE QU'UNE VALEUR PARSÉE A BIEN LA FORME D'UN EMPLOYÉ. ---
// Le localStorage est modifiable par l'utilisateur : on ne fait pas confiance à son contenu.
const isEmployee = (value: unknown): value is Employee => {
  if (typeof value !== "object" || value === null) {
    return false
  }
  const candidate = value as Record<string, unknown>
  const requiredFields: (keyof Employee)[] = [
    "firstName",
    "lastName",
    "dateOfBirth",
    "startDate",
    "street",
    "city",
    "state",
    "zipCode",
    "department",
  ]
  return requiredFields.every((field) => typeof candidate[field] === "string")
}

// --- LIT LA LISTE D'EMPLOYÉS DEPUIS LE LOCALSTORAGE. ---
// Retourne undefined si absente ou illisible, pour laisser le reducer utiliser son initialState.
export const loadEmployees = (): Employee[] | undefined => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) {
      return undefined
    }
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return undefined
    }
    // Une entrée corrompue ne doit pas faire planter le rendu de la table
    return parsed.filter(isEmployee)
  } catch {
    // localStorage indisponible (navigation privée, quota, storage désactivé) ou JSON invalide
    return undefined
  }
}

// --- ÉCRIT LA LISTE D'EMPLOYÉS DANS LE LOCALSTORAGE. ---
export const saveEmployees = (list: Employee[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // Quota dépassé ou storage indisponible : l'app reste fonctionnelle sans persistance
  }
}
