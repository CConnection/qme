import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4D8ABC"
    },
    secondary: {
      main: "#5D5D5D"
    }
  },
  // setting to null -> use browser default settings -> most likely looking good
  typography: {
    fontFamily: ["Nunito Sans", "Roboto", "Arial", "sans-serif"].join(","),
    h4: {
      fontSize: 24,
      fontWeight: "bold"
    }
  }
});
