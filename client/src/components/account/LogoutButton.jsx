import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const LogoutButton = () => {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const logout = async () => {
    await axios.get("/api/user/logout", { withCredentials: true });
    setCurrentUser(null);
    navigate("/");
  };
  return (
    <button
      className='bg-red-600 text-white px-4 py-2 rounded-md'
      onClick={() => logout()}>
      Logout
    </button>
  );
};

export default LogoutButton;
