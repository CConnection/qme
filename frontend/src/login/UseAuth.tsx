import React from "react";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "firebase";
import { User, AuthContext } from "./AuthProvider";

/* eslint-disable react-hooks/rules-of-hooks */
export const WithAuth = (WrappedComponent: React.FC): React.FC => {
  return () => {
    const authContext = useContext(AuthContext);
    const router = useHistory();

    useEffect(() => {
      if (authContext!.user.token === undefined) {
        router.push("/login");
      }
    });

    let result: JSX.Element;

    if (authContext!.user.token !== undefined) {
      result = <WrappedComponent></WrappedComponent>;
    } else {
      result = <div></div>;
    }

    return result;
  };
};
/* eslint-disable react-hooks/rules-of-hooks */

export const useAuth = (): {
  user: User;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  setPassword: (code: string, password: string) => Promise<void>;
} => {
  const authContext = useContext(AuthContext)!;

  const signIn = async (email: string, password: string) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      const token = await auth().currentUser?.getIdToken();

      authContext.setUser({ token: token });
    } catch (err) {
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut;
      authContext.setUser({ token: undefined });
    } catch (err) {
      throw err;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      const token = await auth().currentUser?.getIdToken();
      authContext.setUser({ token: token });
    } catch (err) {
      throw err;
    }
  };

  const sendPasswordResetEmail = async (email: string) => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (err) {
      throw err;
    }
  };

  const setPassword = async (code: string, password: string) => {};

  return {
    user: authContext.user,
    signIn,
    signOut,
    signUp,
    sendPasswordResetEmail,
    setPassword
  };
};
