import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as yup from "yup";
// import { SwitchTransition, CSSTransition } from "react-transition-group";

const useStyles = makeStyles({
  form: {
    width: "100%"
  },
  enter: {
    opacity: 0
  },
  enterActive: {
    transition: "opacity 300ms",
    opacity: 1
  },
  exit: {
    opacity: 1
  },
  exitActive: {
    transition: "opacity 300ms",
    opacity: 0
  }
});

export interface IResetForm {
  onSubmit?: (email: string) => void;
  errorOnSubmit?: string;
  onResend?: () => void;
  errorOnResend?: string;
  showConfirmation: Boolean;
}

export const ResetPasswordForm: React.FC<IResetForm> = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [email, setEmail] = useState<string>("");

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t("resetpassword.send.textfields.email.errors.invalid"))
      .required(t("resetpassword.send.textfields.email.errors.required"))
      .nullable(true)
  });

  const InternalForm = () => {
    return (
      <Formik
        initialValues={{ email: email }}
        validationSchema={schema}
        onSubmit={values => {
          if (props.onSubmit && values.email) {
            setEmail(values.email);
            props.onSubmit(values.email);
          }
        }}
      >
        {({ initialValues, errors, handleBlur, handleChange, touched }) => (
          <Form className={classes.form}>
            <Typography
              variant="caption"
              color="error"
              data-testid="resetpassword.send.error"
            >
              {props.errorOnSubmit}
            </Typography>

            <Grid container item direction="column" spacing={4}>
              <Grid item>
                <TextField
                  name="email"
                  label={t("resetpassword.send.textfields.email.label")}
                  defaultValue={initialValues.email}
                  fullWidth
                  margin="dense"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.email && touched.email ? true : false}
                  helperText={errors.email && touched.email ? errors.email : ""}
                  data-testid="resetpassword.send.email"
                />
              </Grid>
              <Grid container item justify="space-between">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    data-testid="resetpassword.send.submit"
                  >
                    {t("resetpassword.send.submit")}
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
    // <SwitchTransition>
    //   <CSSTransition
    //     key={props.showConfirmation ? "Sent Email" : "Send Email"}
    //     addEndListener={(node, done) =>
    //       node.addEventListener("transitionend", done, false)
    //     }
    //     classNames={{
    //       enter: classes.enter,
    //       enterActive: classes.enterActive,
    //       exit: classes.exit,
    //       exitActive: classes.exitActive
    //     }}
    //   >
    <>
      {props.showConfirmation ? (
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h4" color="primary">
              {t("resetpassword.confirm.headline")}
            </Typography>
          </Grid>
          <Grid container item direction="column" spacing={4}>
            <Grid item>
              <Typography>
                {t("resetpassword.confirm.message", { email: email })}
              </Typography>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={props.onResend}
                data-testid="resetpassword.send.resend"
              >
                {t("resetpassword.confirm.resend")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h4" color="primary">
              {t("resetpassword.send.headline")}
            </Typography>
          </Grid>
          <Grid item>
            <InternalForm />
          </Grid>
        </Grid>
      )}
    </>
    //   </CSSTransition>
    // </SwitchTransition>
  );
};
