import React from "react";
import { Outlet } from "react-router-dom";

// components
import Header from "../components/header/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className='max-w-7xl mx-auto px-4 mt-5'>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
