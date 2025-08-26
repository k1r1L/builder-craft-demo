import { TextArea } from "./styled";
import { ErrorText } from "../styled";
import type { ChoicesFieldProps } from "./types";

export default function ChoicesField({ id, value, error, onChange, onBlur }: ChoicesFieldProps) {
  return (
    <div>
      <TextArea id={id} value={value} onChange={e => onChange(e.target.value)} onBlur={onBlur} />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}
