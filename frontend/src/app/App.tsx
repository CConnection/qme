import React, { Suspense } from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../theme/theme";

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

export const App: React.FC = () => {
  return (
    <Providers>
      <Suspense fallback={<PageLoader />}>
        <Router>
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
        </Router>
      </Suspense>
    </Providers>
  );
};
