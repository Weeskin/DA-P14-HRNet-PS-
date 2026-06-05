import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "./store"

// --- HOOK useDispatch TYPÉ POUR L'APPLICATION. ---
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

// --- HOOK useSelector TYPÉ POUR L'APPLICATION. ---
export const useAppSelector = useSelector.withTypes<RootState>()
