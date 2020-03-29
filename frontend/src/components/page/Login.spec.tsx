import React from "react";
import { render, wait } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "./Login";
import { useAuth } from "../../login/UseAuth";
import { LanguageProvider, RouterProvider } from "../../test/helpers";
import { Switch, Route } from "react-router-dom";

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

const Wrapper: React.FC = ({ children }) => {
  return (
    <RouterProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </RouterProvider>
  );
};

describe("Login Page", () => {
  it("has a title with doctor ", () => {
    const { getByText } = render(<Login />, { wrapper: Wrapper });

    expect(getByText("login.headline")).toBeVisible();
  });

  it("successfully logs in and redirects to profile page", async () => {
    const RedirectMock: React.FC = () => <p>redirect</p>;

    const { getByTestId, queryByText, getByText } = render(
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/profile">
          <RedirectMock />
        </Route>
      </Switch>,
      { wrapper: Wrapper }
    );

    expect(queryByText("redirect")).toBeNull();

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

    expect(getByText("redirect")).toBeVisible();
  });

  it("shows email is not valid when receiving invalid email", async () => {
    (useAuth as jest.Mock).mockReturnValueOnce({
      signIn: async () => {
        throw { code: "auth/invalid-email" };
      }
    });

    const { getByTestId } = render(<Login />, { wrapper: Wrapper });

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

    const { getByTestId } = render(<Login />, { wrapper: Wrapper });

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

    const { getByTestId } = render(<Login />, { wrapper: Wrapper });

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

    const { getByTestId } = render(<Login />, { wrapper: Wrapper });

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
