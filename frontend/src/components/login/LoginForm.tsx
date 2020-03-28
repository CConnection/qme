import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  form: {
    width: "100%"
  }
});

interface ILoginForm {
  title: string;
  titleTextFieldLogin?: string;
  errorTextFieldLogin?: string;
  titleTextFieldPassword?: string;
  errorTextFieldPassword?: string;
  onLoginClick?: (event: React.MouseEvent) => void;
  onSignUpCLick?: (event: React.MouseEvent) => void;
  onSubmit?: () => void;
}

export const LoginForm: React.FC<ILoginForm> = props => {
  const classes = useStyles();

  const LoginTextField = () => {
    if (props.errorTextFieldLogin) {
      return (
        <TextField
          id="standard-required"
          label={
            props.titleTextFieldLogin
              ? props.titleTextFieldLogin
              : "Email Address"
          }
          defaultValue=""
          fullWidth
          margin="dense"
          error
          helperText={props.errorTextFieldLogin}
        />
      );
    } else {
      return (
        <TextField
          id="standard-required"
          label={
            props.titleTextFieldLogin
              ? props.titleTextFieldLogin
              : "Email Address"
          }
          defaultValue=""
          fullWidth
          margin="dense"
        />
      );
    }
  };

  const PasswordTextField = () => {
    if (props.errorTextFieldPassword) {
      return (
        <TextField
          id="standard-password-input"
          label={
            props.titleTextFieldPassword
              ? props.titleTextFieldPassword
              : "Password"
          }
          type="password"
          autoComplete="current-password"
          fullWidth
          margin="dense"
          error
          helperText={props.errorTextFieldPassword}
        />
      );
    } else {
      return (
        <TextField
          id="standard-password-input"
          label={
            props.titleTextFieldPassword
              ? props.titleTextFieldPassword
              : "Password"
          }
          type="password"
          autoComplete="current-password"
          fullWidth
          margin="dense"
        />
      );
    }
  };

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h4" color="primary">
          {props.title}
        </Typography>
      </Grid>
      <Grid item>
        <form onSubmit={props.onSubmit} className={classes.form}>
          <Grid container item direction="column" spacing={4}>
            <Grid item>
              <LoginTextField />
              <PasswordTextField />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={props.onLoginClick}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
