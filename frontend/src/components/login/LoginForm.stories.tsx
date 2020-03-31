import React from "react";
import { LoginForm } from "./LoginForm";
import { text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
  component: LoginForm,
  title: "Login form"
};

export const Form: React.FC = () => (
  <LoginForm
    onSubmit={action("Clicked Login")}
    errorOnSubmit={text("Error Submit Form", "")}
    onClickForget={action("Clicked Forget")}
  />
);
