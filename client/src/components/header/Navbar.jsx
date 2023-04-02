import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const Navbar = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <nav className='max-w-7xl mx-auto flex justify-between items-center w-full h-[80px] shadow-md px-2'>
      <a href='/' className='text-xl font-bold'>
        Mega Yacht Dream
      </a>
      <div className='flex border-2 border-black rounded-full px-4 py-1 items-center gap-2 shadow-md shadow-grey-200'>
        <div>Date</div>
        <div className='w-[2px] h-[50%] bg-black'></div>
        <div>Party Size</div>
        <div className='w-[2px] h-[50%] bg-black'></div>
        <div>Location</div>
        <button className='bg-primary text-white p-1 rounded-full'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        </button>
      </div>
      <div className='flex border-2 border-black rounded-full px-4 py-1 items-center gap-2 shadow-md shadow-grey-200'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
          />
        </svg>
        <Link to={"/login"} className='bg-middle text-white rounded-full p-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
            />
          </svg>
        </Link>
        {!!currentUser && <p>{currentUser.name}</p>}
      </div>
    </nav>
  );
};

export default Navbar;
