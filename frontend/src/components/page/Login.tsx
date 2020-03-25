import React from "react";
import { Container, Paper, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  paper: {
    marginTop: "82px",
    padding: "32px"
  },
  headline: {
    marginBottom: "16px"
  },

  gridItem: {
    marginBottom: "16px"
  },
  grid: {
    display: "flex",
    justifyContent: "space-between"
  },
  buttons: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "space-between"
  }
});

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography variant="h1" className={classes.headline}>
          {t("login.headline")}
        </Typography>
        <form>
          <Grid direction="column" className={classes.grid}>
            <Grid item className={classes.gridItem}>
              <TextField
                required
                id="standard-required"
                label={t("login.email")}
                defaultValue=""
                fullWidth
              />
            </Grid>
            <Grid item className={classes.gridItem}>
              <TextField
                required
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                fullWidth
              />
            </Grid>
          </Grid>
          <Box className={classes.buttons}>
            <Link to="/login">
              <Button variant="contained" color="primary">
                Login
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="contained" color="secondary">
                Sign Up
              </Button>
            </Link>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};
