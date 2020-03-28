import React, { Suspense } from "react";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import { theme, useGlobalStyles } from "../theme/theme";

import { Box } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { Home } from "../components/page/Home";
import { Search } from "../components/page/Search";
import { Details } from "../components/page/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PageLoader } from "../components/loader/PageLoader";
import { QueueClient } from "../components/page/QueueClient";
import { Login } from "../components/page/Login";
import { QueueDoctor } from "../components/page/QueueDoctor";

export const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
    </ThemeProvider>
  );
};

const useStyles = makeStyles({
  box: {
    marginTop: theme.spacing(6)
  }
});

export const App: React.FC = () => {
  useGlobalStyles();
  const classes = useStyles();

  return (
    <Providers>
      <Suspense fallback={<PageLoader />}>
        <Router>
          <Box className={classes.box}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/search">
                <Search />
              </Route>
              <Route path="/queuedoctor">
                <QueueDoctor />
              </Route>
              <Route path="/doctor/:id">
                <Details />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/enqueued/:enqueueId">
                <QueueClient />
              </Route>
            </Switch>
          </Box>
        </Router>
      </Suspense>
    </Providers>
  );
};
