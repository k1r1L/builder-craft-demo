import { useTranslation } from "react-i18next";
import { Row, TypeFieldLabel } from "./styled";
import type { TypeFieldProps } from "./types";
import { TYPE_OPTIONS, type FieldType } from "../FieldBuilder/types";

export default function TypeField({ id, required, onChangeRequired, onChangeType, value }: TypeFieldProps) {
  const { t } = useTranslation();

  return (
    <Row id={id}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChangeType(e.target.value as FieldType)}
      >
        {TYPE_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt === "multi-select" ? "Multi-select" : "Single-select"}
          </option>
        ))}
      </select>
      <TypeFieldLabel>
        <input type="checkbox" checked={required} onChange={e => onChangeRequired(e.target.checked)} />
        {t("required")}
      </TypeFieldLabel>
    </Row>
  );
}
