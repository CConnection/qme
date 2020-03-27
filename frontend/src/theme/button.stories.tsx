import React from "react";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

export default {
  component: Button,
  title: "Button"
};

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export const Buttons: React.FC = () => {
  const classes = useStyles();
  return (
    <Box>
      <Button variant="contained" className={classes.margin}>
        Default
      </Button>
      <Button variant="contained" color="primary" className={classes.margin}>
        Primary
      </Button>
      <Button variant="contained" color="secondary" className={classes.margin}>
        Secondary
      </Button>
      <Button variant="contained" disabled className={classes.margin}>
        Disabled
      </Button>
      <Button
        variant="contained"
        color="primary"
        href="#contained-buttons"
        className={classes.margin}
      >
        Link
      </Button>
    </Box>
  );
};

export const Textbuttons: React.FC = () => {
  const classes = useStyles();
  return (
    <Box>
      <Button className={classes.margin}>Default</Button>
      <Button color="primary" className={classes.margin}>
        Primary
      </Button>
      <Button color="secondary" className={classes.margin}>
        Secondary
      </Button>
      <Button disabled className={classes.margin}>
        Disabled
      </Button>
      <Button href="#text-buttons" color="primary" className={classes.margin}>
        Link
      </Button>
    </Box>
  );
};

export const Outlinedbuttons: React.FC = () => {
  const classes = useStyles();
  return (
    <Box>
      <Button variant="outlined" className={classes.margin}>
        Default
      </Button>
      <Button variant="outlined" color="primary" className={classes.margin}>
        Primary
      </Button>
      <Button variant="outlined" color="secondary" className={classes.margin}>
        Secondary
      </Button>
      <Button variant="outlined" disabled className={classes.margin}>
        Disabled
      </Button>
      <Button
        variant="outlined"
        color="primary"
        href="#outlined-buttons"
        className={classes.margin}
      >
        Link
      </Button>
    </Box>
  );
};

export const Sizes: React.FC = () => {
  const classes = useStyles();

  return (
    <Box>
      <Box>
        <Button size="small" className={classes.margin}>
          Small
        </Button>
        <Button size="medium" className={classes.margin}>
          Medium
        </Button>
        <Button size="large" className={classes.margin}>
          Large
        </Button>
      </Box>
      <Box>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          className={classes.margin}
        >
          Small
        </Button>
        <Button
          variant="outlined"
          size="medium"
          color="primary"
          className={classes.margin}
        >
          Medium
        </Button>
        <Button
          variant="outlined"
          size="large"
          color="primary"
          className={classes.margin}
        >
          Large
        </Button>
      </Box>
      <Box>
        <Button
          variant="contained"
          size="small"
          color="primary"
          className={classes.margin}
        >
          Small
        </Button>
        <Button
          variant="contained"
          size="medium"
          color="primary"
          className={classes.margin}
        >
          Medium
        </Button>
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.margin}
        >
          Large
        </Button>
      </Box>
      <Box>
        <IconButton aria-label="delete" className={classes.margin} size="small">
          <ArrowDownwardIcon fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="delete" className={classes.margin}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="delete" className={classes.margin}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="delete" className={classes.margin}>
          <DeleteIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};
