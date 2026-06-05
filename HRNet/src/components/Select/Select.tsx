import type { ChangeEvent } from "react"

export type SelectOption = string | { value: string; label: string }

interface SelectProps {
  id: string
  label?: string
  options: SelectOption[]
  value: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  placeholder?: string
  error?: string
}

// --- MENU DÉROULANT RÉUTILISABLE : ACCEPTE DES CHAÎNES OU DES OBJETS { value, label }. ---
export default function Select({ id, label, options, value, onChange, placeholder, error }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="w-full appearance-none font-sans border border-gray-300 rounded-md px-3 py-2 pr-10 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const optionValue = typeof opt === "string" ? opt : opt.value
            const optionLabel = typeof opt === "string" ? opt : opt.label
            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            )
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
