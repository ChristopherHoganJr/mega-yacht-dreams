import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";

// components
import ImageGallery_Image from "../components/ui/ImageGallery_Image";

const Account_VoyagesPage = () => {
  const [voyages, setVoyages] = useState([]);

  useEffect(() => {
    axios
      .get("/api/reservations", { withCredentials: true })
      .then((res) => setVoyages(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h2>Voyages Page</h2>
      <div>
        {voyages.map((e, i) => (
          <Link
            to={`/account/voyages/${e._id}`}
            key={i}
            className='border-2 border-black p-4 rounded-md flex flex-col'>
            <h3>Yacht Name: {e.yacht.title}</h3>
            <div className='max-h-[200px] flex'>
              <ImageGallery_Image img_src={e.yacht.photos[0]} />
            </div>

            <h4>
              Check in: {format(new Date(e.checkIn), "MM-dd-yy")} at{" "}
              {!e.yacht.checkIn.split(":")[0] % 12
                ? e.yacht.checkIn.split(":")[0]
                : e.yacht.checkIn.split(":")[0] - 12}
              :{e.yacht.checkIn.split(":")[1]}{" "}
              {e.yacht.checkIn.split(":")[0] % 12 ? "PM" : "AM"}
            </h4>
            <h4>
              Check out: {format(new Date(e.checkOut), "MM-dd-yy")} at{" "}
              {!e.yacht.checkOut.split(":")[0] % 12
                ? e.yacht.checkOut.split(":")[0]
                : e.yacht.checkOut.split(":")[0] - 12}
              :{e.yacht.checkOut.split(":")[1]}{" "}
              {e.yacht.checkOut.split(":")[0] % 12 ? "PM" : "AM"}
            </h4>
            <h3>Price ${e.price.toFixed(2)}</h3>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Account_VoyagesPage;
