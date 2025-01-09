// Form validation utilities
export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePhone(phone: string): boolean {
  const regex = /^\+?[\d\s-]{10,}$/;
  return regex.test(phone);
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function validateLength(value: string, min: number, max: number): boolean {
  const length = value.trim().length;
  return length >= min && length <= max;
}