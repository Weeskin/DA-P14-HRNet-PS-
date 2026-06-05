import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
}

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    // --- AJOUTE UN EMPLOYÉ À LA LISTE (IMMER GÈRE L'IMMUTABILITÉ). ---
    addEmployee(state, action) {
      state.list.push(action.payload)
    },
  },
})

export const { addEmployee } = employeeSlice.actions
export default employeeSlice.reducer
