export type ActionsProps = {
  saving: boolean;
  canCancel: boolean;
  onSave: () => void;
  onCancel: () => void;
  onClear: () => void;
  isLoading: boolean;
};
  