import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "@material-ui/core";
import { SignupForm } from "../signup/SignupForm";
import { useAuth } from "../../login/UseAuth";

export const Signup: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { signUp } = useAuth();
  const [error, setError] = useState<string>("");

  const signup = async (email: string, password: string) => {
    try {
      await signUp(email, password);
      history.push("/profile");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use": {
          setError(t("signup.errors.alreadyuse"));
          break;
        }
        case "auth/invalid-email": {
          setError(t("signup.errors.invalid"));
          break;
        }
        case "auth/operation-not-allowed": {
          setError(t("signup.errors.notallowed"));
          break;
        }
        case "auth/weak-password": {
          setError(t("signup.errors.weakpassword"));
          break;
        }
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <SignupForm onSubmit={signup} errorOnSubmit={error} />
    </Container>
  );
};
