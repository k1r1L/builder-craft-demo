import { DEFAULT_CHOICES, type OrderOption } from "../../constants/field";

export interface FieldFormValues {
  label: string;
  type: "multi-select";
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