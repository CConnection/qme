import React from "react";
import { LandingButton } from "../button/LandingButton";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import EnhancedIcon from "@material-ui/icons/EnhancedEncryption";
import { Typography, Grid, Container } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";

import logo from "./logo.png";

import { Link } from "react-router-dom";

const useStyles = makeStyles({
  wrapper: {
    height: "calc(100vh)",
    padding: "0",
    margin: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  iconleft: {
    fontSize: "7.1rem !important",
    padding: "0.5rem"
  },
  iconright: {
    fontSize: "7rem !important",
    padding: "0.5rem"
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
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  fullwidth: {
    width: "100%"
  },
  "@media (min-width: 767px)": {
    icon: {
      fontSsize: "7rem !important",
      padding: "1.5rem"
    }
  }
});

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container maxWidth="sm">
        <Grid container justify="center" spacing={6}>
          <Grid item>
            <img src={logo} alt="logo"></img>
          </Grid>
          <Grid item>
            <Typography
              variant="h1"
              align="center"
              className={classes.headline}
            >
              {t("home.usp")}
            </Typography>
            <Typography variant="subtitle1" align="center">
              {t("home.subline")}
              <br /> {t("home.subline2")}
            </Typography>
            <Typography variant="subtitle1" align="center"></Typography>
          </Grid>

          <Grid item className={classes.fullwidth}>
            <Grid container justify="space-around">
              <Grid item>
                <Link to="/search">
                  <LandingButton
                    text={t("home.search_locations")}
                    icon={
                      <AssignmentInd
                        className={classes.iconleft}
                        color="primary"
                      />
                    }
                  />
                </Link>
              </Grid>
              <Grid item>
                <Link to="/login">
                  <LandingButton
                    text={t("home.create_location")}
                    icon={
                      <EnhancedIcon
                        className={classes.iconright}
                        color="primary"
                      />
                    }
                  />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
