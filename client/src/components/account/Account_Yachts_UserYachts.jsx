import React, { useState, useEffect } from "react";
import axios from "axios";

// components
import Account_Yachts_YachtProfile from "./my_yachts/Account_Yachts_YachtProfile_Preview";

const Account_Yachts_UserYachts = () => {
  const [yachts, setYachts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/yacht/user", { withCredentials: true })
      .then((res) => setYachts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className=''>
      <div className='flex flex-col gap-3 my-3'>
        {yachts
          ? yachts.map((e, i) => (
              <Account_Yachts_YachtProfile yacht={e} key={i} />
            ))
          : ""}
      </div>
    </div>
  );
};

export default Account_Yachts_UserYachts;
