import { TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { normalizeString } from "../utils/normalize-string"
import { InputProps } from "./Input"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

type DatePickerFieldProps<T> = InputProps<T> & {
  value: Date
}

export function DatePickerField<T>(props: DatePickerFieldProps<T>) {
  const { t } = useTranslation()
  const [value, setValue] = useState<Date | null>(props.value)
  const translationKey = normalizeString(props.field)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={t(translationKey, { context: props.context })}
        value={value}
        onChange={(val) => setValue(val)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}
