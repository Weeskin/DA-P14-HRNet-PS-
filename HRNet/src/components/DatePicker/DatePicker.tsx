import { useState, useEffect, useRef, useId } from "react"
import type { ChangeEvent, KeyboardEvent } from "react"
import FocusTrap from "../FocusTrap/FocusTrap"
import {
  parseISO, toISO, formatDisplay, parseDisplay,
  daysInMonth, startWeekday, addDays, isSameDay, isWithinRange,
} from "./date-utils"

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]
const DAY_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

const INPUT_CLASS = "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
const ERROR_CLASS = "text-xs text-red-500 mt-1"
const NAV_BTN_CLASS = "p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary text-gray-600 text-lg leading-none"

interface DatePickerProps {
  id: string
  label: string
  value: string          // ISO "YYYY-MM-DD" ou ""
  onChange: (value: string) => void
  error?: string
  min?: string           // ISO
  max?: string           // ISO
}

// --- COMPOSANT DATEPICKER RÉUTILISABLE : REMPLACE LE PLUGIN JQUERY datepicker. ---
// Valeur transmise en ISO (YYYY-MM-DD), affichée en MM/DD/YYYY dans l'input.
export default function DatePicker({ id, label, value, onChange, error, min, max }: DatePickerProps) {
  // State et constantes
  const today = new Date()
  const parsedValue = value ? parseISO(value) : null
  const minDate = min ? parseISO(min) : null
  const maxDate = max ? parseISO(max) : null

  const [isOpen, setIsOpen] = useState(false)
  const [inputText, setInputText] = useState(parsedValue ? formatDisplay(parsedValue) : "")
  const [viewYear, setViewYear] = useState(parsedValue?.getFullYear() ?? today.getFullYear())
  const [viewMonth, setViewMonth] = useState(parsedValue?.getMonth() ?? today.getMonth())
  const [focusedDate, setFocusedDate] = useState<Date>(parsedValue ?? today)

  const containerRef = useRef<HTMLDivElement>(null)
  const focusedDayRef = useRef<HTMLButtonElement>(null)
  const calendarId = useId()

  // Comportement

  // --- SYNCHRONISE L'INPUT TEXTE QUAND LA VALEUR CONTRÔLÉE CHANGE DE L'EXTÉRIEUR. ---
  useEffect(() => {
    const parsed = value ? parseISO(value) : null
    setInputText(parsed ? formatDisplay(parsed) : "")
    if (parsed) {
      setViewYear(parsed.getFullYear())
      setViewMonth(parsed.getMonth())
      setFocusedDate(parsed)
    }
  }, [value])

  // --- DONNE LE FOCUS AU JOUR ACTIF QUAND LE CALENDRIER S'OUVRE. ---
  useEffect(() => {
    if (isOpen) { focusedDayRef.current?.focus() }
  }, [isOpen])

  // --- FERME LE CALENDRIER SI ON CLIQUE EN DEHORS DU COMPOSANT. ---
  useEffect(() => {
    if (!isOpen) { return }
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => { document.removeEventListener("mousedown", handleClickOutside) }
  }, [isOpen])

  // --- MET À JOUR L'INPUT TEXTE ET PRÉVISUALISE LA DATE DANS LE CALENDRIER EN DIRECT. ---
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setInputText(text)
    const parsed = parseDisplay(text)
    if (parsed) {
      setViewYear(parsed.getFullYear())
      setViewMonth(parsed.getMonth())
      setFocusedDate(parsed)
    }
  }

  // --- VALIDE ET PROPAGE LA DATE À LA PERTE DE FOCUS, OU REVERT SI INVALIDE. ---
  const handleInputBlur = () => {
    const parsed = parseDisplay(inputText)
    if (inputText === "") {
      onChange("")
    } else if (parsed && isWithinRange(parsed, minDate, maxDate)) {
      onChange(toISO(parsed))
    } else {
      // Revert vers la dernière valeur valide
      const lastValid = value ? parseISO(value) : null
      setInputText(lastValid ? formatDisplay(lastValid) : "")
    }
  }

  // --- SÉLECTIONNE UN JOUR DEPUIS LA GRILLE ET FERME LE CALENDRIER. ---
  const handleDayClick = (date: Date) => {
    onChange(toISO(date))
    setInputText(formatDisplay(date))
    setFocusedDate(date)
    setIsOpen(false)
  }

  // --- NAVIGATION CLAVIER DANS LA GRILLE : FLÈCHES, ENTRÉE, ÉCHAP. ---
  const handleCalendarKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const dayMoves: Record<string, number> = {
      ArrowRight: 1,
      ArrowLeft: -1,
      ArrowDown: 7,
      ArrowUp: -7,
    }
    if (e.key in dayMoves) {
      e.preventDefault()
      const next = addDays(focusedDate, dayMoves[e.key])
      setFocusedDate(next)
      setViewYear(next.getFullYear())
      setViewMonth(next.getMonth())
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      if (isWithinRange(focusedDate, minDate, maxDate)) { handleDayClick(focusedDate) }
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  // --- PASSE AU MOIS PRÉCÉDENT. ---
  const handlePrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1) }
    else { setViewMonth((m) => m - 1) }
  }

  // --- PASSE AU MOIS SUIVANT. ---
  const handleNextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1) }
    else { setViewMonth((m) => m + 1) }
  }

  // --- CONSTRUIT LA GRILLE DE JOURS : CELLULES VIDES AVANT LE 1ER + JOURS DU MOIS. ---
  const buildGrid = (): (Date | null)[] => {
    const count = daysInMonth(viewYear, viewMonth)
    const firstWeekday = startWeekday(viewYear, viewMonth)
    const grid: (Date | null)[] = Array(firstWeekday).fill(null)
    for (let dayIndex = 1; dayIndex <= count; dayIndex++) {
      grid.push(new Date(viewYear, viewMonth, dayIndex))
    }
    while (grid.length % 7 !== 0) { grid.push(null) }
    return grid
  }

  const grid = buildGrid()

  // Rendu du composant
  return (
    <div ref={containerRef} className="flex flex-col gap-1 relative">
      <label className="text-sm font-medium text-gray-700" htmlFor={id}>{label}</label>

      <div className="flex gap-1">
        <input
          id={id}
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder="MM/DD/YYYY"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls={isOpen ? calendarId : undefined}
          className={INPUT_CLASS}
        />
        <button
          type="button"
          aria-label={isOpen ? "Close calendar" : "Open calendar"}
          onClick={() => { setIsOpen((prev) => !prev) }}
          className="border border-gray-300 rounded-md px-3 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      {error && <p className={ERROR_CLASS}>{error}</p>}

      {isOpen && (
        <div
          id={calendarId}
          role="dialog"
          aria-label={`Calendar for ${label}`}
          onKeyDown={handleCalendarKeyDown}
          className="absolute top-full left-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-72"
        >
          <FocusTrap isActive={isOpen}>
            {/* Navigation mois/année */}
            <div className="flex items-center justify-between mb-2">
              <button type="button" aria-label="Previous month" onClick={handlePrevMonth} className={NAV_BTN_CLASS}>
                ‹
              </button>
              <span className="text-sm font-medium text-gray-800">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <button type="button" aria-label="Next month" onClick={handleNextMonth} className={NAV_BTN_CLASS}>
                ›
              </button>
            </div>

            {/* En-têtes des jours de la semaine */}
            <div className="grid grid-cols-7 mb-1">
              {DAY_HEADERS.map((dayHeader) => (
                <div key={dayHeader} className="text-center text-xs font-medium text-gray-400 py-1">
                  {dayHeader}
                </div>
              ))}
            </div>

            {/* Grille des jours */}
            <div className="grid grid-cols-7">
              {grid.map((date, cellIndex) => {
                if (!date) {
                  return <div key={`empty-${cellIndex}`} aria-hidden="true" />
                }
                const isSelected = parsedValue ? isSameDay(date, parsedValue) : false
                const isFocused = isSameDay(date, focusedDate)
                const isToday = isSameDay(date, today)
                const isDisabled = !isWithinRange(date, minDate, maxDate)

                let dayClass = "text-xs rounded py-1.5 text-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary "
                if (isSelected) {
                  dayClass += "bg-primary text-white font-medium "
                } else if (isDisabled) {
                  dayClass += "text-gray-300 cursor-not-allowed "
                } else {
                  dayClass += "hover:bg-gray-100 cursor-pointer "
                  if (isToday) { dayClass += "text-primary font-medium " }
                  if (isFocused && !isSelected) { dayClass += "bg-gray-100 " }
                }

                return (
                  <button
                    key={toISO(date)}
                    ref={isFocused ? focusedDayRef : null}
                    type="button"
                    tabIndex={isFocused ? 0 : -1}
                    aria-label={formatDisplay(date)}
                    aria-pressed={isSelected}
                    aria-disabled={isDisabled}
                    disabled={isDisabled}
                    onClick={() => { handleDayClick(date) }}
                    className={dayClass.trim()}
                  >
                    {date.getDate()}
                  </button>
                )
              })}
            </div>

            {/* Raccourci "Today" */}
            <div className="mt-2 text-center border-t border-gray-100 pt-2">
              <button
                type="button"
                onClick={() => { handleDayClick(today) }}
                disabled={!isWithinRange(today, minDate, maxDate)}
                className="text-xs text-primary hover:underline disabled:text-gray-300 disabled:no-underline"
              >
                Today
              </button>
            </div>
          </FocusTrap>
        </div>
      )}
    </div>
  )
}
