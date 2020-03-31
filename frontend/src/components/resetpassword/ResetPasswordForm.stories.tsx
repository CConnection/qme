import React from "react";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
  component: ResetPasswordForm,
  title: "Reset password form"
};

export const Form: React.FC = () => (
  <ResetPasswordForm
    onSubmit={action("Clicked Reset Password")}
    errorOnSubmit={text("Error Submit Form", "")}
    showConfirmation={boolean("Confirm", false)}
    onResend={action("Clicked resend button")}
  />
);
