import type { Employee } from "../types"

// Intentionally the same key used by the original jQuery version:
// both apps seed from localStorage the same way for Lighthouse measurements.
const STORAGE_KEY = "employees"

// --- CHECKS THAT A PARSED VALUE HAS THE SHAPE OF AN EMPLOYEE. ---
// localStorage can be modified by the user — its content is not trusted.
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

// --- DETECTS LIGHTHOUSE MEASUREMENT MODE (?seed=N IN THE URL). ---
// In this mode persistence is disabled: without this, the 2000 employees from the dataset
// would be written to localStorage and remain visible after the demo.
export const isSeedMode = (): boolean => {
  try {
    return new URLSearchParams(window.location.search).has("seed")
  } catch {
    return false
  }
}

// --- LOADS THE EMPLOYEE LIST FROM LOCALSTORAGE. ---
// Returns undefined if missing or unreadable, so the reducer uses its initialState.
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
    // A corrupted entry must not crash the table render
    return parsed.filter(isEmployee)
  } catch {
    // localStorage unavailable (private browsing, quota, storage disabled) or invalid JSON
    return undefined
  }
}

// --- SAVES THE EMPLOYEE LIST TO LOCALSTORAGE. ---
export const saveEmployees = (list: Employee[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // Quota exceeded or storage unavailable: the app remains functional without persistence
  }
}
