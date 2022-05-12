import { TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useValue } from "../hooks/use-value"
import { InputConfig } from "../model/field-config"
import { normalizeString } from "../utils/normalize-string"
import { requiredValidation } from "../utils/validation"
import { InputProps } from "./Input"

type InputFieldProps<T> = InputProps<T> & {
  config?: InputConfig
}

function getInputType<T>(data: T, field: keyof T): string {
  if (field === "password" || field === "confirmPassword") return "password"

  const value = data[field]
  return typeof value === "number" ? "number" : "text"
}

export function InputField<T>(props: InputFieldProps<T>) {
  const { t } = useTranslation()
  const defaultValue = useValue(props.data, props.field)
  const type = getInputType(props.data, props.field)
  const [error, setError] = useState("")
  const [value, setValue] = useState(defaultValue)
  const [keyDownEvent, setKeyDownEvent] =
    useState<React.KeyboardEvent<HTMLDivElement>>()

  const translationKey = normalizeString(props.field)

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      props.onChange(props.field, value)
      setKeyDownEvent(event)
    } else props.onKeyDown && props.onKeyDown(props.field, event)
  }

  const onChange = (strValue: string) => {
    const value = type === "number" ? Number(strValue) : strValue
    setValue(value)
    props.onChange(props.field, value)
  }

  useEffect(() => {
    if (keyDownEvent)
      props.onKeyDown && props.onKeyDown(props.field, keyDownEvent)

    setKeyDownEvent(undefined)
  }, [keyDownEvent])

  useEffect(() => {
    setValue(defaultValue)
  }, [props.data, props.field])

  useEffect(() => {
    const validationFn = props.customValidation ?? requiredValidation
    const errorKey = validationFn(props.field, value, props.validationData)
    setError(errorKey ? t(errorKey, { field: t(translationKey) }) : "")
  }, [value, props.validationData])

  useEffect(() => {
    props.onValidate && props.onValidate(props.field, !error, value)
  }, [error])

  return (
    <TextField
      fullWidth
      disabled={props.disabled}
      helperText={error || " "}
      error={!!error}
      variant="filled"
      label={t(translationKey, { context: props.context })}
      value={value}
      type={type}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
    />
  )
}
