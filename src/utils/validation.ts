export function requiredValidation<T>(
  _: keyof T,
  value: unknown
): string | undefined {
  return !value ? "error-required" : undefined
}
