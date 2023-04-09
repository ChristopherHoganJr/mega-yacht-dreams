import React, { useEffect, useState } from "react";
import axios from "axios";

// components
import YachtProfile_preview from "../components/ui/YachtProfile_preview";

const IndexPage = () => {
  const [yachts, setYachts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/yachts/")
      .then((res) => setYachts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg-grid-cols-4 my-8 gap-x-4 gap-y-6 px-4'>
      {yachts?.length > 0
        ? yachts.map((e, i) => <YachtProfile_preview yacht={e} key={i} />)
        : "Loading"}
    </div>
  );
};

export default IndexPage;
