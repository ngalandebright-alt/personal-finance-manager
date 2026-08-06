import { useState, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";

import {
  login as loginApi,
  register as registerApi,
  updateProfile as updateProfileApi,
} from "../api/authApi";


export default function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });


  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });



  async function login(email: string, password: string) {

    const response = await loginApi({
      email,
      password,
    });


    setUser(response.data.user);
    setToken(response.data.token);


    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );


    localStorage.setItem(
      "token",
      response.data.token
    );
  }



  async function register(
    name: string,
    email: string,
    password: string
  ) {

    const response = await registerApi({
      name,
      email,
      password,
    });


    setUser(response.data.user);
    setToken(response.data.token);


    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );


    localStorage.setItem(
      "token",
      response.data.token
    );
  }



  function logout() {

    setUser(null);
    setToken(null);


    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  async function updateProfile(
    name: string,
    email: string
) {

    const response = await updateProfileApi({
        name,
        email,
    });


    setUser(response.data.user);


    localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
    );
}



  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
