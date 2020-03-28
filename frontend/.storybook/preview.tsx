import React from "react";
import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme, useGlobalStyles } from "../src/theme/theme";

addDecorator(storyFn => {
  useGlobalStyles();
  return <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>;
});
