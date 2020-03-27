import React from "react";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";

export default {
  component: Typography,
  title: "Typography"
};

export const all: React.FC = () => {
  return (
    <Box>
      <Typography variant="h1">h1: Hello World!</Typography>
      <Typography variant="h2">h2: Hello World!</Typography>
      <Typography variant="h3">h3: Hello World!</Typography>
      <Typography variant="h4">h4: Hello World!</Typography>
      <Typography variant="h5">h5: Hello World!</Typography>
      <Typography variant="h6">h6: Hello World!</Typography>
      <Typography variant="subtitle1">subtitles1: Hello World!</Typography>
      <Typography variant="subtitle2">subtitles2: Hello World!</Typography>
      <Typography>body1: Hello World!</Typography>
      <Typography variant="body2">body2: Hello World!</Typography>
      <Box>
        <Typography variant="caption">caption: Hello World!</Typography>
      </Box>
      <Box>
        <Typography variant="button">button: Hello World!</Typography>
      </Box>
      <Box>
        <Typography variant="overline">overline: Hello World!</Typography>
      </Box>
      <Box>
        <Typography variant="srOnly">srOnly: Hello World!</Typography>
      </Box>
    </Box>
  );
};

export const headlines: React.FC = () => {
  return (
    <Box>
      <Typography variant="h1">h1: Hello World!</Typography>
      <Typography variant="h2">h2: Hello World!</Typography>
      <Typography variant="h3">h3: Hello World!</Typography>
      <Typography variant="h4">h4: Hello World!</Typography>
      <Typography variant="h5">h5: Hello World!</Typography>
      <Typography variant="h6">h6: Hello World!</Typography>
    </Box>
  );
};

export const subtitles: React.FC = () => {
  return (
    <Box>
      <Typography variant="subtitle1">subtitles1: Hello World!</Typography>
      <Typography variant="subtitle2">subtitles2: Hello World!</Typography>
    </Box>
  );
};

export const body: React.FC = () => {
  return (
    <Box>
      <Typography>body1: Hello World!</Typography>
      <Typography variant="body2">body2: Hello World!</Typography>
    </Box>
  );
};

export const caption: React.FC = () => {
  return (
    <Box>
      <Typography variant="caption">caption: Hello World!</Typography>
    </Box>
  );
};

export const button: React.FC = () => {
  return (
    <Box>
      <Typography variant="button">button: Hello World!</Typography>
    </Box>
  );
};

export const overline: React.FC = () => {
  return (
    <Box>
      <Typography variant="overline">overline: Hello World!</Typography>
    </Box>
  );
};

export const sronly: React.FC = () => {
  return (
    <Box>
      <Typography variant="srOnly">srOnly: Hello World!</Typography>
    </Box>
  );
};
