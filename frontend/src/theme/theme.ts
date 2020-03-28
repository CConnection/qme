import { createMuiTheme, makeStyles } from "@material-ui/core/styles";

export const useGlobalStyles = makeStyles({
  "@global": {
    a: {
      textDecoration: "none"
    }
  }
});

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
    h1: {
      fontSize: 32,
      fontWeight: "bold"
    },
    h4: {
      fontSize: 24,
      fontWeight: "bold"
    }
  },
  shape: {
    borderRadius: 24
  }
});
