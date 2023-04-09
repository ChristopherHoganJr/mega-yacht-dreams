import React from "react";
import { Link } from "react-router-dom";

// components
import ImageGallery from "../../ui/ImageGallery";

const Account_Yachts_YachtProfile_Preview = ({ yacht }) => {
  return (
    <Link
      to={`/account/yachts/${yacht._id}`}
      className='border-2 border-black p-3 rounded-md flex justify-between cursor-pointer'>
      <div className='flex-grow'>
        <h3>{yacht.title}</h3>
        <p className='text-sm'>Address {yacht.address}</p>
        <p>{yacht.description}</p>
      </div>
      <img
        src={`http://localhost:8000/uploads/${yacht.photos[0]}`}
        className='max-h-[200px] w-auto max-w-[200px]'
        alt=''
      />
    </Link>
  );
};

export default Account_Yachts_YachtProfile_Preview;
