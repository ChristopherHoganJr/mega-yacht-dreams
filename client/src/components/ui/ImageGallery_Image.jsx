import React from "react";

const ImageGallery_Image = ({ img_src }) => {
  return (
    <img
      src={`http://localhost:8000/uploads/${img_src}`}
      alt='preview image'
      className='rounded-md  object-cover'
    />
  );
};

export default ImageGallery_Image;
