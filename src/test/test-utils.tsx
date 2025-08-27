import type { ReactNode } from "react";
import { render as rtlRender } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "../app/theme";
import { I18nextProvider } from "react-i18next";
import i18n from "../app/i18n";

function render(ui: ReactNode, options = {}) {
  return rtlRender(
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
    </ThemeProvider>,
    options
  );
}

// re-export everything
// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { render };
