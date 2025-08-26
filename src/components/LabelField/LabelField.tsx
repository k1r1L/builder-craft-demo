import { Input } from "./styled";
import { ErrorText } from "../styled";
import type { LabelFieldProps } from "./types";

export default function LabelField({ id, value, error, onChange, onBlur }: LabelFieldProps) {
  return (
    <div>
      <Input id={id} value={value} onChange={e => onChange(e.target.value)} onBlur={onBlur}/>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}
