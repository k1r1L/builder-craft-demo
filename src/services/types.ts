export type FieldPayload = {
  label: string;
  type: "multi-select";
  required: boolean;
  defaultValue: string;
  choices: string[];
  order: "alphabetical" | "as-entered";
};
  