import React, { useState, useContext, createContext } from "react";
import { getPb } from "../backend/pocketbase";

type Login = {
  email: string;
  password: string;
};

type UserDetails = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
};

interface ProviderProps {
  user: UserDetails | null;
  token: string;
  login(data: Login): void;
  logout(): void;
}

const pb = getPb();

const AuthContext = createContext<ProviderProps>({
  user: null,
  token: "",
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const storedInfo = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;
  const [user, setUser] = useState<UserDetails | null>(storedInfo);
  const [token, setToken] = useState<string>(storedInfo?.token || "");

  const login = async (data: Login) => {
    try {
      const pbLogin = await pb
        .collection("users")
        .authWithPassword(data.email, data.password);

      setToken(pbLogin.token);

      const userData = {
        firstName: pbLogin.record?.firstName,
        lastName: pbLogin.record?.lastName,
        dateOfBirth: pbLogin.record?.dateOfBirth,
        token: pbLogin.token,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      window.location.href = "/destinations";
    } catch (e) {
      console.log(e);
    }
  };

  const logout = () => {
    pb.authStore.clear();
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
