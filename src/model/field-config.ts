export type SelectConfig = {
  type: "select"
  options: Array<Option>
}

export type InputConfig = {
  type: "input"
}

export type FieldConfig = InputConfig | SelectConfig

export type Option = {
  name: string
  value: number | string
}
