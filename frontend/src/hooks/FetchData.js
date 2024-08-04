import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { BASE_URL } from "../../config";

const useFetchdata = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);

  const userInfo = useSelector((state) => state.booking.businessUser);

  console.log(userInfo);
  console.log(url);

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      console.log(url);
      try {
        console.log(url);

        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const data = await axios.get(url, config);
        console.log(data);

        setData("s");
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    getProfile();
  }, [url, userInfo.token]);
  console.log(data);

  return {
    data,
    loading,
  };
};

export default useFetchdata;
