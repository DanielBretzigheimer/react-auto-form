import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { SelectConfig } from "../model/field-config"
import { normalizeString } from "../utils/normalize-string"
import { InputProps } from "./Input"
import { SelectText } from "./SelectText"

type SelectFieldProps<T> = InputProps<T> & {
  config: SelectConfig
}

function getSelectValue(value: unknown) {
  if (Array.isArray(value))
    return value.map((v) => (typeof v === "number" ? Number(v) : String(v)))

  return typeof value === "number" ? Number(value) : String(value)
}

export function SelectField<T>(props: SelectFieldProps<T>) {
  const { t } = useTranslation()
  const options = props.config.options
  const value = getSelectValue(props.data[props.field])
  const [error, setError] = useState("")

  const validate = () => {
    if (Array.isArray(value) && value.length === 0)
      setError(t("error-empty", { field: t(normalizeString(props.field)) }))
    else if (!value)
      setError(t("error-required", { field: t(normalizeString(props.field)) }))
    else setError("")
  }

  const handleChange = (val: unknown) => {
    if (typeof val === "string" && Array.isArray(value))
      props.onChange(
        props.field,
        val.split(",").map((v) => Number(v))
      )
    else if (typeof val === "string" && typeof value === "number")
      props.onChange(props.field, Number(val))
    else props.onChange(props.field, val)
  }

  useEffect(() => {
    validate()
  }, [props.data])

  useEffect(() => {
    props.onValidate && props.onValidate(props.field, !error, value)
  }, [error])

  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel error={!!error}>{t(normalizeString(props.field))}</InputLabel>
      <Select
        multiple={Array.isArray(value)}
        disabled={props.disabled}
        error={!!error}
        value={value}
        renderValue={(value) => <SelectText value={value} options={options} />}
        onChange={(e) => handleChange(e.target.value)}
      >
        {!Array.isArray(value) && (value === 0 || value === "") && (
          <MenuItem disabled value={typeof value === "number" ? 0 : ""}>
            <ListItemText primary={t("none")} />
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {Array.isArray(value) && (
              <Checkbox checked={value.includes(option.value)} />
            )}
            <ListItemText primary={option.name} />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={!!error}>{error || " "}</FormHelperText>
    </FormControl>
  )
}
