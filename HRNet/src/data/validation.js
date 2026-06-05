const PATTERNS = {
  name:    /^[a-zA-ZÀ-ÿ '-]+$/,
  street:  /^[a-zA-ZÀ-ÿ0-9 .,'#-]+$/,
  city:    /^[a-zA-ZÀ-ÿ '-]+$/,
  zipCode: /^\d{5}(-\d{4})?$/,
}

const MESSAGES = {
  firstName: "Letters, hyphens and apostrophes only.",
  lastName : "Letters, hyphens and apostrophes only.",
  street   : "Invalid street address.",
  city     : "Letters, hyphens and apostrophes only.",
  zipCode  : "Enter a valid ZIP code (e.g. 12345 or 12345-6789)."
};

export function validateForm(values) {
  const errors = {};

  if (!values.firstName.trim()) errors.firstName = "Required.";
  else if (!PATTERNS.name.test(values.firstName)) errors.firstName = MESSAGES.firstName;

  if (!values.lastName.trim()) errors.lastName = "Required.";
  else if (!PATTERNS.name.test(values.lastName)) errors.lastName = MESSAGES.lastName;

  if (!values.dateOfBirth) errors.dateOfBirth = "Required.";
  if (!values.startDate) errors.startDate = "Required.";

  if (!values.street.trim()) errors.street = "Required.";
  else if (!PATTERNS.street.test(values.street)) errors.street = MESSAGES.street;

  if (!values.city.trim()) errors.city = "Required.";
  else if (!PATTERNS.city.test(values.city)) errors.city = MESSAGES.city;

  if (!values.state) errors.state = "Please select a state.";

  if (!values.zipCode.trim()) errors.zipCode = "Required.";
  else if (!PATTERNS.zipCode.test(values.zipCode)) errors.zipCode = MESSAGES.zipCode;

  return errors
}
