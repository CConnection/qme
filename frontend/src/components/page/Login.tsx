import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@material-ui/core";
import { LoginForm } from "../login/LoginForm";

export const Login: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="xs">
      <LoginForm
        title={t("login.headline")}
        titleTextFieldLogin={t("login.email")}
        titleTextFieldPassword={t("login.password")}
        onSubmit={() => {
          console.log("login");
        }}
      />
    </Container>
  );
};
