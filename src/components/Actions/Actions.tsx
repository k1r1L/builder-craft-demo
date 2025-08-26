import { useTranslation } from "react-i18next";
import { Button } from "../styled";
import type { ActionsProps } from "./types";

export default function Actions({ saving, canCancel, onSave, onCancel, onClear }: ActionsProps) {
  const { t } = useTranslation();
  const cancelDisabled = saving || !canCancel;

  return (
    <>
      <Button variant="primary" onClick={onSave} disabled={saving}>
        {saving ? "Saving..." : t("save")}
      </Button>
      <Button variant="ghost" type="button" onClick={onCancel} disabled={cancelDisabled} aria-label="Cancel">
        {t("cancel")}
      </Button>
      <Button variant="danger" type="button" onClick={onClear} disabled={saving} aria-label="Clear">
        {t("clear")}
      </Button>
    </>
  );
}
