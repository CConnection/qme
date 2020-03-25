import React, { useContext, useState } from "react";
import dotenv from "dotenv";
dotenv.config();
import { render, fireEvent, wait, act } from "@testing-library/react";
import { AuthContext, AuthContextProvider } from "./AuthContext";
import "@testing-library/jest-dom/extend-expect";
import { auth } from "../firebase/firebase";

const MockComponent: React.FC = () => {
  const authContext = useContext(AuthContext)!;

  const login = async () => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    if (email && password) {
      try {
        await auth.signInWithEmailAndPassword(email, password);
        const token = await auth.currentUser?.getIdToken();

        authContext.setUser({ token: token });
      } catch (e) {
        throw e;
      }
    } else {
      throw new Error(
        "Test user email or test user password env variable not set"
      );
    }
  };

  return (
    <div>
      {!authContext.user.token ? (
        <p>User is not logged in</p>
      ) : (
        <p>User is logged in</p>
      )}

      <button onClick={login}>login</button>
    </div>
  );
};

describe("AuthContext", () => {
  it("has no user", () => {
    const dom = (
      <AuthContextProvider>
        <MockComponent></MockComponent>
      </AuthContextProvider>
    );

    const { getByText } = render(dom);
    expect(getByText("User is not logged in")).toBeInTheDocument();
  });

  it("has a user", async () => {
    const dom = (
      <AuthContextProvider>
        <MockComponent></MockComponent>
      </AuthContextProvider>
    );

    const { getByText } = render(dom);

    fireEvent.click(getByText("login"));

    await wait(() => {
      expect(getByText("User is logged in")).toBeInTheDocument();
    });
  });
});
