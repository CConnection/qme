import { renderHook, act } from "@testing-library/react-hooks";
import { useAuth } from "./UseAuth";
import { AuthProvider } from "./AuthProvider";
import { auth } from "firebase";

jest.mock("firebase", () => {
  return {
    __esModule: true,
    auth: jest.fn(() => {
      return {
        signInWithEmailAndPassword: jest.fn(() => {}),
        currentUser: {
          getIdToken: jest.fn(() => "token")
        }
      };
    })
  };
});

describe("useAuth", () => {
  it("throws error when signin does not work", async () => {
    ((auth as unknown) as jest.Mock).mockReturnValueOnce({
      signInWithEmailAndPassword: jest.fn(() => {
        throw { code: "auth/wrong-password" };
      }),
      currentUser: {
        getIdToken: jest.fn(() => "token")
      }
    });
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    const testUser = {
      email: "x.com",
      password: "some password"
    };

    try {
      await result.current.signIn(testUser.email, testUser.password);
    } catch (e) {
      expect(e.code).toMatch("auth/wrong-password");
    }
  });

  it("can login and is logged in", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    const testUser = {
      email: "x.com",
      password: "some password"
    };

    await act(async () => {
      await result.current.signIn(testUser.email!, testUser.password!);
      expect(result.current.user.token).not.toBeUndefined();
    });
  });

  it("is logged out as default", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    expect(result.current.user.token).toBeUndefined();
  });

  it("can logout successfully", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
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
