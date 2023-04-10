import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const Account_Voyages_ReservationPage = () => {
  const { voyage_id } = useParams();
  const [reservation, setReservation] = useState({});

  useEffect(() => {
    axios
      .get(`/api/reservation/${voyage_id}`, { withCredentials: true })
      .then((res) => setReservation(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(reservation);

  if (!reservation?._id) {
    return <p>Loading</p>;
  } else {
    return (
      <div>
        <Link to={reservation ? `/yacht/${reservation?.yacht?._id}` : ""}>
          {reservation?.yacht?.title}
        </Link>
        <h2>Host: {reservation?.yacht?.owner?.name}</h2>
        <h3>
          Vacation Dates:{" "}
          {reservation
            ? format(new Date(reservation?.checkIn), "MM-dd-yyyy")
            : "loading check in date"}{" "}
          to{" "}
          {reservation
            ? format(new Date(reservation?.checkOut), "MM-dd-yyyy")
            : "loading checkout date"}
        </h3>
        <h3>Total Price: ${reservation?.price.toFixed(2)}</h3>
        <div className='grid grid-cols-2 md:grid-cols-3'>
          {reservation
            ? reservation?.yacht?.photos?.map((e, i) => (
                <img
                  src={`http://localhost:8000/uploads/${e}`}
                  key={i}
                  alt=''
                  className=''
                />
              ))
            : "Loading Images"}
        </div>
        <p>Description: {reservation?.yacht?.description}</p>
      </div>
    );
  }
};

export default Account_Voyages_ReservationPage;
