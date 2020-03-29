import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@material-ui/core";
import { LoginForm } from "../login/LoginForm";
//import { useAuth } from "../../login/UseAuth";

export const Login: React.FC = () => {
  const { t } = useTranslation();
  //const { signIn } = useAuth();
  const [error, setError] = useState<string>("");

  // const signin = async (email: string, password: string) => {
  //   try {
  //     await signIn(email, password);
  //   } catch (error) {
  //     switch (error.code) {
  //       case "auth/invalid-email": {
  //         setError(t("login.error.invalid"));
  //         break;
  //       }
  //       case "auth/user-disabled": {
  //         setError(t("login.error.disabled"));
  //         break;
  //       }
  //       case "auth/user-not-found": {
  //         setError(t("login.error.notexist"));
  //         break;
  //       }
  //       case "auth/wrong-password": {
  //         setError(t("login.error.password"));
  //         break;
  //       }
  //     }
  //   }
  // };

  return (
    <Container maxWidth="xs">
      <LoginForm
        title={t("login.headline")}
        titleTextFieldLogin={t("login.email")}
        titleTextFieldPassword={t("login.password")}
        onSubmit={() => {}}
        errorFormSubmit={error}
      />
    </Container>
  );
};
