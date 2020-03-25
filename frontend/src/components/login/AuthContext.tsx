import React, { useState } from "react";

export interface User {
  token: string | undefined;
}

export interface IAuthContext {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({ token: undefined });

  return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
