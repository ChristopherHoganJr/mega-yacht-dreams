import React, { useState } from "react";
import axios from "axios";

// components
import ImageGallery_Image from "../../ui/ImageGallery_Image";

const AddForm_ImageInput = ({ setFormInfo, formInfo }) => {
  const [imagePath, setImagePath] = useState("");

  // adds image url to array
  const arrayHandler = (e) => {
    e.preventDefault();
    setFormInfo({
      ...formInfo,
      photos: [...formInfo.photos, imagePath],
    });
    setImagePath("");
  };

  // uploads image to server from url
  const addImageByLink = async (e) => {
    e.preventDefault();
    if (imagePath.length < 1) {
    } else {
      const { data: filename } = await axios.post("/api/uploads/link", {
        link: imagePath,
        withCredentials: true,
      });
      setFormInfo({
        ...formInfo,
        photos: [...formInfo.photos, filename],
      });
      setImagePath("");
    }
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("images", files[i]);
    }
    axios
      .post("/api/uploads/file", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((res) => {
        const fileNames = res.data;
        setFormInfo({
          ...formInfo,
          photos: [...formInfo.photos, ...fileNames],
        });
      });
  };

  const deleteImage = ({ e, image }) => {
    e.preventDefault();
    setFormInfo({
      ...formInfo,
      photos: [...formInfo.photos.filter((photo) => photo !== image)],
    });
  };

  const makeMainPhoto = ({ e, image }) => {
    e.preventDefault();
    formInfo.photos.filter((photo) => photo !== image);
    setFormInfo({
      ...formInfo,
      photos: [image, ...formInfo.photos.filter((photo) => photo !== image)],
    });
  };

  return (
    <div className='flex flex-col justify-between border border-black p-4 rounded-lg gap-2'>
      <h3 className='font-semibold text-2xl'>Images</h3>
      <div>
        <p className='text-sm'>just end in jpg</p>
        <div className='flex'>
          <input
            type='text'
            placeholder={"image path"}
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
          />
          <button
            className='px-4 text-white'
            onClick={(e) => addImageByLink(e)}>
            Add&nbsp;Image
          </button>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        <label className='h-[150px] cursor-pointer border bg-transparent rounded-md p-8 text-gray-400 flex flex-col justify-center items-center'>
          <input
            type='file'
            multiple
            className='hidden'
            onChange={uploadImage}
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z'
            />
          </svg>
          Upload
        </label>
        {formInfo.photos.length > 0
          ? formInfo.photos.map((image, i) => (
              <div className='flex max-h-[300px] relative' key={i}>
                <ImageGallery_Image img_src={image} />
                <div className='absolute bottom-2 right-2 left-2 flex justify-between'>
                  <button
                    onClick={(e) => makeMainPhoto({ e, image })}
                    className=' bg-green-600 p-2 text-white rounded-md bg-opacity-50 cursor-pointer'>
                    {image === formInfo.photos[0] ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='w-6 h-6'>
                        <path
                          fillRule='evenodd'
                          d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                          clipRule='evenodd'
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                        />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={(e) => deleteImage({ e, image })}
                    className=' bg-red-600 p-2 text-white rounded-md bg-opacity-50 cursor-pointer'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default AddForm_ImageInput;
