import { useTranslation } from "react-i18next"

export function useValue<T>(data: T, prop: keyof T): string | number {
  const { t } = useTranslation()
  const value = data[prop]
  if (typeof value === "string") return value
  if (typeof value === "number") return value
  if (typeof value === "boolean") return value ? t("yes") : t("no")
  throw new Error(`The type ${typeof value} is not supported`)
}
