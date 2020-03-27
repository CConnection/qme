import React, { Suspense } from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../theme/theme";

import { SnackbarProvider } from "notistack";

import { Home } from "../components/page/Home";
import { Search } from "../components/page/Search";
import { DoctorDetails } from "../components/page/DoctorDetails";
import { Queue } from "../components/page/Queue";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PageLoader } from "../components/loader/PageLoader";
import { Enqueued } from "../components/page/Enqueued";
import { Login } from "../components/page/Login";
import { DoctorsQueue } from "../components/page/DoctorsQueue";

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
            <Route path="/doctorsQueue">
              <DoctorsQueue />
            </Route>
            <Route path="/doctor/:id">
              <DoctorDetails />
            </Route>
            <Route path="/queue/:locationId">
              <Queue />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/enqueued/:enqueueId">
              <Enqueued />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </Providers>
  );
};
