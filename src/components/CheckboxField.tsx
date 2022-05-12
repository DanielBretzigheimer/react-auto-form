import { Checkbox, FormControlLabel } from "@mui/material"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { normalizeString } from "../utils/normalize-string"
import { InputProps } from "./Input"

export function CheckboxField<T>(props: InputProps<T>) {
  const { t } = useTranslation()
  const translationKey = normalizeString(props.field)
  const [checked, setChecked] = useState(Boolean(props.data[props.field]))

  useEffect(() => {
    setChecked(Boolean(props.data[props.field]))
  }, [props.data, props.field])

  useEffect(() => {
    props.onValidate && props.onValidate(props.field, true, checked)
  }, [])

  const label = t(translationKey, { context: props.context })
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={() => props.onChange(props.field, !checked)}
        />
      }
      label={label}
    />
  )
}
