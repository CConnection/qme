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
    titleForgotPassword={text("Forgot Password Link", "Forgot your password?")}
    errorTextFieldLogin={text("Login Textfield error", "")}
    titleTextFieldPassword={text("Password Textfield title", "Password")}
    errorTextFieldPassword={text("Password Textfield error", "")}
    onSubmit={action("Clicked Login")}
    onClickForget={action("Clicked Forget")}
    errorFormSubmit={text("Error Submit Form", "")}
  />
);
