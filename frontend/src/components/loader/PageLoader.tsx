import React from "react";
import LoopIcon from "@material-ui/icons/Loop";

export const PageLoader: React.FC = () => (
  <div className="App">
    <LoopIcon />
    <div>loading...</div>
  </div>
);
