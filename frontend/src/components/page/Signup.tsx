import React from "react";
//import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "@material-ui/core";
import { SignupForm } from "../signup/SignupForm";
//import { useAuth } from "../../login/UseAuth";

export const Signup: React.FC = () => {
  const { t } = useTranslation();
  //const history = useHistory();
  //const { signIn } = useAuth();
  //const [error, setError] = useState<string>("");

  const signup = async (email: string, password: string) => {
    // try {
    //   await signIn(email, password);
    //   history.push("/profile");
    // } catch (error) {
    //   switch (error.code) {
    //     case "auth/invalid-email": {
    //       setError(t("login.error.invalid"));
    //       break;
    //     }
    //     case "auth/user-disabled": {
    //       setError(t("login.error.disabled"));
    //       break;
    //     }
    //     case "auth/user-not-found": {
    //       setError(t("login.error.notexist"));
    //       break;
    //     }
    //     case "auth/wrong-password": {
    //       setError(t("login.error.password"));
    //       break;
    //     }
    //   }
    // }
  };

  return (
    <Container maxWidth="xs">
      <SignupForm
        title={t("signup.headline")}
        titleTextFieldLogin={t("signup.email")}
        titleTextFieldPassword={t("signup.password")}
        titleTextFieldRepeatPassword={t("signup.repeatpassword")}
        onSubmit={signup}
        //errorFormSubmit={error}
      />
    </Container>
  );
};
