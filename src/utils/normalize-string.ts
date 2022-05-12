export function normalizeString(value: unknown) {
  // convert camelCase to kebab-case
  return String(value)
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
}
