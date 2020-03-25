import React from "react";
import styles from "./LandingButton.module.css";

interface ILandingButton {
  text: string;
  icon: JSX.Element;
}

export const LandingButton: React.FC<ILandingButton> = ({ text, icon }) => {
  return (
    <button className={styles.button}>
      {icon}
      <br />
      {text}
    </button>
  );
};
