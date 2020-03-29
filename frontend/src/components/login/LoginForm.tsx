import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as yup from "yup";

const useStyles = makeStyles({
  form: {
    width: "100%"
  },
  forget: {
    textDecoration: "underline"
  }
});

interface ILoginForm {
  title: string;
  titleTextFieldLogin?: string;
  errorTextFieldLogin?: string;
  titleForgotPassword?: string;
  titleTextFieldPassword?: string;
  errorTextFieldPassword?: string;
  errorFormSubmit?: string;
  onSubmit?: (email: string, password: string) => void;
  onClickForget?: () => void;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email address is required"),
  password: yup.string().required("Password is required")
});

export const LoginForm: React.FC<ILoginForm> = props => {
  const classes = useStyles();

  const InternalForm = () => {
    return (
      <Formik
        initialValues={{ email: sessionStorage.getItem("email"), password: "" }}
        validationSchema={schema}
        onSubmit={values => {
          if (props.onSubmit && values.email) {
            sessionStorage.setItem("email", values.email);
            props.onSubmit(values.email, values.password);
          }
        }}
      >
        {({ initialValues, errors, handleBlur, handleChange, touched }) => (
          <Form className={classes.form}>
            <Typography
              variant="caption"
              color="error"
              data-testid="login.error"
            >
              {props.errorFormSubmit}
            </Typography>

            <Grid container item direction="column" spacing={4}>
              <Grid item>
                <TextField
                  name="email"
                  label={
                    props.titleTextFieldLogin
                      ? props.titleTextFieldLogin
                      : "Email Address"
                  }
                  defaultValue={initialValues.email}
                  fullWidth
                  margin="dense"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.email && touched.email ? true : false}
                  helperText={errors.email && touched.email ? errors.email : ""}
                  data-testid="login.email"
                />
                <TextField
                  name="password"
                  label={
                    props.titleTextFieldPassword
                      ? props.titleTextFieldPassword
                      : "Password"
                  }
                  type="password"
                  autoComplete="current-password"
                  fullWidth
                  margin="dense"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.password && touched.password ? true : false}
                  helperText={
                    errors.password && touched.password ? errors.password : ""
                  }
                  data-testid="login.password"
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  data-testid="login.submit"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h4" color="primary">
          {props.title}
        </Typography>
      </Grid>
      <Grid container item direction="column" spacing={4}>
        <Grid item>
          <InternalForm />
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle2"
            className={classes.forget}
            onClick={props.onClickForget}
          >
            {props.titleForgotPassword
              ? props.titleForgotPassword
              : "Forgot you password"}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
