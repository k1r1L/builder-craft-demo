import type { FieldType } from "../FieldBuilder/types";

export type TypeFieldProps = {
    id: string;
    value: FieldType;
    required: boolean;
    onChangeType: (val: FieldType) => void
    onChangeRequired: (v: boolean) => void;
  };
  