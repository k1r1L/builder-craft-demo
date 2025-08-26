import { useEffect } from "react";
import { useForm, useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { postField } from "../../services/FieldService";
import { DEFAULT_CHOICES, MAX_CHOICES } from "../../constants/field";
import { normalizeChoices } from "../../utils/normalizeChoices";
import { Body, Card, Footer, Header, RowLabel } from "../styled";
import type { FieldFormValues } from "./types";
import LabelField from "../LabelField/LabelField";
import TypeField from "../TypeField/TypeField";
import DefaultValueField from "../DefaultValueField/DefaultValueField";
import ChoicesField from "../ChoicesField/ChoicesField";
import OrderField from "../OrderField/OrderField";
import Actions from "../Actions/Actions";
import { useFieldBuilderResolver } from "./useFieldBuilderResolver";

export default function FieldBuilder() {
  const { t } = useTranslation();
  const resolver = useFieldBuilderResolver();

  const { control, handleSubmit, getValues, setValue, setError, clearErrors, formState } =
    useForm<FieldFormValues>({
      mode: "onBlur",
      resolver: resolver,
      // TODO: Pass this as prop?
      defaultValues: {
        label: "",
        type: "multi-select",
        required: true,
        defaultValue: "",
        choicesText: DEFAULT_CHOICES.join("\n"),
        order: "alphabetical",
      },
    });

  // Controllers per field
  const labelCtl = useController({ name: "label", control });
  const requiredCtl = useController({ name: "required", control });
  const defaultCtl = useController({ name: "defaultValue", control });
  const choicesCtl = useController({ name: "choicesText", control });
  const orderCtl = useController({ name: "order", control });

  const validateChoices = (): boolean => {
    const choices = normalizeChoices(getValues("choicesText"));
    // de-dupe already occurs, but detect duplicates user typed (line-based):
    const raw = getValues("choicesText").split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
    const set = new Set(raw);
    const hasDupes = set.size !== raw.length;

    if (choices.length > MAX_CHOICES) {
      setError("choicesText", { type: "validate", message: t("errors.tooMany", { max: MAX_CHOICES }) });
      return false;
    }
    if (hasDupes) {
      setError("choicesText", { type: "validate", message: t("errors.dupes") });
      return false;
    }
    clearErrors("choicesText");
    return true;
  }

  // TODO: Delete this?
  useEffect(() => { validateChoices(); }, []);

  const onSubmit = handleSubmit(async (values) => {
    if (!validateChoices()) return;

    let choices = normalizeChoices(values.choicesText);
    const dv = values.defaultValue?.trim();

    if (dv && !choices.includes(dv)) {
      choices = [...choices, dv];
      setValue("choicesText", choices.join("\n"), { shouldDirty: false });
    }

    const ordered = values.order === "alphabetical"
      ? [...choices].sort((a, b) => a.localeCompare(b))
      : choices;

    try {
      await postField({
        label: values.label.trim(),
        type: "multi-select",
        required: values.required,
        defaultValue: dv ?? "",
        choices: ordered,
        order: values.order,
      });
      alert(t("alerts.saved"));
    } catch (e) {
      console.error(e);
      alert(t("alerts.failed"));
    }
  });

  const handleOnClear = () => {
    setValue("label", "");
    setValue("type", "multi-select");
    setValue("required", true);
    setValue("defaultValue", "");
    setValue("choicesText", "");
    setValue("order", "alphabetical");
    clearErrors();
  }

  const handleOnCancel = () => {
    labelCtl.field.onChange("");
    defaultCtl.field.onChange("");
    choicesCtl.field.onChange("");
    orderCtl.field.onChange("alphabetical");
    clearErrors();
  }

  return (
    <Card role="form" aria-labelledby="field-builder-title">
      <Header id="field-builder-title">{t("fieldBuilder")}</Header>

      <Body>
        <RowLabel htmlFor="label">{t("label")}</RowLabel>
        <LabelField
          id="label"
          value={labelCtl.field.value}
          onChange={labelCtl.field.onChange}
          onBlur={labelCtl.field.onBlur}
          error={labelCtl.fieldState.error?.message ? t(labelCtl.fieldState.error.message) : undefined}
        />

        <RowLabel htmlFor="type">{t("type")}</RowLabel>
        <TypeField
          id="type"
          value="multi-select"
          required={!!requiredCtl.field.value}
          onChangeRequired={requiredCtl.field.onChange}
        />

        <RowLabel htmlFor="defaultValue">{t("defaultValue")}</RowLabel>
        <DefaultValueField
          id="defaultValue"
          value={defaultCtl.field.value}
          onChange={defaultCtl.field.onChange}
        />

        <RowLabel htmlFor="choices">{t("choices")}</RowLabel>
        <ChoicesField
          id="choices"
          value={choicesCtl.field.value}
          onChange={choicesCtl.field.onChange}
          onBlur={() => validateChoices()}
          error={choicesCtl.fieldState.error?.message}
        />

        <RowLabel htmlFor="order">{t("order")}</RowLabel>
        <OrderField
          id="order"
          value={orderCtl.field.value}
          onChange={orderCtl.field.onChange}
        />
      </Body>

      <Footer>
        <Actions
          saving={formState.isSubmitting}
          canCancel={formState.isDirty}
          onSave={onSubmit}
          onCancel={handleOnCancel}
          onClear={handleOnClear}
        />
      </Footer>
    </Card>
  );
}
