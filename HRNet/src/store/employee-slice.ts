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
    // --- ADDS AN EMPLOYEE TO THE LIST (IMMER HANDLES IMMUTABILITY). ---
    addEmployee(state, action: PayloadAction<Employee>) {
      state.list.push(action.payload)
    },
    // --- REPLACES THE ENTIRE LIST (USED FOR DEMO SEEDS). ---
    setAll(state, action: PayloadAction<Employee[]>) {
      state.list = action.payload
    },
  },
})

export const { addEmployee, setAll } = employeeSlice.actions
export default employeeSlice.reducer
