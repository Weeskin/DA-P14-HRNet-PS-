import { configureStore } from "@reduxjs/toolkit"
import employeeReducer from "./employee-slice"
import { isSeedMode, loadEmployees, saveEmployees } from "./persistence"
import type { Employee } from "../types"

// En mode mesure (?seed=N) on part d'une liste vide et on ne persiste rien : le dataset
// de démo ne doit ni être pollué par une liste existante, ni polluer le localStorage.
const seedMode = isSeedMode()
const persistedList = seedMode ? undefined : loadEmployees()

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
  preloadedState: persistedList ? { employees: { list: persistedList } } : undefined,
})

// Persiste la liste après chaque changement : un refresh ne vide plus la table.
// Comparaison par référence — Immer produit un nouveau tableau à chaque mutation,
// donc on n'écrit pas dans le localStorage pour des actions qui ne touchent pas la liste.
if (!seedMode) {
  let lastPersistedList: Employee[] = store.getState().employees.list
  store.subscribe(() => {
    const { list } = store.getState().employees
    if (list !== lastPersistedList) {
      lastPersistedList = list
      saveEmployees(list)
    }
  })
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
