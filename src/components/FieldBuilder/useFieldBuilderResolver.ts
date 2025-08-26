import type { Resolver } from "react-hook-form";
import * as yup from "yup";
import type { FieldFormValues } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";

export const useFieldBuilderResolver = (): Resolver<FieldFormValues> => {
  const schema: yup.ObjectSchema<FieldFormValues> = yup.object({
    label: yup.string().trim().required("errors.labelRequired"),
    type: yup.mixed<"multi-select">().oneOf(["multi-select"]).required(),
    required: yup.boolean().default(true),
    defaultValue: yup.string().trim().default(""),
    choicesText: yup.string().default(""),
    order: yup.mixed<"alphabetical" | "as-entered">().oneOf(["alphabetical","as-entered"]).required(),
  });

  return yupResolver(schema);
}