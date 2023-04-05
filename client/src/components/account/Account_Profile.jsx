import React from "react";

// components
import LogoutButton from "./LogoutButton";

const Account_Profile = ({ currentUser }) => {
  return (
    <div className='pt-10'>
      <div className='max-w-7xl px-8 flex flex-col gap-3 justify-center items-start'>
        <h1>{currentUser?.name}&apos;s Profile</h1>
        <p>Registered email: {currentUser?.email}</p>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Account_Profile;
