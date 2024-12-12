"use client";

import { localStorageKeys } from "@/config/localStorageKeys";
import React, { createContext, useEffect } from "react";

interface IAuthContextValue {
  user: {
    email: string;
    id: string;
    name: string;
    token: string;
  };
}

interface IAuthProviderProps {
  children: React.ReactNode;
  user: IAuthContextValue;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children, user }: IAuthProviderProps) {
  useEffect(() => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, user.user.token);
  }, [user]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
