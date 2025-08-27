import type { PropsWithChildren } from "react";

export type ButtonVariant = "primary" | "ghost" | "danger";
export type ButtonSize = "md" | "lg";

export type ButtonProps = PropsWithChildren<{
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    type?: "button" | "submit";
  }>;