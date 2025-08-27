import type { FieldType, OrderOption } from "../components/FieldBuilder/types";

export type FieldPayload = {
  label: string;
  type: FieldType;
  required: boolean;
  defaultValue: string;
  choices: string[];
  order: OrderOption;
};
