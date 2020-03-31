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

export interface IConfirmPasswordForm {
  onSubmit?: (newPassword: string) => void;
  errorOnSubmit?: string;
}

export const ConfirmPasswordForm: React.FC<IConfirmPasswordForm> = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .required(t("confirmpassword.textfields.newpassword.errors.required")),
    repeatpassword: yup
      .string()
      .required(t("confirmpassword.textfields.repeatpassword.errors.required"))
      .oneOf(
        [yup.ref("newPassword")],
        t("confirmpassword.textfields.repeatpassword.errors.nomatch")
      )
  });

  const InternalForm = () => {
    return (
      <Formik
        initialValues={{ newPassword: "", repeatpassword: "" }}
        validationSchema={schema}
        onSubmit={values => {
          if (props.onSubmit) {
            props.onSubmit(values.newPassword);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, touched }) => (
          <Form className={classes.form}>
            <Typography
              variant="caption"
              color="error"
              data-testid="confirm.error"
            >
              {props.errorOnSubmit}
            </Typography>

            <Grid container item direction="column" spacing={4}>
              <Grid item>
                <TextField
                  name="newPassword"
                  label={t("confirmpassword.textfields.newpassword.label")}
                  type="password"
                  autoComplete="current-password"
                  fullWidth
                  margin="dense"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    errors.newPassword && touched.newPassword ? true : false
                  }
                  helperText={
                    errors.newPassword && touched.newPassword
                      ? errors.newPassword
                      : ""
                  }
                  data-testid="confirm.newpassword"
                />
                <TextField
                  name="repeatpassword"
                  label={t("confirmpassword.textfields.repeatpassword.label")}
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
                  data-testid="confirm.repeatpassword"
                />
              </Grid>
              <Grid container item justify="space-between">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    data-testid="confirm.submit"
                  >
                    {t("confirmpassword.submit")}
                  </Button>
                </Grid>
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
          {t("confirmpassword.headline")}
        </Typography>
      </Grid>
      <Grid item>
        <InternalForm />
      </Grid>
    </Grid>
  );
};
