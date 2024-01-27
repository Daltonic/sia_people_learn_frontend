import React, { createContext, useContext, useState } from "react";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  userType: "admin" | "user" | "instructor";
  lastLogin: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

const useValue = () => {
  const [user, setUser] = useState<IUser | null>(null);

  return {
    user,
    setUser,
  };
};

export const Context = createContext<ReturnType<typeof useValue> | undefined>(
  undefined
);

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Context.Provider value={useValue()}>{children}</Context.Provider>;
};

export const _useContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("_useContext must be used within a ContextProvider");
  }
  return context;
};

export default ContextProvider;
