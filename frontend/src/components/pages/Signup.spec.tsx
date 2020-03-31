import React from "react";
import { render, wait } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Signup } from "./Signup";
import { useAuth } from "../../login/UseAuth";
import { LanguageProvider, RouterProvider } from "../../test/helpers";
import { Switch, Route } from "react-router-dom";

jest.mock("../../login/UseAuth", () => {
  return {
    __esModule: true,
    useAuth: jest.fn(() => {
      return {
        signUp: async (email: string, password: string) => {}
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

describe("Signup Page", () => {
  it("has a title", () => {
    const { getByText } = render(<Signup />, { wrapper: Wrapper });

    expect(getByText("signup.headline")).toBeVisible();
  });

  it("successfully signsup and redirects to profile page", async () => {
    const RedirectMock: React.FC = () => <p>redirect</p>;

    const { getByTestId, queryByText, getByText } = render(
      <Switch>
        <Route exact path="/">
          <Signup />
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
        getByTestId("signup.email").querySelector("input")!,
        "test@test.de",
        { allAtOnce: true }
      );

      userEvent.type(
        getByTestId("signup.password").querySelector("input")!,
        "123",
        { allAtOnce: true }
      );

      userEvent.type(
        getByTestId("signup.repeatpassword").querySelector("input")!,
        "123",
        { allAtOnce: true }
      );

      userEvent.click(getByTestId("signup.submit"));
    });

    expect(getByText("redirect")).toBeVisible();
  });

  it("shows email is already in use when receiving error", async () => {
    (useAuth as jest.Mock).mockReturnValueOnce({
      signUp: async () => {
        throw { code: "auth/email-already-in-use" };
      }
    });

    const { getByTestId } = render(<Signup />, { wrapper: Wrapper });

    await wait(async () => {
      userEvent.type(
        getByTestId("signup.email").querySelector("input")!,
        "test@test.de",
        { allAtOnce: true }
      );

      userEvent.type(
        getByTestId("signup.password").querySelector("input")!,
        "123",
        { allAtOnce: true }
      );

      userEvent.type(
        getByTestId("signup.repeatpassword").querySelector("input")!,
        "123",
        { allAtOnce: true }
      );

      userEvent.click(getByTestId("signup.submit"));
    });

    expect(getByTestId("signup.email").querySelector("input")!.value).toEqual(
      "test@test.de"
    );

    expect(getByTestId("signup.error").textContent).toEqual(
      "signup.errors.alreadyuse"
    );
  });

  it("shows invalid email address error", async () => {
    (useAuth as jest.Mock).mockReturnValueOnce({
      signUp: async () => {
        throw { code: "auth/invalid-email" };
      }
    });

    const { getByTestId } = render(<Signup />, { wrapper: Wrapper });

    await wait(async () => {
      userEvent.type(
        getByTestId("signup.email").querySelector("input")!,
        "test@test.de",
        { allAtOnce: true }
      );

      userEvent.type(
        getByTestId("signup.password").querySelector("input")!,
        "123",
        { allAtOnce: true }
      );

      userEvent.type(
        getByTestId("signup.repeatpassword").querySelector("input")!,
        "123",
        { allAtOnce: true }
      );

      userEvent.click(getByTestId("signup.submit"));
    });

    expect(getByTestId("signup.email").querySelector("input")!.value).toEqual(
      "test@test.de"
    );

    expect(getByTestId("signup.error").textContent).toEqual(
      "signup.errors.invalid"
    );
  });

  it("shows user does not exist when receiving user not found error", async () => {
    (useAuth as jest.Mock).mockReturnValueOnce({
      signUp: async () => {
        throw { code: "auth/operation-not-allowed" };
      }
    });

    const { getByTestId } = render(<Signup />, { wrapper: Wrapper });

    await wait(async () => {
      userEvent.type(
        getByTestId("signup.email").querySelector("input")!,
        "test@test.de",
        { allAtOnce: true }
      );

      userEvent.type(
        getByTestId("signup.password").querySelector("input")!,
        "123",
        { allAtOnce: true }
      );

      userEvent.type(
        getByTestId("signup.repeatpassword").querySelector("input")!,
        "123",
        { allAtOnce: true }
      );

      userEvent.click(getByTestId("signup.submit"));
    });

    expect(getByTestId("signup.email").querySelector("input")!.value).toEqual(
      "test@test.de"
    );

    expect(getByTestId("signup.error").textContent).toEqual(
      "signup.errors.notallowed"
    );
  });

  it("shows user does not exist when receiving user not found error", async () => {
    (useAuth as jest.Mock).mockReturnValueOnce({
      signUp: async () => {
        throw { code: "auth/weak-password" };
      }
    });

    const { getByTestId } = render(<Signup />, { wrapper: Wrapper });

    await wait(() => {
      userEvent.type(
        getByTestId("signup.email").querySelector("input")!,
        "test@test.de",
        { allAtOnce: true }
      );

      userEvent.type(
        getByTestId("signup.password").querySelector("input")!,
        "123",
        { allAtOnce: true }
      );

      userEvent.type(
        getByTestId("signup.repeatpassword").querySelector("input")!,
        "123",
        { allAtOnce: true }
      );

      userEvent.click(getByTestId("signup.submit"));
    });

    expect(getByTestId("signup.email").querySelector("input")!.value).toEqual(
      "test@test.de"
    );

    expect(getByTestId("signup.error").textContent).toEqual(
      "signup.errors.weakpassword"
    );
  });
});
