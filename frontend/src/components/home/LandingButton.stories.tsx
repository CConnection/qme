import React from "react";
import { LandingButton } from "./LandingButton";
import { text } from "@storybook/addon-knobs";
import EnhancedIcon from "@material-ui/icons/EnhancedEncryption";
import { makeStyles } from "@material-ui/core";

export default {
  component: LandingButton,
  title: "LandingButton"
};

const useStyles = makeStyles({
  icon: {
    fontSize: "5.5rem"
  }
});

export const Button: React.FC = () => {
  const classes = useStyles();
  const icon = <EnhancedIcon className={classes.icon} color="primary" />;

  return (
    <LandingButton caption={text("Caption", "My button caption")} icon={icon} />
  );
};
