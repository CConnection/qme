import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { LoginForm } from "../login/LoginForm";

const useStyles = makeStyles(theme => ({
  box: {
    marginTop: theme.spacing(6)
  }
}));

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Box className={classes.box}>
        <LoginForm title="Login as Doctor" />
      </Box>
    </Container>
  );
};
