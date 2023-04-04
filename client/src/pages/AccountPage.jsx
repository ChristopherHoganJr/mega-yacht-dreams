import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, Link, useParams } from "react-router-dom";

const AccountPage = () => {
  const { ready, currentUser } = useContext(UserContext);
  if (ready && !currentUser) useNavigate("/");

  const { slug } = useParams();
  console.log(slug);

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='w-full flex mt-2  justify-center'>
        <Link
          to='/account/'
          className='py-2 px-4 font-semibold bg-primary text-white rounded-full'>
          My Profile
        </Link>
        <Link
          to='/account/cruises'
          className='py-2 px-4 font-semibold text-secondary'>
          My Cruises
        </Link>
        <Link
          to='/account/hotels'
          className='py-2 px-4 font-semibold text-secondary'>
          My Hotels
        </Link>
        <Link
          to='/account/flights'
          className='py-2 px-4 font-semibold text-secondary'>
          My Flights
        </Link>
        <Link
          to='/account/Restaurants'
          className='py-2 px-4 font-semibold text-secondary'>
          My Restaurants
        </Link>
      </div>
    </div>
  );
};

export default AccountPage;
