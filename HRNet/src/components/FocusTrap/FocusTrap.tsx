import { useEffect, useRef } from "react"
import type { KeyboardEvent, ReactNode } from "react"

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

interface FocusTrapProps {
  isActive: boolean
  children: ReactNode
}

// --- REUSABLE FOCUS TRAP: CONFINES KEYBOARD FOCUS (TAB) TO ITS CHILDREN WHEN isActive. ---
export default function FocusTrap({ isActive, children }: FocusTrapProps) {
  // State and constants
  const containerRef = useRef<HTMLDivElement>(null)

  // Behavior

  // --- MOVES FOCUS TO THE FIRST FOCUSABLE ELEMENT ON ACTIVATION. ---
  useEffect(() => {
    if (!isActive) { return }
    const focusables = containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    focusables?.[0]?.focus()
  }, [isActive])

  // --- CYCLES FOCUS BETWEEN THE FIRST AND LAST FOCUSABLE ELEMENTS. ---
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isActive || e.key !== "Tab") { return }
    const container = containerRef.current
    if (!container) { return }
    const focusables = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    if (focusables.length === 0) { return }

    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  // Component render
  return (
    <div ref={containerRef} onKeyDown={handleKeyDown}>
      {children}
    </div>
  )
}
