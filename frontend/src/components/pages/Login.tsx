import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "@material-ui/core";
import { LoginForm } from "../login/LoginForm";
import { useAuth } from "../../login/UseAuth";

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { signIn } = useAuth();
  const [error, setError] = useState<string>("");

  const signin = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      history.push("/profile");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email": {
          setError(t("login.errors.invalid"));
          break;
        }
        case "auth/user-disabled": {
          setError(t("login.errors.disabled"));
          break;
        }
        case "auth/user-not-found": {
          setError(t("login.errors.notexist"));
          break;
        }
        case "auth/wrong-password": {
          setError(t("login.errors.password"));
          break;
        }
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <LoginForm onSubmit={signin} errorOnSubmit={error} />
    </Container>
  );
};
