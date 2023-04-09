import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Outlet, useNavigate } from "react-router-dom";

// components
import Header from "../components/header/Header";
import AccountHeader from "../components/account/header/AccountHeader";

const AccountLayout = () => {
  const navigate = useNavigate();
  const { ready, currentUser } = useContext(UserContext);

  if (ready && !currentUser) {
    navigate("/");
  }

  return (
    <>
      <Header />
      <AccountHeader />
      <main className='max-w-7xl mx-auto px-4 mt-5'>
        <Outlet />
      </main>
    </>
  );
};

export default AccountLayout;
