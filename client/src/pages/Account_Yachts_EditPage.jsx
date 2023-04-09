import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// components
import Account_Yachts_AddForm from "../components/account/my_yachts/Account_Yachts_AddForm";

const Account_Yachts_EditPage = () => {
  const [yacht, setYacht] = useState([]);
  const { yacht_id } = useParams();

  useEffect(() => {
    if (!yacht_id) return;
    axios
      .get("/api/yacht/user/" + yacht_id, { withCredentials: true })
      .then((res) => setYacht(res.data))
      .catch((err) => console.log(err));
  }, [yacht_id]);
  return (
    <div>
      {yacht.length > 0 ? (
        <Account_Yachts_AddForm yachtInfo={yacht[0]} />
      ) : (
        "loading"
      )}
    </div>
  );
};

export default Account_Yachts_EditPage;
