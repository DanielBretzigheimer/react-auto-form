import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { FieldConfig } from "../model/field-config"
import { FormField } from "./FormField"

export type AutoFormProps<T> = {
  data: T
  onKeyDown?: (
    field: keyof T,
    event: React.KeyboardEvent<HTMLDivElement>
  ) => void
  onChange: (prop: keyof T, value?: unknown) => void
  onValidate?: (valid: boolean, invalidFields: (keyof T)[]) => void
  ignoredFields?: Array<keyof T>
  singleColumn?: boolean
  fieldConfigs?: { [key: string]: FieldConfig }
  disabled?: boolean
  context?: string
  customValidation?: (
    field: keyof T,
    value: unknown,
    data: T
  ) => string | undefined
}

function getFields<T>(data: T, ignoredFields?: Array<keyof T>) {
  const allFields = Object.keys(data) as [keyof T]
  const displayFields = allFields.filter((f) => {
    const isId = f === "id"
    const isIgnored = ignoredFields?.includes(f) ?? false
    return !isId && !isIgnored
  })
  return displayFields
}

export function AutoForm<T>(props: AutoFormProps<T>) {
  const fields = getFields(props.data, props.ignoredFields)
  const [validFields, setValidFields] = useState<(keyof T)[]>([])
  const [validationData, setValidationData] = useState(props.data)

  const onValidate = (field: keyof T, valid: boolean, value: unknown) => {
    if (valid) setValidFields((prev) => [...prev, field])
    else setValidFields((prev) => prev.filter((f) => f !== field))
    setValidationData({ ...validationData, [field]: value })
  }

  const customValidation = (field: keyof T, value: unknown) => {
    return (
      props.customValidation &&
      props.customValidation(field, value, validationData)
    )
  }

  useEffect(() => {
    const invalidFields = fields.filter((f) => !validFields.includes(f))
    props.onValidate &&
      props.onValidate(invalidFields.length === 0, invalidFields)
  }, [validFields, fields])

  useEffect(() => {
    setValidationData(props.data)
  }, [props.data])

  return (
    <Grid container spacing={1}>
      {fields.map((field) => {
        const fieldConfig =
          props.fieldConfigs && props.fieldConfigs[String(field)]

        return (
          <Grid
            key={field.toString()}
            item
            xs={12}
            md={props.singleColumn ? 12 : 6}
            lg={props.singleColumn ? 12 : 4}
          >
            <FormField
              config={fieldConfig}
              disabled={props.disabled}
              data={props.data}
              field={field}
              onChange={props.onChange}
              onValidate={onValidate}
              onKeyDown={props.onKeyDown}
              context={props.context}
              customValidation={
                props.customValidation ? customValidation : undefined
              }
              validationData={validationData}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
