import React from "react";

// components
import Account_Yachts_AddForm from "../components/account/my_yachts/Account_Yachts_AddForm";

const Account_Yachts_NewPage = () => {
  const yacht = {
    title: "",
    address: "",
    photos: [],
    description: "",
    amenities: [],
    additionalInfo: "",
    checkIn: "",
    checkOut: "",
    maxGuests: 1,
    price: 0.0,
  };
  return (
    <>
      <Account_Yachts_AddForm yachtInfo={yacht} />
    </>
  );
};

export default Account_Yachts_NewPage;
