import React from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  enter: {
    opacity: 0
  },
  enterActive: {
    transition: "opacity 300ms",
    opacity: 1
  },
  exit: {
    opacity: 1
  },
  exitActive: {
    transition: "opacity 300ms",
    opacity: 0
  }
});

interface IAnimated {
  showConfirmation: Boolean;
}

export const Animated: React.FC<IAnimated> = ({
  children,
  showConfirmation
}) => {
  const classes = useStyles();

  return (
    <SwitchTransition>
      <CSSTransition
        key={showConfirmation ? "Sent Email" : "Send Email"}
        addEndListener={(node, done) =>
          node.addEventListener("transitionend", done, false)
        }
        classNames={{
          enter: classes.enter,
          enterActive: classes.enterActive,
          exit: classes.exit,
          exitActive: classes.exitActive
        }}
      >
        {children}
      </CSSTransition>
    </SwitchTransition>
  );
};
