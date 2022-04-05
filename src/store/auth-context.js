import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  setLogin: (state) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const setLogin = (state) => {
    setIsLoggedIn(state);
  };
  const contextValue = {
    isLoggedIn: isLoggedIn,
    setLogin: setLogin,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
