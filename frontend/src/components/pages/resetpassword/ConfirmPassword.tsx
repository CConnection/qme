import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { useAuth } from "../../../login/UseAuth";
import { Container } from "@material-ui/core";
import { ConfirmPasswordForm } from "../../resetpassword/ConfirmPasswordForm";

export const Forgot: React.FC = () => {
  const { t } = useTranslation();
  const { setPassword } = useAuth();
  const [passwordError, setPasswordError] = useState<string>("");

  const setPasswordHandler = async (code: string, newPassword: string) => {
    try {
      await setPassword(code, newPassword);
    } catch (error) {
      switch (error.code) {
        case "auth/expired-action-code":
          setPasswordError(t("forgot.verifyform.error.expired"));
          break;
        case "auth/invalid-action-code":
          setPasswordError(t("forgot.verifyform.error.invalid"));
          break;
        case "auth/user-disabled":
          setPasswordError(t("forgot.verifyform.error.disabled"));
          break;
        case "auth/user-not-found":
          setPasswordError(t("forgot.verifyform.error.notfound"));
          break;
        case "auth/weak-password":
          setPasswordError(t("forgot.verifyform.error.weakpassword"));
          break;
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <ConfirmPasswordForm />
    </Container>
  );
};
