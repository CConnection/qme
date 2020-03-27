import React, { Suspense } from "react";
import { Home } from "../components/page/Home";
import { Search } from "../components/page/Search";
import { DoctorDetails } from "../components/page/DoctorDetails";
import { Queue } from "../components/page/Queue";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PageLoader } from "../components/loader/PageLoader";
import { Enqueued } from "../components/page/Enqueued";
import { Login } from "../components/page/Login";
import { SnackbarProvider } from "notistack";
import { DoctorsQueue } from "../components/page/DoctorsQueue";

export const App: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <SnackbarProvider maxSnack={3}>
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
      </SnackbarProvider>
    </Suspense>
  );
};
