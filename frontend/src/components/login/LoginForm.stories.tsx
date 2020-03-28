import React from "react";
import { LoginForm } from "./LoginForm";
import { text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
  component: LoginForm,
  title: "LoginForm"
};

export const Form: React.FC = () => (
  <LoginForm
    title={text("Title", "Login as Doctor")}
    titleTextFieldLogin={text("Login Textfield title", "Email Address")}
    errorTextFieldLogin={text("Login Textfield error", "")}
    titleTextFieldPassword={text("Password Textfield title", "Password")}
    errorTextFieldPassword={text("Password Textfield error", "")}
    onLoginClick={action("Clicked Login")}
    onSignUpCLick={action("Clicked Signup")}
  />
);
