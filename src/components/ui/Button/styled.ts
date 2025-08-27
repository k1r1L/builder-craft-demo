import { keyframes, styled } from "styled-components";
import type { ButtonSize, ButtonVariant } from "./types";

const spin = keyframes`to { transform: rotate(360deg); }`;

export const Base = styled.button<{ $variant: ButtonVariant; $size: ButtonSize; $loading: boolean }>`
  position: relative;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid transparent;
  padding: ${({ theme, $size }) =>
    $size === "lg"
      ? `${theme.spacing(3)} ${theme.spacing(5)}`
      : `${theme.spacing(2.5)} ${theme.spacing(4)}`};
  cursor: pointer;

  ${({ theme, $variant }) =>
    $variant === "primary"
      ? `background: ${theme.colors.primary}; color: white;`
      : $variant === "danger"
      ? `background: white; color: ${theme.colors.danger}; border-color: ${theme.colors.danger};`
      : `background: white; color: ${theme.colors.text}; border-color: ${theme.colors.border};`};

  &:disabled { opacity: .6; cursor: not-allowed; }

  &::after {
    content: "";
    display: ${({ $loading }) => ($loading ? "inline-block" : "none")};
    width: 1em; height: 1em;
    border-radius: 50%;
    border: 2px solid currentColor;
    border-right-color: transparent;
    animation: ${spin} .6s linear infinite;
    position: absolute;
    right: ${({ theme }) => theme.spacing(3)};
    top: 50%;
    transform: translateY(-50%);
  }
`;