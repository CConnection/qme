import React from "react";
import styles from "./LandingButton.module.css";

const LandingButton = ({ text, icon }) => {
  return (
    <button className={styles.button}>
      {icon}
      <br />
      {text}
    </button>
  );
};

export default LandingButton;
