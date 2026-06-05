import type { ChangeEvent } from "react"

const INPUT_CLASS = "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
const ERROR_CLASS = "text-xs text-red-500 mt-1"

interface InputFieldProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
  maxLength?: number
}

// --- CHAMP DE FORMULAIRE RÉUTILISABLE : LABEL + INPUT + MESSAGE D'ERREUR. ---
export default function InputField({ id, label, type = "text", value, onChange, error, maxLength }: InputFieldProps) {
  // Rendu du composant
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700" htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        className={INPUT_CLASS}
      />
      {error && <p className={ERROR_CLASS}>{error}</p>}
    </div>
  )
}
