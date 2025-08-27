import { Base } from "./styled";
import type { ButtonProps } from "./types";

export default function Button({
    variant = "primary",
    size = "md",
    loading = false,
    disabled,
    children,
    ...rest
  }: ButtonProps) {
    return (
      <Base $variant={variant} $size={size} $loading={loading} disabled={disabled || loading} {...rest}>
        {children}
      </Base>
    );
  }