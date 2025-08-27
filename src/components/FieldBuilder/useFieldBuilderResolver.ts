import type { Resolver } from "react-hook-form";
import * as yup from "yup";
import type { FieldFormValues, FieldType, OrderOption } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { MAX_CHOICES } from "../../constants/field";

export const useFieldBuilderResolver = (): Resolver<FieldFormValues> => {
  const schema: yup.ObjectSchema<FieldFormValues> = yup.object({
    label: yup.string().trim().required("errors.labelRequired"),
    type: yup.mixed<FieldType>().oneOf(["multi-select", "single-select"]).required(),
    required: yup.boolean().default(true),
    defaultValue: yup.string().trim().default(""),
    choicesText: yup
    .string()
    .default("")
    .test("choices-validation", function (val) {
      const lines = (val ?? "")
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean);

      if (lines.length > MAX_CHOICES) {
        return this.createError({
          message: `No more than ${MAX_CHOICES} choices allowed.`,
        });
      }

      const set = new Set(lines);
      if (set.size !== lines.length) {
        return this.createError({
          message: "Duplicate choices are not allowed.",
        });
      }

      return true;
    }),
    order: yup.mixed<OrderOption>()
      .oneOf(["alphabetical", "as-entered"])
      .required(),
  });

  return yupResolver(schema);
}