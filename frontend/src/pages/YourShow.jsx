import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import useFetchdata from "../hooks/FetchData";
import axios from "axios";
import { useSelector } from "react-redux";

const YourShow = () => {
  // const { data, loading } = useFetchdata(`${BASE_URL}/show`);
  let url = `${BASE_URL}/show`;
  // console.log(data);
  // let show = data.data;
  const [data, setData] = useState([]);
  // console.log(show);
  const userInfo = useSelector((state) => state.booking.businessUser);
  console.log(userInfo);

  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  const getProfile = async () => {
    // setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      // console.log("dd");

      const response = await axios.get(`${BASE_URL}/show`, config);
      setData(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }

    // if (url && userInfo.token) {
    // }
  };
  useEffect(() => {
    getProfile();
  }, []);

  //

  // }, [url, userInfo.token]);

  console.log(data);

  return (
    <div className="max-w-screen-lg h-atuo mx-auto py-10">
      <h1 className="mr-24   mt-10 text-6xl font-primaryBold text-primaryColor text-left">
        your <span className="text-black "> shows.</span>
      </h1>
      {data.map((item, index) => (
        <div key={index} className="max-w-4xl mx-auto mt-10">
          <div className="flex items-start justify-between border shadow-xl rounded-lg px-2 py-5">
            <div className="h-72 w-1/2">
              <img src={item.image} className="w-full h-full bg" />
            </div>
            <div className="flex-grow text-left ml-4 gap-x-10 pl-2">
              <h2 className="mr-24 mb-2  mt-2 text-6xl font-primaryBold text-black text-left">
                {item.showName}
                <span className="text-primaryColor "> </span>
              </h2>

              <p className="text-2xl font-primarySemi">
                category:{" "}
                <span className="font-primaryLight">{item.category}</span>{" "}
              </p>
              <p className="text-2xl font-primarySemi">
                location:{" "}
                <span className="font-primaryLight">{item.location}</span>{" "}
              </p>

              <div className="flex justify-start items-center text-2xl gap-2">
                <p className="text-2xl font-primarySemi ">
                  number of tickets sold:
                </p>
                <span className="font-primaryBold text-primaryColor ">2</span>
              </div>
              <button className="mt-10  bg-red-500 font-primarySemi text-white px-2 py-2 rounded-lg  capitalize text-lg">
                delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* <div className="max-w-4xl mx-auto mt-10">
        <div className="flex items-start justify-between border shadow-xl rounded-lg px-2 py-5 ">
          <div className="h-72">
            <img
              src="https://res.cloudinary.com/dhcezip8k/image/upload/v1722762740/gdmf6ynahcbjsbxvmvzv.png"
              className="w-full h-full bg"
            />
          </div>
          <div className="flex-grow text-left ml-4 gap-x-10 pl-2 ">
            <h2 className="mr-24 mb-2  mt-2 text-6xl font-primaryBold text-black text-left">
              showname <span className="text-primaryColor "> .</span>
            </h2>

            <p className="text-2xl font-primarySemi">
              category: <span className="font-primaryLight">theater</span>{" "}
            </p>
            <p className="text-2xl font-primarySemi">
              location: <span className="font-primaryLight">theater</span>{" "}
            </p>
            <p className="text-2xl font-primarySemi">
              category: <span className="font-primaryLight">theater</span>{" "}
            </p>

            <div className="flex justify-start items-center text-2xl gap-2">
              <p className="text-2xl font-primarySemi ">
                number of tickets sold:
              </p>
              <span className="font-primaryLight ">5</span>
            </div>
            <button className="bg-red-500 font-primarySemi text-white px-2 py-2 rounded-lg  mt-2 capitalize text-lg">
              delete
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default YourShow;
