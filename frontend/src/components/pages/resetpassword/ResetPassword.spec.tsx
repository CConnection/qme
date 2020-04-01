import React from "react";
import { render, wait } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ResetPassword } from "./ResetPassword";
import { useAuth } from "../../../login/UseAuth";
import { LanguageProvider, RouterProvider } from "../../../test/helpers";

jest.mock("../../../login/UseAuth", () => {
  return {
    __esModule: true,
    useAuth: jest.fn(() => {
      return {
        sendPasswordResetEmail: async (email: string) => {}
      };
    })
  };
});

jest.mock("../../../components/resetpassword/Animation.tsx", () => {
  return {
    __esModule: true,
    Animated: jest.fn(({ children }) => children)
  };
});

const Wrapper: React.FC = ({ children }) => {
  return (
    <RouterProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </RouterProvider>
  );
};

describe("ResetPassword Page", () => {
  it("has a title", () => {
    const { getByText } = render(<ResetPassword />, { wrapper: Wrapper });

    expect(getByText("resetpassword.send.headline")).toBeVisible();
  });

  it("transitions into confirm page when sends email successfully ", async () => {
    const { getByTestId, findByText } = render(<ResetPassword />, {
      wrapper: Wrapper
    });

    await wait(() => {
      userEvent.type(
        getByTestId("resetpassword.send.email").querySelector("input")!,
        "test@test.de",
        { allAtOnce: true }
      );

      userEvent.click(getByTestId("resetpassword.send.submit"));
    });

    expect(await findByText("resetpassword.confirm.headline")).toBeVisible();
  });

  it.skip("shows email is already in use when receiving error", async () => {
    (useAuth as jest.Mock).mockReturnValueOnce({
      signUp: async () => {
        throw { code: "auth/email-already-in-use" };
      }
    });

    const { getByTestId } = render(<ResetPassword />, { wrapper: Wrapper });

    await wait(async () => {
      await userEvent.type(
        getByTestId("signup.email").querySelector("input")!,
        "test@test.de",
        { allAtOnce: true }
      );

      await userEvent.type(
        getByTestId("signup.password").querySelector("input")!,
        "123",
        { allAtOnce: true }
      );

      await userEvent.type(
        getByTestId("signup.repeatpassword").querySelector("input")!,
        "123",
        { allAtOnce: true }
      );

      await userEvent.click(getByTestId("signup.submit"));
    });

    expect(getByTestId("signup.email").querySelector("input")!.value).toEqual(
      "test@test.de"
    );

    expect(getByTestId("signup.error").textContent).toEqual(
      "signup.errors.alreadyuse"
    );
  });

  it.skip("shows invalid email address error", async () => {
    (useAuth as jest.Mock).mockReturnValueOnce({
      signUp: async () => {
        throw { code: "auth/invalid-email" };
      }
    });

    const { getByTestId } = render(<ResetPassword />, { wrapper: Wrapper });

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
      "signup.errors.invalid"
    );
  });

  it.skip("shows user does not exist when receiving user not found error", async () => {
    (useAuth as jest.Mock).mockReturnValueOnce({
      signUp: async () => {
        throw { code: "auth/operation-not-allowed" };
      }
    });

    const { getByTestId } = render(<ResetPassword />, { wrapper: Wrapper });

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
      "signup.errors.notallowed"
    );
  });

  it.skip("shows user does not exist when receiving user not found error", async () => {
    (useAuth as jest.Mock).mockReturnValueOnce({
      signUp: async () => {
        throw { code: "auth/weak-password" };
      }
    });

    const { getByTestId } = render(<ResetPassword />, { wrapper: Wrapper });

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
