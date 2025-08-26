import styled from "styled-components";

export const Card = styled.div`
  width: 720px;
  margin: ${({ theme }) => theme.spacing(12)} auto;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow};
`;

export const Header = styled.div`
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(5)};
  background: ${({ theme }) => theme.colors.header};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-top-left-radius: ${({ theme }) => theme.radius.md};
  border-top-right-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
`;

export const Body = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(6)};
  padding: ${({ theme }) => theme.spacing(5)};
`;

export const RowLabel = styled.label`
  padding-top: ${({ theme }) => theme.spacing(2.5)};
  color: ${({ theme }) => theme.colors.muted};
`;

export const ErrorText = styled.div`
  margin-top: ${({ theme }) => theme.spacing(1.5)};
  color: ${({ theme }) => theme.colors.danger};
  font-size: 12px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(5)} ${({ theme }) => theme.spacing(5)};
`;

export const Button = styled.button<{ variant?: "primary" | "ghost" | "danger" }>`
  padding: ${({ theme }) => theme.spacing(2.5)} ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid transparent;
  cursor: pointer;
  ${({ variant, theme }) =>
    variant === "primary"
      ? `background: ${theme.colors.primary}; color: white;`
      : variant === "danger"
      ? `background: white; color: ${theme.colors.danger}; border-color: ${theme.colors.danger};`
      : `background: white; color: ${theme.colors.text}; border-color: ${theme.colors.border};`}
  &:disabled { opacity: .6; cursor: not-allowed; }
`;
