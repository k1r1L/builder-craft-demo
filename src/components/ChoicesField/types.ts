export type ChoicesFieldProps = {
  id: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
};
  