import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

import LogoutButton from "../components/account/LogoutButton";

const Account_ProfilePage = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <div className='flex flex-col gap-3 justify-center items-start'>
        <h1>{currentUser?.name}&apos;s Profile</h1>
        <p>Registered email: {currentUser?.email}</p>
        <LogoutButton />
      </div>
    </>
  );
};

export default Account_ProfilePage;
