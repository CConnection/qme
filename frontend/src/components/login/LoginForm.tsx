import React from "react";
import { useTranslation } from "react-i18next";
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
  onSubmit?: (email: string, password: string) => void;
  errorOnSubmit?: string;
  onClickForget?: () => void;
}

export const LoginForm: React.FC<ILoginForm> = props => {
  const classes = useStyles();
  const { t } = useTranslation();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t("login.textfields.email.errors.invalid"))
      .required(t("login.textfields.email.errors.required"))
      .nullable(true),
    password: yup.string().required("Password is required")
  });

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
              {props.errorOnSubmit}
            </Typography>

            <Grid container item direction="column" spacing={4}>
              <Grid item>
                <TextField
                  name="email"
                  label={t("login.textfields.email.label")}
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
                  label={t("login.textfields.password.label")}
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
                  {t("login.submit")}
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
          {t("login.headline")}
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
            {t("login.forgotPassword")}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
