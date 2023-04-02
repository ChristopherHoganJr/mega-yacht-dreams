import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    if (!currentUser) {
      axios
        .get("/api/user", { withCredentials: true })
        .then((res) => setCurrentUser(res.data));
    }
    console.log(currentUser);
  }, [currentUser]);
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
