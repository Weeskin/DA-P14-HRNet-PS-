import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "./store"

// --- TYPED useDispatch HOOK FOR THE APPLICATION. ---
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

// --- TYPED useSelector HOOK FOR THE APPLICATION. ---
export const useAppSelector = useSelector.withTypes<RootState>()
