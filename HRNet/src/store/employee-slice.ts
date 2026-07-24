import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { Employee } from "../types"

interface EmployeesState {
  list: Employee[]
}

const initialState: EmployeesState = {
  list: [],
}

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    // --- AJOUTE UN EMPLOYÉ À LA LISTE (IMMER GÈRE L'IMMUTABILITÉ). ---
    addEmployee(state, action: PayloadAction<Employee>) {
      state.list.push(action.payload)
    },
    // --- REMPLACE TOUTE LA LISTE (UTILISÉ POUR LES SEEDS DE DÉMO). ---
    setAll(state, action: PayloadAction<Employee[]>) {
      state.list = action.payload
    },
  },
})

export const { addEmployee, setAll } = employeeSlice.actions
export default employeeSlice.reducer
