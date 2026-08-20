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

  /*
   * Create a profile for the current user if one
   * does not already exist.
   */
  function initializeUserProfile(user: User) {
    const profileKey = `profile_${user.id}`;

    const existingProfile =
      localStorage.getItem(profileKey);

    if (!existingProfile) {
      const defaultProfile = {
        name: user.name,
        email: user.email,
        currency: "ZMW",
      };

      localStorage.setItem(
        profileKey,
        JSON.stringify(defaultProfile)
      );
    }
  }

  async function login(
    email: string,
    password: string
  ) {
    const response = await loginApi({
      email,
      password,
    });

    const loggedInUser = response.data.user;

    setUser(loggedInUser);
    setToken(response.data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(loggedInUser)
    );

    localStorage.setItem(
      "token",
      response.data.token
    );

    // Create this user's profile if needed
    initializeUserProfile(loggedInUser);
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

    const newUser = response.data.user;

    setUser(newUser);
    setToken(response.data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(newUser)
    );

    localStorage.setItem(
      "token",
      response.data.token
    );

    // New accounts always start with ZMW
    const newProfile = {
      name: newUser.name,
      email: newUser.email,
      currency: "ZMW",
    };

    localStorage.setItem(
      `profile_${newUser.id}`,
      JSON.stringify(newProfile)
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

    const updatedUser = response.data.user;

    setUser(updatedUser);

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    /*
     * Update this user's profile only.
     */
    const profileKey = `profile_${updatedUser.id}`;

    const savedProfile =
      localStorage.getItem(profileKey);

    let profile = {
      name: updatedUser.name,
      email: updatedUser.email,
      currency: "ZMW",
    };

    if (savedProfile) {
      try {
        profile = JSON.parse(savedProfile);
      } catch {
        // Keep default profile
      }
    }

    localStorage.setItem(
      profileKey,
      JSON.stringify({
        ...profile,
        name: updatedUser.name,
        email: updatedUser.email,
      })
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
