export function digitsOf(value: string): string {
  return value.replace(/\D/g, "");
}

export function maskPhone(value: string): string {
  const digits = digitsOf(value).slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : "";
  const area = `(${digits.slice(0, 2)}) `;
  if (digits.length <= 6) return `${area}${digits.slice(2)}`;
  if (digits.length <= 10) return `${area}${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `${area}${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export function validPhone(value: string): boolean {
  const length = digitsOf(value).length;
  return length === 10 || length === 11;
}
