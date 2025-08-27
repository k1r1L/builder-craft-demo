import { TextArea } from "./styled";
import { ErrorText, Highlighter, TAWrapper } from "../styled";
import type { ChoicesFieldProps } from "./types";
import { renderHighlighted } from "../../utils/renderHighlighted";

export default function ChoicesField({ id, value, error, onChange, onBlur }: ChoicesFieldProps) {
  return (
    <TAWrapper>
      <Highlighter aria-hidden>{renderHighlighted(value)}</Highlighter>
      <TextArea id={id} value={value} onChange={e => onChange(e.target.value)} onBlur={onBlur} />
      {error && <ErrorText>{error}</ErrorText>}
    </TAWrapper>
  );
}
