import type { OrderOption } from "../../constants/field";

export interface FieldFormValues {
  label: string;
  type: "multi-select";
  required: boolean;
  defaultValue: string;
  choicesText: string;
  order: OrderOption;
};
