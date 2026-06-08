import FocusTrap from "../FocusTrap/FocusTrap";

 interface DatePickerState {
    isOpen: boolean
  viewYear: number
  viewMonth: number
  viewDay: number
  viewWeek: number
  inputText: string
  focusedDate: Date
 }

    // --- COMPOSANT DATEPICKER RÉUTILISABLE : REMPLACE LE PLUGIN JQUERY datepicker. ---
export default function DatePicker(props: DatePickerState) {

}