import config from "./validation-config.json"

// Limites de longueur des champs (données dans validation-config.json),
// partagées avec les attributs maxLength du formulaire (source unique).
export const FIELD_LIMITS = config.limits

const MESSAGES = config.messages

// Regex strictes : la valeur commence et finit par un caractère valide,
// sans séparateur (espace, tiret, apostrophe) en double ni en début/fin.
const PATTERNS = {
  name:    /^[A-Za-zÀ-ÿ]+(?:[ '-][A-Za-zÀ-ÿ]+)*$/,
  street:  /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .,'#-]*$/,
  city:    /^[A-Za-zÀ-ÿ]+(?:[ '-][A-Za-zÀ-ÿ]+)*$/,
  zipCode: /^\d{5}(-\d{4})?$/,
}

// --- VALIDE LE FORMULAIRE EMPLOYÉ ET RENVOIE UN OBJET D'ERREURS PAR CHAMP. ---
export function validateForm(values) {
  const errors = {}

  if (!values.firstName.trim()) { errors.firstName = "Required." }
  else if (values.firstName.length > FIELD_LIMITS.firstName) { errors.firstName = `Max ${FIELD_LIMITS.firstName} characters.` }
  else if (!PATTERNS.name.test(values.firstName)) { errors.firstName = MESSAGES.firstName }

  if (!values.lastName.trim()) { errors.lastName = "Required." }
  else if (values.lastName.length > FIELD_LIMITS.lastName) { errors.lastName = `Max ${FIELD_LIMITS.lastName} characters.` }
  else if (!PATTERNS.name.test(values.lastName)) { errors.lastName = MESSAGES.lastName }

  if (!values.dateOfBirth) { errors.dateOfBirth = "Required." }
  if (!values.startDate) { errors.startDate = "Required." }

  if (!values.street.trim()) { errors.street = "Required." }
  else if (values.street.length > FIELD_LIMITS.street) { errors.street = `Max ${FIELD_LIMITS.street} characters.` }
  else if (!PATTERNS.street.test(values.street)) { errors.street = MESSAGES.street }

  if (!values.city.trim()) { errors.city = "Required." }
  else if (values.city.length > FIELD_LIMITS.city) { errors.city = `Max ${FIELD_LIMITS.city} characters.` }
  else if (!PATTERNS.city.test(values.city)) { errors.city = MESSAGES.city }

  if (!values.state) { errors.state = "Please select a state." }

  if (!values.zipCode.trim()) { errors.zipCode = "Required." }
  else if (!PATTERNS.zipCode.test(values.zipCode)) { errors.zipCode = MESSAGES.zipCode }

  return errors
}
