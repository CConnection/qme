import React from "react";
import { SignupForm } from "./SignupForm";
import { text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
  component: SignupForm,
  title: "Signup form"
};

export const Form: React.FC = () => (
  <SignupForm
    onSubmit={action("Clicked Signup")}
    errorOnSubmit={text("Error Submit Form", "")}
  />
);
