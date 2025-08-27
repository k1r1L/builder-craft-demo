import { Select } from "./styled";
import { useTranslation } from "react-i18next";
import type { OrderFieldProps } from "./types";
import { ORDER_OPTIONS, type OrderOption } from "../FieldBuilder/types";

export default function OrderField({ id, value, onChange }: OrderFieldProps) {
  const { t } = useTranslation();

  return (
    <Select id={id} value={value} onChange={(e) => onChange(e.target.value as OrderOption)}>
      {ORDER_OPTIONS.map(opt => (
        <option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>
      ))}
    </Select>
  );
}
