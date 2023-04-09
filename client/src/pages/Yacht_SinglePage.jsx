import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Yacht_SinglePage = () => {
  const { id } = useParams();
  const [yacht, setYacht] = useState();
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    axios
      .get("/api/yacht/" + id)
      .then((yachtData) => {
        setYacht(yachtData.data[0]);
        setMainImage(yachtData.data[0].photos[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  if (showImages) {
    return (
      <div className='flex flex-col items-center gap-4 mb-4 h-full'>
        <button
          className='text-white px-4 py-2 rounded-md border-black drop-shadow-md sticky top-2'
          onClick={() => setShowImages(false)}>
          Close Images
        </button>
        <div className='flex flex-col gap-4'>
          {yacht?.photos?.map((e, i) => (
            <img src={`http://localhost:8000/uploads/${e}`} key={i} />
          ))}
        </div>
        <button
          className='text-white px-4 py-2 rounded-md border-black drop-shadow-md'
          onClick={() => setShowImages(false)}>
          Close Images
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className='text-3xl font-bold'>{yacht?.title}</h1>
      <a
        target='_blank'
        href={`https://maps.google.com/?q=${yacht?.address}`}
        className='font-semibold underline text-secondary'>
        {yacht?.address}
      </a>
      <div className='relative overflow-hidden rounded-md'>
        <div className='grid gap-2 grid-cols-[2fr_1fr] h-full '>
          <div className=''>
            {yacht?.photos?.[0] ? (
              <div className='h-full'>
                <img
                  className='w-full object-cover h-full aspect-square rounded-md'
                  src={`http://localhost:8000/uploads/${yacht?.photos[0]}`}
                />
              </div>
            ) : (
              "loading"
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <div>
              <img
                className='rounded-md aspect-square object-cover'
                onClick={() => setMainImage(e)}
                src={`http://localhost:8000/uploads/${yacht?.photos[1]}`}
              />
            </div>
            <div>
              <img
                className='rounded-md aspect-square  object-cover'
                onClick={() => setMainImage(e)}
                src={`http://localhost:8000/uploads/${yacht?.photos[2]}`}
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowImages(true)}
          className='text-white px-4 py-2 rounded-md bg-opacity-50 absolute bottom-2 right-2 border-black drop-shadow-md'>
          Show more photos
        </button>
      </div>
      <div className='py-2'>
        <h2 className='text-xl font-bold'>Description: </h2>
        <p>{yacht?.description}</p>
      </div>
    </div>
  );
};

export default Yacht_SinglePage;
