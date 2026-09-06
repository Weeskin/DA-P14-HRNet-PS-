import type { ChangeEvent } from "react"

const INPUT_BASE = "rounded-md px-3 py-2 focus:outline-none focus:ring-2"
const INPUT_NORMAL = `${INPUT_BASE} border border-gray-300 focus:ring-primary`
const INPUT_ERROR = `${INPUT_BASE} border border-red-500 focus:ring-red-500`
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

// --- REUSABLE FORM FIELD: LABEL + INPUT + ERROR MESSAGE. ---
export default function InputField({ id, label, type = "text", value, onChange, error, maxLength }: InputFieldProps) {
  // Component render
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700" htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        className={error ? INPUT_ERROR : INPUT_NORMAL}
      />
      {error && <p className={ERROR_CLASS}>{error}</p>}
    </div>
  )
}
