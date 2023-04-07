import React, { useState } from "react";
import axios from "axios";

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
      console.log("nothing to submit");
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
        console.log(fileNames);
        setFormInfo({
          ...formInfo,
          photos: [...formInfo.photos, ...fileNames],
        });
        console.log(formInfo);
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
      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        <label className='cursor-pointer border bg-transparent rounded-md p-8 text-gray-400 flex flex-col items-center'>
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
          ? formInfo.photos.map((e, i) => (
              <div className='' key={i}>
                <img
                  src={`http://localhost:8000/uploads/${e}`}
                  alt='preview image'
                  className='rounded-md'
                />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default AddForm_ImageInput;
