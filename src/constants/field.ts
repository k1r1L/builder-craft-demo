export const DEFAULT_CHOICES = ["Asia", "Australia", "Europe", "Americas", "Africa"];
export const MAX_CHOICES = 50 as const;

export const ORDER_OPTIONS = [
  { value: "alphabetical", labelKey: "alphabetical" },
  { value: "as-entered", labelKey: "asEntered" },
] as const;

export type OrderOption = typeof ORDER_OPTIONS[number]["value"];
