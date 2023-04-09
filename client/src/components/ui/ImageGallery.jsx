import React from "react";

// components
import ImageGallery_Image from "./ImageGallery_Image";

const ImageGallery = ({ images }) => {
  return (
    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
      {images.length > 0
        ? images.map((e, i) => (
            <div className='flex max-h-[300px]' key={i}>
              <ImageGallery_Image img_src={e} />
            </div>
          ))
        : ""}
    </div>
  );
};

export default ImageGallery;
