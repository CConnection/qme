import React, { Suspense } from "react";
import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme, useGlobalStyles } from "../src/theme/theme";
import "../src/i18n/i18n";

addDecorator(storyFn => {
  useGlobalStyles();
  return (
    <Suspense fallback={<p>Loading</p>}>
      <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
    </Suspense>
  );
});
