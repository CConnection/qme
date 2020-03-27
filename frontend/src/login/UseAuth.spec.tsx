import dotenv from "dotenv";
dotenv.config();

import { renderHook, act } from "@testing-library/react-hooks";
import { useAuth } from "./UseAuth";
import { AuthContextProvider } from "./AuthContext";

describe("useAuth", () => {
  it.skip("rejects when email is invalid", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthContextProvider
    });

    const testUser = {
      email: "x.com",
      password: "some password"
    };

    try {
      await result.current.signIn(testUser.email!, testUser.password!);
    } catch (e) {
      console.log("rejects email is invalid");
      expect(e.code).toMatch("auth/invalid-email");
    }
  });

  it("rejects when email does not exist", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthContextProvider
    });

    const testUser = {
      email: "x@x.com",
      password: "some password"
    };

    try {
      await result.current.signIn(testUser.email!, testUser.password!);
    } catch (e) {
      expect(e.code).toMatch("auth/user-not-found");
    }
  });

  it("can't login when password does not match for user", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthContextProvider
    });

    const testUser = {
      email: process.env.TEST_USER_EMAIL,
      password: "some password"
    };

    try {
      await result.current.signIn(testUser.email!, testUser.password!);
    } catch (e) {
      expect(e.code).toMatch("auth/wrong-password");
    }
  });

  it("can login and is logged in", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthContextProvider
    });

    const testUser = {
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASSWORD
    };

    await act(async () => {
      await result.current.signIn(testUser.email!, testUser.password!);
      expect(result.current.user.token).not.toBeUndefined();
    });
  });

  it("is logged out", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthContextProvider
    });

    expect(result.current.user.token).toBeUndefined();
  });

  it("can logout successfully", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthContextProvider
    });

    const testUser = {
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASSWORD
    };

    await act(async () => {
      await result.current.signIn(testUser.email!, testUser.password!);
      await result.current.signOut();
      expect(result.current.user.token).toBeUndefined();
    });
  });
});
