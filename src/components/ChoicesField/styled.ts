import styled from "styled-components";

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 140px;
  resize: vertical;
  padding: ${({ theme }) => theme.spacing(2.5)} ${({ theme }) => theme.spacing(3)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.white};
`;
