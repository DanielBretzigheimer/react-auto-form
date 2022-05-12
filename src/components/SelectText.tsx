import { Option } from "../model/field-config"

type SelectTextProps = {
  value: string | number | (string | number)[]
  options: Array<Option>
}

export function SelectText(props: SelectTextProps) {
  const getName = (value: number | string) => {
    return props.options.find((o) => o.value === value)?.name ?? ""
  }

  if (typeof props.value === "number" || typeof props.value === "string")
    return <>{getName(props.value)}</>

  const selected = props.value.map((v) => getName(v))
  return <>{selected.join(", ")}</>
}
