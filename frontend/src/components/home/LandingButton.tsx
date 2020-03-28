import React from "react";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface ILandingButton {
  caption: string;
  icon: JSX.Element;
  onClick?: (event: React.MouseEvent) => void;
}

const useStyles = makeStyles({
  button: {
    border: "0",
    cursor: "pointer",
    "&:focus": {
      outline: "none"
    }
  }
});

export const LandingButton: React.FC<ILandingButton> = props => {
  const classes = useStyles();

  return (
    <button className={classes.button} onClick={props.onClick}>
      <Grid container direction="column">
        <Grid item>{props.icon}</Grid>
        <Grid item>
          <Typography variant="caption">{props.caption}</Typography>
        </Grid>
      </Grid>
    </button>
  );
};
