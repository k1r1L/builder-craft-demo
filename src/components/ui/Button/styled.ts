import { keyframes, styled } from "styled-components";
import type { ButtonSize, ButtonVariant } from "./types";

const spin = keyframes`to { transform: rotate(360deg); }`;

export const Base = styled.button<{ $variant: ButtonVariant; $size: ButtonSize; $loading: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid transparent;
  cursor: pointer;
  user-select: none;
  line-height: 1;
  padding: ${({ theme, $size }) =>
    $size === "lg"
      ? `${theme.spacing(3)} ${theme.spacing(5)}`
      : `${theme.spacing(2.5)} ${theme.spacing(4)}`};

  ${({ theme, $variant }) =>
    $variant === "primary"
      ? `background: ${theme.colors.primary}; color: white;`
      : $variant === "danger"
      ? `background: white; color: ${theme.colors.danger}; border-color: ${theme.colors.danger};`
      : `background: white; color: ${theme.colors.text}; border-color: ${theme.colors.border};`};

  &:disabled { opacity: .6; cursor: not-allowed; }

  .btn-label {
    opacity: ${({ $loading }) => ($loading ? 0 : 1)};
    transition: opacity 120ms ease;
  }

  .btn-spinner {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 1.1em;
    height: 1.1em;
    border-radius: 50%;
    border: 2px solid currentColor;
    border-right-color: transparent;
    animation: ${spin} .75s linear infinite;
    opacity: ${({ $loading }) => ($loading ? 1 : 0)};
    transition: opacity 120ms ease;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .btn-spinner { animation: none; border-right-color: currentColor; }
  }
`;
