import { Row, TypeFieldLabel } from "./styled";
import { useTranslation } from "react-i18next";
import type { TypeFieldProps } from "./types";

export default function TypeField({ id, required, onChangeRequired }: TypeFieldProps) {
  const { t } = useTranslation();

  return (
    <Row id={id}>
      <div>Multi-select</div>
      <TypeFieldLabel>
        <input type="checkbox" checked={required} onChange={e => onChangeRequired(e.target.checked)} />
        {t("required")}
      </TypeFieldLabel>
    </Row>
  );
}
