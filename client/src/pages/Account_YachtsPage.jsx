import React from "react";

import { useParams } from "react-router-dom";

// components

import Account_AddButton from "../components/account/my_yachts/Account_AddButton";
import Account_Yachts_UserYachts from "../components/account/Account_Yachts_UserYachts";

const Account_YachtsPage = () => {
  return (
    <>
      <Account_AddButton type='Yacht' />
      <Account_Yachts_UserYachts />
    </>
  );
};

export default Account_YachtsPage;
