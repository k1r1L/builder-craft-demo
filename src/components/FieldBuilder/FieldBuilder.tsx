import { useForm, useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { postField } from "../../services/FieldService";
import {
  ALPHABETICAL_ORDER_OPTION,
  CHOICES_NAME_FIELD,
  DEFAULT_VALUE_NAME_FIELD,
  INPUT_TYPE_DEBOUNCE_MS,
  LABEL_NAME_FIELD,
  MAX_CHOICES,
  ORDER_NAME_FIELD,
  REQUIRED_NAME_FIELD,
  STORAGE_KEY,
  TYPE_NAME_FIELD
} from "../../constants/field";
import { normalizeChoices } from "../../utils/normalizeChoices";
import { Body, Card, Footer, Header, RowLabel } from "../styled";
import { BUILDER_DEFAULT_VALUES, FIELD_KEYS, type FieldFormValues } from "./types";
import LabelField from "../LabelField/LabelField";
import TypeField from "../TypeField/TypeField";
import DefaultValueField from "../DefaultValueField/DefaultValueField";
import ChoicesField from "../ChoicesField/ChoicesField";
import OrderField from "../OrderField/OrderField";
import Actions from "../Actions/Actions";
import { useFieldBuilderResolver } from "./useFieldBuilderResolver";
import useDebounce from "../../constants/useDebounce";
import { useEffect } from "react";
import { isPlainObject } from "../../utils/isPlainObject";

export default function FieldBuilder() {
  const { t } = useTranslation();
  const resolver = useFieldBuilderResolver();
  const debouncedSave = useDebounce<(vals: FieldFormValues) => void>(
    (vals) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(vals));
    },
    INPUT_TYPE_DEBOUNCE_MS
  );

  const { control, handleSubmit, getValues, setValue, setError, clearErrors, formState, watch } =
    useForm<FieldFormValues>({
      mode: "onBlur",
      resolver: resolver,
      defaultValues: BUILDER_DEFAULT_VALUES,
    });

  const labelCtl = useController({ name: LABEL_NAME_FIELD, control });
  const requiredCtl = useController({ name: REQUIRED_NAME_FIELD, control });
  const defaultCtl = useController({ name: DEFAULT_VALUE_NAME_FIELD, control });
  const choicesCtl = useController({ name: CHOICES_NAME_FIELD, control });
  const orderCtl = useController({ name: ORDER_NAME_FIELD, control });

  const validateChoices = (): boolean => {
    const choices = normalizeChoices(getValues(CHOICES_NAME_FIELD));
    const raw = getValues(CHOICES_NAME_FIELD).split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
    const set = new Set(raw);
    const hasDupes = set.size !== raw.length;

    if (choices.length > MAX_CHOICES) {
      setError(CHOICES_NAME_FIELD, { type: "validate", message: t("errors.tooMany", { max: MAX_CHOICES }) });
      return false;
    }
    if (hasDupes) {
      setError(CHOICES_NAME_FIELD, { type: "validate", message: t("errors.dupes") });
      return false;
    }
    clearErrors(CHOICES_NAME_FIELD);
    return true;
  }

  const onSubmit = handleSubmit(async (values) => {
    if (!validateChoices()) return;

    let choices = normalizeChoices(values.choicesText);
    const dv = values.defaultValue?.trim();

    if (dv && !choices.includes(dv)) {
      choices = [...choices, dv];
      setValue(CHOICES_NAME_FIELD, choices.join("\n"), { shouldDirty: false });
    }

    const ordered = values.order === ALPHABETICAL_ORDER_OPTION
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
    setValue(LABEL_NAME_FIELD, "");
    setValue("type", "multi-select");
    setValue(REQUIRED_NAME_FIELD, true);
    setValue(DEFAULT_VALUE_NAME_FIELD, "");
    setValue(CHOICES_NAME_FIELD, "");
    setValue(ORDER_NAME_FIELD, ALPHABETICAL_ORDER_OPTION);
    clearErrors();
  }

  const handleOnCancel = () => {
    labelCtl.field.onChange("");
    defaultCtl.field.onChange("");
    choicesCtl.field.onChange("");
    orderCtl.field.onChange(ALPHABETICAL_ORDER_OPTION);
    clearErrors();
  }

  useEffect(() => {
    const raw = localStorage.getItem("field-builder:draft");
    if (!raw) return;
  
    try {
      const parsed: unknown = JSON.parse(raw);
      if (!isPlainObject(parsed)) return;
  
      const draft = parsed as Partial<FieldFormValues>;
  
      FIELD_KEYS.forEach((key) => {
        if (key in draft) {
          const val = draft[key as keyof FieldFormValues] as FieldFormValues[typeof key];
          setValue(key, val, { shouldDirty: false });
        }
      });
    } catch {
      console.error("Parsing draft failed!");
    }
  }, [setValue]);

  useEffect(() => {
    const sub = watch((vals) => debouncedSave(vals as FieldFormValues));
    return () => sub.unsubscribe();
  }, [watch, debouncedSave]);

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
          id="type"
          value="multi-select"
          required={!!requiredCtl.field.value}
          onChangeRequired={requiredCtl.field.onChange}
        />

        <RowLabel htmlFor={DEFAULT_VALUE_NAME_FIELD}>{t(DEFAULT_VALUE_NAME_FIELD)}</RowLabel>
        <DefaultValueField
          id={DEFAULT_VALUE_NAME_FIELD}
          value={defaultCtl.field.value}
          onChange={defaultCtl.field.onChange}
        />

        <RowLabel htmlFor={CHOICES_NAME_FIELD}>{t("choices")}</RowLabel>
        <ChoicesField
          id="choices"
          value={choicesCtl.field.value}
          onChange={choicesCtl.field.onChange}
          onBlur={() => validateChoices()}
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
