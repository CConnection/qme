import React from "react";
import { render, wait } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "./Login";
import { useAuth } from "../../login/UseAuth";
import { LanguageProvider } from "../../test/helpers";

jest.mock("../../login/UseAuth", () => {
  return {
    __esModule: true,
    useAuth: jest.fn(() => {
      return {
        signIn: async (email: string, password: string) => {}
      };
    })
  };
});

describe("Login Page", () => {
  it("has a title with doctor ", () => {
    const { getByText } = render(<Login />, { wrapper: LanguageProvider });

    expect(getByText("login.headline")).toBeVisible();
  });

  it("shows email is not valid when receiving invalid email", async () => {
    (useAuth as jest.Mock).mockReturnValueOnce({
      signIn: async () => {
        throw { code: "auth/invalid-email" };
      }
    });

    const { getByTestId, getByText } = render(<Login />);

    await wait(() => {
      userEvent.type(
        getByTestId("login.email").querySelector("input")!,
        "test@test.de",
        { allAtOnce: true }
      );

      userEvent.type(
        getByTestId("login.password").querySelector("input")!,
        "123",
        { allAtOnce: true }
      );

      userEvent.click(getByTestId("login.submit"));
    });

    expect(getByTestId("login.email").querySelector("input")!.value).toEqual(
      "test@test.de"
    );

    expect(getByTestId("login.error").textContent).toEqual(
      "login.error.invalid"
    );
  });

  it("shows user is disabled when receiving user is disabled error", async () => {
    (useAuth as jest.Mock).mockReturnValueOnce({
      signIn: async () => {
        throw { code: "auth/user-disabled" };
      }
    });

    const { getByTestId, getByText } = render(<Login />);

    await wait(() => {
      userEvent.type(
        getByTestId("login.email").querySelector("input")!,
        "test@test.de",
        { allAtOnce: true }
      );

      userEvent.type(
        getByTestId("login.password").querySelector("input")!,
        "123",
        { allAtOnce: true }
      );

      userEvent.click(getByTestId("login.submit"));
    });

    expect(getByTestId("login.email").querySelector("input")!.value).toEqual(
      "test@test.de"
    );

    expect(getByTestId("login.error").textContent).toEqual(
      "login.error.disabled"
    );
  });

  it("shows user does not exist when receiving user not found error", async () => {
    (useAuth as jest.Mock).mockReturnValueOnce({
      signIn: async () => {
        throw { code: "auth/user-not-found" };
      }
    });

    const { getByTestId, getByText } = render(<Login />);

    await wait(() => {
      userEvent.type(
        getByTestId("login.email").querySelector("input")!,
        "test@test.de",
        { allAtOnce: true }
      );

      userEvent.type(
        getByTestId("login.password").querySelector("input")!,
        "123",
        { allAtOnce: true }
      );

      userEvent.click(getByTestId("login.submit"));
    });

    expect(getByTestId("login.email").querySelector("input")!.value).toEqual(
      "test@test.de"
    );

    expect(getByTestId("login.error").textContent).toEqual(
      "login.error.notexist"
    );
  });

  it("shows user does not exist when receiving user not found error", async () => {
    (useAuth as jest.Mock).mockReturnValueOnce({
      signIn: async () => {
        throw { code: "auth/wrong-password" };
      }
    });

    const { getByTestId, getByText } = render(<Login />);

    await wait(() => {
      userEvent.type(
        getByTestId("login.email").querySelector("input")!,
        "test@test.de",
        { allAtOnce: true }
      );

      userEvent.type(
        getByTestId("login.password").querySelector("input")!,
        "123",
        { allAtOnce: true }
      );

      userEvent.click(getByTestId("login.submit"));
    });

    expect(getByTestId("login.email").querySelector("input")!.value).toEqual(
      "test@test.de"
    );

    expect(getByTestId("login.error").textContent).toEqual(
      "login.error.password"
    );
  });
});
