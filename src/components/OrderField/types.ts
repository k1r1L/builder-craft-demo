import type { OrderOption } from "../../constants/field";

export type OrderFieldProps = {
  id: string;
  value: OrderOption;
  onChange: (v: OrderOption) => void;
};
