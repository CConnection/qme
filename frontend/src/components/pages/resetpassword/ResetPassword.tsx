import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@material-ui/core";
import { useAuth } from "../../../login/UseAuth";
import { ResetPasswordForm } from "../../resetpassword/ResetPasswordForm";

export const ResetPassword: React.FC = () => {
  const { t } = useTranslation();
  const { sendPasswordResetEmail } = useAuth();
  const [sendVerificationCodeError, setSendVerificationCodeError] = useState<
    string
  >("");

  const [confirm, setConfirm] = useState<Boolean>(false);

  const sendVerificationCodeHandler = async (email: string) => {
    try {
      await sendPasswordResetEmail(email);
      setConfirm(true);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email": {
          setSendVerificationCodeError(t("forgot.forgotform.error.invalid"));
          break;
        }
        case "auth/user-not-found": {
          setSendVerificationCodeError(t("forgot.forgotform.error.notfound"));
          break;
        }
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <ResetPasswordForm
        showConfirmation={confirm}
        onSubmit={sendVerificationCodeHandler}
        errorOnSubmit={sendVerificationCodeError}
      ></ResetPasswordForm>
    </Container>
  );
};
