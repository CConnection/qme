import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { Typography, Grid, Container } from "@material-ui/core";
import { LandingButton } from "../home/LandingButton";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  logo: {
    marginRight: "12px"
  },
  buttons: {
    width: "100%"
  },
  iconClient: {
    fontSize: "5.6rem",
    marginBottom: "-4px"
  },
  iconDoctor: {
    fontSize: "5.5rem"
  }
});

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Grid container justify="center" spacing={4}>
        <Grid item>
          <Logo className={classes.logo} />
        </Grid>
        <Grid item>
          <Typography variant="h1" align="center">
            {t("home.usp")}
          </Typography>
          <Typography variant="subtitle1" align="center">
            {t("home.subline")}
            <br /> {t("home.subline2")}
          </Typography>
          <Typography variant="subtitle1" align="center"></Typography>
        </Grid>
        <Grid item className={classes.buttons}>
          <Grid container justify="space-evenly" alignItems="baseline">
            <Grid item>
              <Link to="/search">
                <LandingButton
                  caption={t("home.search_locations")}
                  icon={
                    <AssignmentIndIcon
                      color="primary"
                      className={classes.iconClient}
                    />
                  }
                />
              </Link>
            </Grid>
            <Grid item>
              <Link to="/login">
                <LandingButton
                  caption={t("home.create_location")}
                  icon={
                    <NoteAddIcon
                      color="primary"
                      className={classes.iconDoctor}
                    />
                  }
                />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
