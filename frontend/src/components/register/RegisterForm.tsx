import React from "react";
import { Formik } from "formik";
import { Grid, TextField, Button, Box } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  paper: {
    marginTop: "120px",
    padding: "32px"
  },
  headline: {
    marginBottom: "16px"
  },
  button: {
    marginTop: "16px"
  },
  gridItem: {
    marginBottom: "16px"
  }
});

export const RegisterForm: React.FC = () => {
  let { locationId } = useParams();
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box>
      <Grid>
        <Formik
          initialValues={{ fullName: "", phone: "", note: "", email: "" }}
          validate={values => {
            let errors: {
              fullName: string;
              phone: string;
            } = { fullName: "", phone: "" };
            if (!values.fullName) {
              errors.fullName = t("enqueue.form.validation.required");
            }
            if (!values.phone) {
              errors.phone = t("enqueue.form.validation.required");
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            // TODO implement backend integration
            // Dont forget the doctorId
            setTimeout(() => {
              console.log(JSON.stringify({ ...values, locationId }, null, 2));
              console.log(values);
              setSubmitting(false);
              const enqueueId = "comesFromOnSubmit...changeIt...";
              window.location.href = `/enqueued/${enqueueId}`;
            }, 1000);
          }}
        >
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid item xs={12} className={classes.gridItem}>
                <TextField
                  id="standard-required"
                  name="fullName"
                  label={t("enqueue.form.label.fullName")}
                  required
                  fullWidth
                  autoComplete="off"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullName}
                />
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <TextField
                  id="standard-required"
                  name="email"
                  type="email"
                  label={t("enqueue.form.label.email")}
                  required
                  fullWidth
                  autoComplete="off"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                />
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <TextField
                  id="standard-required"
                  name="phone"
                  label={t("enqueue.form.label.phone")}
                  required
                  fullWidth
                  autoComplete="off"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                />
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <TextField
                  id="standard-required"
                  name="note"
                  label={t("enqueue.form.label.note")}
                  multiline
                  rows="4"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.note}
                />
              </Grid>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                className={classes.button}
              >
                Queue Up
              </Button>
            </form>
          )}
        </Formik>
      </Grid>
    </Box>
  );
};
