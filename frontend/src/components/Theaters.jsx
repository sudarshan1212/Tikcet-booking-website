import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { MdFastfood } from "react-icons/md";
import { PiWarningCircleLight } from "react-icons/pi";
import data from "../data/data.json";
import activities from "../data/activities.json";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { movieDetails } from "../redux/bookingSlice";
const Theaters = ({ time, location, movieName }) => {
  console.log(movieName);

  const processedMovieName = movieName
    ? movieName.toString().toLowerCase().replace(/\s/g, "")
    : "unknown movie";
  const dispatch = useDispatch();
  const findTheater = activities.filter((item) => {
    // eslint-disable-next-line react/prop-types
    return (
      item.movieName.toLowerCase().replace(/\s/g, "") === processedMovieName
    );
  });

  return (
    <div className="bg-backgroundColor shadow-black-inset h-auto text-white px-8 py-5 ">
      {findTheater.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between px-10 py-10 border-b border-b-gray-800 "
        >
          <div>
            <h1 className="text-2xl font-primaryBold capitalize">
              {item.theaterName} , {item.theaterLocation}
            </h1>
            <div className="flex justify-center items-baseline gap-5 mt-2">
              {item.food && (
                <p className="text-yellow-400 font-primarySemi text-base flex gap-2 items-baseline justify-centr">
                  <MdFastfood className="text-xl" /> Food & Beverage
                </p>
              )}{" "}
              <p
                className={` font-primarySemi text-base flex gap-2  items-baseline ${
                  item.cancellation ? "text-red-400" : "text-green-500"
                }`}
              >
                <GoDotFill className="text-xs" />
                {item.cancellation
                  ? "Non-cancellable"
                  : "Cancelation Available"}
              </p>
            </div>
            <div className="flex items-center gap-1 text-base mt-2 ">
              <PiWarningCircleLight className="text-lg" />
              Info
            </div>
          </div>
          <div className=" grid grid-cols-4 gap-x-10">
            {item.time.map((items, index) => (
              <Link
                to="bookseats"
                onClick={() =>
                  dispatch(
                    movieDetails({
                      theaterLocation: item.theaterLocation,
                      theaterName: item.theaterName,
                      movieName: item.movieName,
                      image: item.image,
                      seat: item.seat,
                      theaterAddress: item.theaterAddress,
                      time: items,
                    })
                  )
                }
                key={index}
                className="mt-2 border px-2 py-2 rounded-sm border-smallColor font-primaryRegular  transition duration-100"
              >
                {items.slice(0, 2) > 12
                  ? items.slice(0, 2) - 12 + items.slice(2) + "PM"
                  : items.slice(0, 2) + items.slice(2) + "AM"}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Theaters;
