// Form validation utilities
export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validateBangladeshiPhone(phone: string): boolean {
  const regex = /^(?:\+?8801|01)[3-9]\d{8}$/;
  return regex.test(phone);
}


export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function validateLength(value: string, min: number, max: number): boolean {
  const length = value.trim().length;
  return length >= min && length <= max;
}