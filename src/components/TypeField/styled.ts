import styled from "styled-components";

export const Select = styled.select`
  width: 220px;
  padding: ${({ theme }) => theme.spacing(2.5)} ${({ theme }) => theme.spacing(3)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.white};
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
`;

export const TypeFieldLabel = styled.label`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  align-items: center;
`;
