import { ALPHABETICAL_ORDER_OPTION, AS_ENTERED_ORDER_OPTION, DEFAULT_CHOICES } from "../../constants/field";

export interface FieldFormValues {
  label: string;
  type: FieldType;
  required: boolean;
  defaultValue: string;
  choicesText: string;
  order: OrderOption;
};

export const FIELD_KEYS = [
  "label",
  "type",
  "required",
  "defaultValue",
  "choicesText",
  "order",
] as const;

export type FieldType = "multi-select" | "single-select";
export const TYPE_OPTIONS: FieldType[] = ["multi-select", "single-select"];
export type FieldKey = typeof FIELD_KEYS[number];
export type FieldDraft = Partial<FieldFormValues>;

export const BUILDER_DEFAULT_VALUES: FieldFormValues = {
  label: "",
  type: "multi-select",
  required: true,
  defaultValue: "",
  choicesText: DEFAULT_CHOICES.join("\n"),
  order: "alphabetical",
}

export const ORDER_OPTIONS = [
  { value: ALPHABETICAL_ORDER_OPTION, labelKey: "alphabetical" },
  { value: AS_ENTERED_ORDER_OPTION, labelKey: "asEntered" },
] as const;

export type OrderOption = typeof ORDER_OPTIONS[number]["value"];