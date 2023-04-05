import React from "react";
import { Link } from "react-router-dom";

const AccountHeader_Link = ({ title, url, slug, icon }) => {
  return (
    <Link
      to={url}
      className={`${
        slug === title.toLowerCase() ? "bg-primary text-white " : "bg-gray-200"
      } py-2 px-4 flex gap-2 rounded-full`}>
      {icon} My {title}
    </Link>
  );
};

export default AccountHeader_Link;
