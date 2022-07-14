import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

import registerUser from "../functions/registerUser";
import loginUser from "../functions/loginUser";
// import logoutUser from "../functions/logoutUser";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserInfo] = useState({});

  const register = async (email, username, password) => {
    const user = await registerUser(email, username, password);
    setUserInfo(user);
    AsyncStorage.setItem("user", JSON.stringify(user));
  };

  const login = async (username, password) => {
    const user = await loginUser(username, password);

    if (user) {
      setUserInfo(user);
      AsyncStorage.mergeItem("user", JSON.stringify(user));
    }
  };

  const logout = async () => {
    // await logoutUser(user);
    AsyncStorage.removeItem("user");
    setUserInfo({});
  };

  const isLoggedIn = async () => {
    try {
      let user = await AsyncStorage.getItem("user");
      user = JSON.parse(user);
      if (user) {
        console.log("user in store", user);
        setUserInfo(user);
      }
    } catch (e) {
      console.log(`not logged in ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
