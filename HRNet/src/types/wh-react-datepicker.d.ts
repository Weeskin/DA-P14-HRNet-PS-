// Déclaration manuelle du module — la version 1.0.0 publiée sur npm ne contient pas les types dans son dist.
declare module "wh-react-datepicker" {
  import type { FC } from "react"

  export interface DatePickerProps {
    id: string
    label: string
    value: string
    onChange: (value: string) => void
    error?: string
    min?: string
    max?: string
  }

  export const DatePicker: FC<DatePickerProps>

  export function toISO(date: Date): string
  export function parseISO(value: string): Date | null
  export function formatDisplay(date: Date): string
  export function parseDisplay(value: string): Date | null
  export function daysInMonth(year: number, month: number): number
  export function startWeekday(year: number, month: number): number
  export function addDays(date: Date, n: number): Date
  export function isSameDay(a: Date, b: Date): boolean
  export function isWithinRange(date: Date, min: Date | null, max: Date | null): boolean
}
