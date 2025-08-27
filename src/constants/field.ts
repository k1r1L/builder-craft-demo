export const DEFAULT_CHOICES = ["Asia", "Australia", "Europe", "Americas", "Africa"];
export const MAX_CHOICES = 50 as const;
export const STORAGE_KEY = "field-builder:draft";
export const INPUT_TYPE_DEBOUNCE_MS = 400 as const;
export const CHOICE_CHAR_MAX_LENGTH = 40 as const;

export const ORDER_OPTIONS = [
  { value: "alphabetical", labelKey: "alphabetical" },
  { value: "as-entered", labelKey: "asEntered" },
] as const;

export type OrderOption = typeof ORDER_OPTIONS[number]["value"];
