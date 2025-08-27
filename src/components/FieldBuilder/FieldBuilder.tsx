import { useCallback, useEffect } from "react";
import { useForm, useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { postField } from "../../services/FieldService";
import {
  ALPHABETICAL_ORDER_OPTION,
  CHOICES_NAME_FIELD,
  DEFAULT_VALUE_NAME_FIELD,
  INPUT_TYPE_DEBOUNCE_MS,
  LABEL_NAME_FIELD,
  ORDER_NAME_FIELD,
  REQUIRED_NAME_FIELD,
  STORAGE_KEY,
  TYPE_NAME_FIELD
} from "../../constants/field";
import { normalizeChoices } from "../../utils/normalizeChoices";
import { isPlainObject } from "../../utils/isPlainObject";
import { Body, Card, Footer, Header, RowLabel } from "../styled";
import { BUILDER_DEFAULT_VALUES, type FieldFormValues } from "./types";
import LabelField from "../LabelField/LabelField";
import TypeField from "../TypeField/TypeField";
import DefaultValueField from "../DefaultValueField/DefaultValueField";
import ChoicesField from "../ChoicesField/ChoicesField";
import OrderField from "../OrderField/OrderField";
import Actions from "../Actions/Actions";
import useDebounce from "../../constants/useDebounce";
import { useFieldBuilderResolver } from "./useFieldBuilderResolver";

export default function FieldBuilder() {
  const { t } = useTranslation();
  const resolver = useFieldBuilderResolver(); 

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState,
    watch,
  } = useForm<FieldFormValues>({
    mode: "onBlur",
    resolver,
    defaultValues: BUILDER_DEFAULT_VALUES,
  });

  const labelCtl = useController({ name: LABEL_NAME_FIELD,   control });
  const typeCtl = useController({ name: TYPE_NAME_FIELD, control });
  const requiredCtl= useController({ name: REQUIRED_NAME_FIELD,control });
  const defaultCtl = useController({ name: DEFAULT_VALUE_NAME_FIELD, control });
  const choicesCtl = useController({ name: CHOICES_NAME_FIELD, control });
  const orderCtl   = useController({ name: ORDER_NAME_FIELD,   control });

  const debouncedSave = useDebounce<(vals: FieldFormValues) => void>(
    (vals) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(vals));
    },
    INPUT_TYPE_DEBOUNCE_MS
  );

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed: unknown = JSON.parse(raw);
      if (!isPlainObject(parsed)) return;
      reset({ ...BUILDER_DEFAULT_VALUES, ...(parsed as Partial<FieldFormValues>) }, { keepDirty: false });
    } catch {
      console.error("Failed parsing json data")
    }
  }, [reset]);

  useEffect(() => {
    const sub = watch((vals) => debouncedSave(vals as FieldFormValues));
    return () => sub.unsubscribe();
  }, [watch, debouncedSave]);

  const onSubmit = useCallback(handleSubmit(async (values) => {
    let choices = normalizeChoices(values.choicesText);
    const dv = values.defaultValue.trim();

    if (dv && !choices.includes(dv)) {
      choices = [...choices, dv];
      setValue(CHOICES_NAME_FIELD, choices.join("\n"), { shouldDirty: false });
    }

    const ordered =
      values.order === ALPHABETICAL_ORDER_OPTION
        ? [...choices].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
        : choices;

    try {
      await postField({
        label: values.label.trim(),
        type: values.type,
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
  }), [handleSubmit, setValue, t]);

  const handleOnClear = useCallback(() => {
    reset(BUILDER_DEFAULT_VALUES, { keepDirty: false, keepErrors: false });
    localStorage.removeItem(STORAGE_KEY);
  }, [reset]);

  const handleOnCancel = useCallback(() => {
    reset({
      label: "",
      type: "multi-select",
      required: requiredCtl.field.value,
      defaultValue: "",
      choicesText: "",
      order: ALPHABETICAL_ORDER_OPTION,
    }, { keepDirty: false, keepErrors: false });
  }, [reset, requiredCtl.field.value]);

  return (
    <Card role="form" aria-labelledby="field-builder-title">
      <Header id="field-builder-title">{t("fieldBuilder")}</Header>

      <Body>
        <RowLabel htmlFor={LABEL_NAME_FIELD}>{t(LABEL_NAME_FIELD)}</RowLabel>
        <LabelField
          id={LABEL_NAME_FIELD}
          value={labelCtl.field.value}
          onChange={labelCtl.field.onChange}
          onBlur={labelCtl.field.onBlur}
          error={labelCtl.fieldState.error?.message ? t(labelCtl.fieldState.error.message) : undefined}
        />

        <RowLabel htmlFor={TYPE_NAME_FIELD}>{t("type")}</RowLabel>
        <TypeField
          id={TYPE_NAME_FIELD}
          value={typeCtl.field.value}
          required={!!requiredCtl.field.value}
          onChangeRequired={requiredCtl.field.onChange}
          onChangeType={typeCtl.field.onChange}
        />

        <RowLabel htmlFor={DEFAULT_VALUE_NAME_FIELD}>{t(DEFAULT_VALUE_NAME_FIELD)}</RowLabel>
        <DefaultValueField
          id={DEFAULT_VALUE_NAME_FIELD}
          value={defaultCtl.field.value}
          onChange={defaultCtl.field.onChange}
        />

        <RowLabel htmlFor={CHOICES_NAME_FIELD}>{t("choices")}</RowLabel>
        <ChoicesField
          id={CHOICES_NAME_FIELD}
          value={choicesCtl.field.value}
          onChange={choicesCtl.field.onChange}
          error={choicesCtl.fieldState.error?.message}
        />

        <RowLabel htmlFor={ORDER_NAME_FIELD}>{t(ORDER_NAME_FIELD)}</RowLabel>
        <OrderField
          id={ORDER_NAME_FIELD}
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
          isLoading={formState.isSubmitting}
        />
      </Footer>
    </Card>
  );
}
