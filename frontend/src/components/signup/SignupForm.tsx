import React from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Formik, Form } from "formik";

const useStyles = makeStyles({
  form: {
    width: "100%"
  }
});

interface ISignupForm {
  onSubmit?: (email: string, password: string) => void;
  errorOnSubmit?: string;
  onClickForget?: () => void;
}

export const SignupForm: React.FC<ISignupForm> = props => {
  const classes = useStyles();
  const { t } = useTranslation();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t("signup.textfields.email.errors.invalid"))
      .required(t("signup.textfields.email.errors.required"))
      .nullable(true),
    password: yup
      .string()
      .required(t("signup.textfields.password.errors.required")),
    repeatpassword: yup
      .string()
      .required(t("signup.textfields.repeatpassword.errors.required"))
      .oneOf(
        [yup.ref("password")],
        t("signup.textfields.repeatpassword.errors.nomatch")
      )
  });

  const InternalForm = () => {
    return (
      <Formik
        initialValues={{
          email: sessionStorage.getItem("email"),
          password: "",
          repeatpassword: ""
        }}
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
              data-testid="signup.error"
            >
              {props.errorOnSubmit}
            </Typography>

            <Grid container item direction="column" spacing={4}>
              <Grid item>
                <TextField
                  name="email"
                  label={t("signup.textfields.email.label")}
                  defaultValue={initialValues.email}
                  fullWidth
                  margin="dense"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.email && touched.email ? true : false}
                  helperText={errors.email && touched.email ? errors.email : ""}
                  data-testid="signup.email"
                />
                <TextField
                  name="password"
                  label={t("signup.textfields.password.label")}
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
                  data-testid="signup.password"
                />
                <TextField
                  name="repeatpassword"
                  label={t("signup.textfields.repeatpassword.label")}
                  type="password"
                  autoComplete="current-password"
                  fullWidth
                  margin="dense"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    errors.repeatpassword && touched.repeatpassword
                      ? true
                      : false
                  }
                  helperText={
                    errors.repeatpassword && touched.repeatpassword
                      ? errors.repeatpassword
                      : ""
                  }
                  data-testid="signup.repeatpassword"
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  data-testid="signup.submit"
                >
                  Signup
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4" color="primary">
          {t("signup.headline")}
        </Typography>
      </Grid>
      <Grid container item direction="column" spacing={4}>
        <Grid item>
          <InternalForm />
        </Grid>
      </Grid>
    </Grid>
  );
};
