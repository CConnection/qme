import React from "react";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase/firebase";
import { AuthContext } from "./AuthContext";

/* eslint-disable react-hooks/rules-of-hooks */
export const WithAuth = WrappedComponent => {
  return () => {
    const authContext = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (authContext.user.token === undefined) {
        router.push("/login");
      }
    });

    let result;
    if (authContext.user.token !== undefined) {
      result = <WrappedComponent></WrappedComponent>;
    } else {
      result = <div></div>;
    }

    return result;
  };
};
/* eslint-disable react-hooks/rules-of-hooks */
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  const signIn = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      const token = await auth.currentUser?.getIdToken();

      authContext.setUser({ token: token });
    } catch (err) {
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      authContext.setUser({ token: undefined });
    } catch (err) {
      throw err;
    }
  };

  return { user: authContext.user, signIn: signIn, signOut: signOut };
};
