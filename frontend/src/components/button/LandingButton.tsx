import React from "react";
import { makeStyles } from "@material-ui/core/styles";

interface ILandingButton {
  text: string;
  icon: JSX.Element;
}

const useStyles = makeStyles({
  button: {
    border: "0",
    background: "white",
    cursor: "pointer",
    padding: "0px 40px",
    marginBottom: "32px",
    "&:focus": {
      outline: "none"
    }
  }
});

export const LandingButton: React.FC<ILandingButton> = ({ text, icon }) => {
  const classes = useStyles();

  return (
    <button className={classes.button}>
      {icon}
      <br />
      {text}
    </button>
  );
};
