import React, { useState, useContext } from "react";
import { differenceInCalendarDays } from "date-fns";
import { UserContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ReserveYacht = ({ yacht }) => {
  const navigate = useNavigate();
  const { currentUser, ready } = useContext(UserContext);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [phone, setPhone] = useState("");
  let numberOfDays = 0;

  if (checkIn && checkOut)
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );

  const submitBooking = (e) => {
    e.preventDefault();
    const booking = {
      checkIn,
      checkOut,
      guests,
      phone,
      price: numberOfDays * yacht.price,
    };
    axios
      .post(`/api/reservation/${yacht._id}`, booking, { withCredentials: true })
      .then((book) => navigate(`/account/voyages/${book.data._id}`))
      .catch((err) => console.log(err));
  };

  return (
    <div className='mt-3 max-w-lg mx-auto py-2 px-4 border-2 border-black rounded-md flex flex-col items-center gap-2'>
      <div className='flex gap-1 justify-center items-center px-3 py-3'>
        <h2 className='text-md font-bold'>Price per day:</h2>
        <p className='bg-green-600 py-2 px-6 rounded-md text-xl text-white'>
          ${yacht?.price}
        </p>
      </div>
      <div className='flex flex-col gap-2'>
        <div className=' flex gap-2 py-2 px-2 border border-black rounded-md'>
          <h4>Check in:</h4>
          <input
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            type='date'
          />
        </div>
        <div className=' flex gap-2 py-2 px-2 border border-black rounded-md'>
          <h4>Check out:</h4>
          <input
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            type='date'
          />
        </div>
        <div className=' flex gap-2 py-2 px-2 border border-black rounded-md items-center'>
          <h4>Number of Guests:</h4>
          <input
            type='number'
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className='rounded-md border border-black py-1 px-2'
          />
          <p>/{yacht.maxGuests}</p>
        </div>
      </div>

      <div className='w-full flex flex-col gap-2'>
        {currentUser && ready && numberOfDays ? (
          <>
            <p
              className={`border-2 p-2 text-center rounded-md transition-all ${
                guests <= yacht.maxGuests && numberOfDays >= 0
                  ? "border-green-600"
                  : "border-red-600"
              }`}>
              subtotal: ${(numberOfDays * yacht.price).toFixed(2)}
            </p>
            <div className=' flex gap-2 py-2 px-2 border border-black rounded-md'>
              <h4>Phone Number:</h4>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type='tel'
                pattern='[0-9]{10}'
                maxLength={12}
                required
              />
            </div>
          </>
        ) : (
          <></>
        )}

        {currentUser && ready ? (
          <button
            onClick={(e) => submitBooking(e)}
            disabled={guests > yacht.maxGuests}
            className={`${
              guests > yacht.maxGuests ? "bg-red-600" : "bg-green-600"
            } transition-all px-6 py-2 rounded-md text-white  mt-1`}>
            Reserve This Yacht{" "}
            {numberOfDays > 0 ? `For ${numberOfDays} Days` : ""}
          </button>
        ) : (
          <Link
            to='/login'
            className={`${
              guests > yacht.maxGuests ? "bg-red-600" : "bg-green-600"
            } transition-all px-6 text-center py-2 rounded-md text-white  mt-1`}>
            Log In to Reserve This Yacht{" "}
            {numberOfDays > 0 ? `For ${numberOfDays} Days` : ""}
          </Link>
        )}
      </div>
    </div>
  );
};

export default ReserveYacht;
