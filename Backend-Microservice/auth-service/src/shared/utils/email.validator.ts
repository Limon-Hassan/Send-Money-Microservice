
export interface EmailValidationResult {
  isValid: boolean;
  formatted: string | null;
  errorMessage: string | null;
}

export function validateEmail(email: string): EmailValidationResult {
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      formatted: null,
      errorMessage: 'Email is required.',
    };
  }

  const cleaned = email.trim().toLowerCase();

  const pattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

  if (!pattern.test(cleaned)) {
    return {
      isValid: false,
      formatted: null,
      errorMessage: 'Invalid email format.',
    };
  }

  const [local, domain] = cleaned.split('@');

  if (local.length > 64) {
    return {
      isValid: false,
      formatted: null,
      errorMessage: 'Email local part is too long.',
    };
  }

  if (domain.length > 255) {
    return {
      isValid: false,
      formatted: null,
      errorMessage: 'Email domain is too long.',
    };
  }

  if (local.includes('..') || domain.includes('..')) {
    return {
      isValid: false,
      formatted: null,
      errorMessage: 'Invalid email format.',
    };
  }

  if (local.startsWith('.') || local.endsWith('.')) {
    return {
      isValid: false,
      formatted: null,
      errorMessage: 'Invalid email format.',
    };
  }

  return {
    isValid: true,
    formatted: cleaned, 
    errorMessage: null,
  };
}
