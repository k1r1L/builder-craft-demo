import { Input } from "./styled";
import type { DefaultValueFieldProps } from "./types";

export default function DefaultValueField({ id, value, onChange }: DefaultValueFieldProps) {
  return <Input id={id} value={value} onChange={e => onChange(e.target.value)} />;
}
