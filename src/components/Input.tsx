import { FieldConfig } from "../model/field-config"
import { CheckboxField } from "./CheckboxField"
import { DatePickerField } from "./DatePickerField"
import { InputField } from "./InputField"
import { SelectField } from "./SelectField"

export type InputProps<T> = {
  config?: FieldConfig
  data: T
  validationData?: T
  field: keyof T
  disabled?: boolean
  onChange: (field: keyof T, value: unknown) => void
  onValidate?: (field: keyof T, valid: boolean, value: unknown) => void
  onKeyDown?: (
    field: keyof T,
    event: React.KeyboardEvent<HTMLDivElement>
  ) => void
  context?: string
  customValidation?: (
    field: keyof T,
    value: unknown,
    data?: T
  ) => string | undefined
}

export function Input<T>(props: InputProps<T>) {
  if (props.config?.type === "input")
    return <InputField {...props} config={props.config} />
  if (props.config?.type === "select")
    return <SelectField {...props} config={props.config} />

  // input is defined by type of value
  const value = props.data[props.field]
  const valueType = typeof value
  if (valueType === "boolean") return <CheckboxField {...props} />
  if (valueType === "object" && value instanceof Date)
    return <DatePickerField {...props} value={value} />

  return <InputField {...props} config={props.config} />
}
