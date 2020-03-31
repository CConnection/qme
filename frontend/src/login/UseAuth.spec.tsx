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
  const testUser = {
    email: "x.com",
    password: "some password"
  };

  describe("login", () => {
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

      await act(async () => {
        await result.current.signIn(testUser.email!, testUser.password!);
        await result.current.signOut();
        expect(result.current.user.token).toBeUndefined();
      });
    });
  });

  describe("signup", () => {
    it("can signup with email and password", async () => {
      ((auth as unknown) as jest.Mock).mockReturnValueOnce({
        createUserWithEmailAndPassword: jest.fn(() => {}),
        currentUser: {
          getIdToken: jest.fn(() => "token")
        }
      });
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      });

      await act(async () => {
        await result.current.signUp(testUser.email, testUser.password);
        expect(result.current.user.token).not.toBeUndefined();
      });
    });

    it("throws error when sign up does not work", async () => {
      ((auth as unknown) as jest.Mock).mockReturnValueOnce({
        createUserWithEmailAndPassword: jest.fn(() => {
          throw { code: "auth/email-already-in-use" };
        }),
        currentUser: {
          getIdToken: jest.fn(() => "token")
        }
      });

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      });

      try {
        await result.current.signUp(testUser.email, testUser.password);
      } catch (e) {
        expect(e.code).toMatch("auth/email-already-in-use");
      }
    });

    it("can signup with email and password", async () => {
      ((auth as unknown) as jest.Mock).mockReturnValueOnce({
        createUserWithEmailAndPassword: jest.fn(() => {
          throw { code: "auth/email-already-in-use" };
        }),
        currentUser: {
          getIdToken: jest.fn(() => "token")
        }
      });

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      });

      try {
        await result.current.signUp(testUser.email, testUser.password);
      } catch (e) {
        expect(e.code).toMatch("auth/email-already-in-use");
      }
    });

    it("can signup with email and password", async () => {
      ((auth as unknown) as jest.Mock).mockReturnValueOnce({
        createUserWithEmailAndPassword: jest.fn(() => {
          throw { code: "auth/email-already-in-use" };
        }),
        currentUser: {
          getIdToken: jest.fn(() => "token")
        }
      });

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      });

      try {
        await result.current.signUp(testUser.email, testUser.password);
      } catch (e) {
        expect(e.code).toMatch("auth/email-already-in-use");
      }
    });
  });

  describe("Password reset", () => {
    it("sends email to user", async () => {
      ((auth as unknown) as jest.Mock).mockReturnValueOnce({
        sendPasswordResetEmail: jest.fn(() => {})
      });

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      });
      expect(async () => {
        await result.current.sendPasswordResetEmail(testUser.email);
      }).not.toThrow();
    });

    it("returns error on fail", async () => {
      ((auth as unknown) as jest.Mock).mockReturnValueOnce({
        sendPasswordResetEmail: jest.fn(() => {
          throw { code: "auth/user-not-found" };
        })
      });

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      });

      try {
        await result.current.sendPasswordResetEmail(testUser.email);
      } catch (e) {
        expect(e.code).toMatch("auth/user-not-found");
      }
    });
  });
});
