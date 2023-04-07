import React from "react";
import Account_AddButton from "./Account_AddButton";
import { useParams } from "react-router-dom";
import Account_Yachts_AddForm from "./Account_Yachts_AddForm";

const Account_Yachts = () => {
  const { action } = useParams();
  console.log(action);
  return (
    <div className=' pt-5 px-8'>
      {action === "new" ? (
        <Account_Yachts_AddForm />
      ) : (
        <Account_AddButton type='Yacht' />
      )}
      <h2>This is the yacht page</h2>
    </div>
  );
};

export default Account_Yachts;
