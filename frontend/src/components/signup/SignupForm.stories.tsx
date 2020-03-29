import React from "react";
import { SignupForm } from "./SignupForm";
import { text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
  component: SignupForm,
  title: "SignupForm"
};

export const Form: React.FC = () => (
  <SignupForm
    title={text("Title", "Signup as Doctor")}
    titleTextFieldLogin={text("Login Textfield title", "Email Address")}
    titleForgotPassword={text("Forgot Password Link", "Forgot your password?")}
    errorTextFieldLogin={text("Login Textfield error", "")}
    titleTextFieldPassword={text("Password Textfield title", "Password")}
    errorTextFieldPassword={text("Password Textfield error", "")}
    titleTextFieldRepeatPassword={text(
      "Repeat Password Textfield title",
      "Repeat Password"
    )}
    errorTextFieldRepeatPassword={text("Repeat Password Textfield error", "")}
    onSubmit={action("Clicked Signup")}
    errorFormSubmit={text("Error Submit Form", "")}
  />
);
