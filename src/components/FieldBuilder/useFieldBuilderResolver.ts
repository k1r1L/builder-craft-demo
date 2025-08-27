import type { Resolver } from "react-hook-form";
import * as yup from "yup";
import type { FieldFormValues } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { ALPHABETICAL_ORDER_OPTION, AS_ENTERED_ORDER_OPTION } from "../../constants/field";

export const useFieldBuilderResolver = (): Resolver<FieldFormValues> => {
  const schema: yup.ObjectSchema<FieldFormValues> = yup.object({
    label: yup.string().trim().required("errors.labelRequired"),
    type: yup.mixed<"multi-select">().oneOf(["multi-select"]).required(),
    required: yup.boolean().default(true),
    defaultValue: yup.string().trim().default(""),
    choicesText: yup.string().default(""),
    order: yup.mixed<"alphabetical" | "as-entered">().oneOf([ALPHABETICAL_ORDER_OPTION, AS_ENTERED_ORDER_OPTION]).required(),
  });

  return yupResolver(schema);
}