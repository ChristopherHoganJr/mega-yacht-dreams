import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, Link, useParams } from "react-router-dom";

// components
import AccountHeader from "../components/account/AccountHeader";
import Account_Profile from "../components/account/Account_Profile";
import Account_Yachts from "../components/account/Account_Yachts";

const AccountPage = () => {
  const navigate = useNavigate();
  const { ready, currentUser } = useContext(UserContext);

  if (ready && !currentUser) {
    navigate("/");
  }

  let { slug } = useParams();
  if (slug === undefined) slug = "profile";

  return (
    <div className='max-w-7xl mx-auto'>
      <AccountHeader slug={slug} />
      {slug === "profile" ? <Account_Profile currentUser={currentUser} /> : ""}
      {slug === "yachts" ? <Account_Yachts /> : ""}
    </div>
  );
};

export default AccountPage;
