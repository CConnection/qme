import React, { Suspense, useEffect, useState } from "react";
import { initFirebase } from "../firebase/firebase";
import { AuthProvider } from "../login/AuthProvider";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import { theme, useGlobalStyles } from "../theme/theme";
import { Box } from "@material-ui/core";
import { Home } from "../components/page/Home";
import { Search } from "../components/page/Search";
import { Register } from "../components/page/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PageLoader } from "../components/loader/PageLoader";
import { QueueClient } from "../components/page/QueueClient";
import { Login } from "../components/page/Login";
import { Signup } from "../components/page/Signup";
import { Profile } from "../components/page/Profile";
import { QueueDoctor } from "../components/page/QueueDoctor";
import { SnackbarProvider } from "notistack";

export const Providers: React.FC = ({ children }) => {
  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AuthProvider>
    </SnackbarProvider>
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
  const [firebaseLoaded, setFirebaseLoaded] = useState<Boolean>(false);

  useEffect(() => {
    const load = async () => {
      await initFirebase();
      setFirebaseLoaded(true);
    };

    load();
  }, []);

  if (firebaseLoaded) {
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
                  <Register />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/signup">
                  <Signup />
                </Route>
                <Route path="/profile">
                  <Profile />
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
  } else {
    return <div />;
  }
};
