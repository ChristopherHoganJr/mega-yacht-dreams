import React from "react";
import { Link } from "react-router-dom";

// components
import ImageGallery_Image from "./ImageGallery_Image";

const YachtProfile_preview = ({ yacht }) => {
  return (
    <Link to={`/yacht/${yacht._id}`} className='rounded-md px-4 py-3'>
      <h2 className='truncate text-md leading-6'>{yacht.title}</h2>
      <img
        className=' w-full object-cover aspect-square rounded-md'
        src={`http://localhost:8000/uploads/${yacht.photos[0]}`}
        alt=''
      />
      <div className='mt-1'>
        <h3 className='text-sm font-semibold leading-5'>{yacht.address}</h3>
        <h4 className='text-sm'>
          <span className='font-bold'>${yacht.price}</span> Per Night
        </h4>
      </div>
    </Link>
  );
};

export default YachtProfile_preview;
