import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { MdLocationPin, MdMovieFilter } from "react-icons/md";
import "swiper/css";
import data from "../data/data.json";
import "swiper/css/pagination";
import { IoMdTime } from "react-icons/io";
import "swiper/css/navigation";
import { Range, getTrackBackground } from "react-range";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Theaters from "../components/Theaters";
const SingleMovie = () => {
  const [details, setDetails] = useState([]);
  const Location = useLocation();
  const [locationName, setlocationName] = useState("");
  const [location, setlocation] = useState(false);
  const [values, setValues] = useState([10, 12]);
  const [time, setTime] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  useEffect(() => {
    setDetails(Location.state.item);
    // setDetails
  }, [Location.state.item]);
  const toggleRef = useRef(null);
  const timeRef = useRef(null);
  const handleClickOutside = (event) => {
    if (toggleRef.current && !toggleRef.current.contains(event.target)) {
      setlocation(false);
    }
    if (timeRef.current && !timeRef.current.contains(event.target)) {
      setTime(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const uhiqueElement = data.map((element) => {
    const uniqueElemtn = element.theaterLocation;
    return uniqueElemtn;
  });
  const loaction = [...new Set(uhiqueElement)];
  const date = [
    { day: "sun", date: "01", month: "jul" },
    { day: "mon", date: "02", month: "jul" },
    { day: "tue", date: "03", month: "jul" },
    { day: "wed", date: "04", month: "jul" },
    { day: "thu", date: "05", month: "jul" },
    { day: "fri", date: "06", month: "jul" },
    { day: "sat", date: "07", month: "jul" },
    { day: "sun", date: "08", month: "jul" },
    { day: "mon", date: "09", month: "jul" },
  ];
  const [selectedDate, setSelectedDate] = useState(null);
  const handleSlideClick = (index, item) => {
    setActiveIndex(index);
    // Create a Date object
    const dateObject = new Date(
      `${item.month} ${item.date}, ${new Date().getFullYear()}`
    );
    const formattedDate = `${String(dateObject.getDate()).padStart(
      2,
      "0"
    )}-${String(dateObject.getMonth() + 1).padStart(
      2,
      "0"
    )}-${dateObject.getFullYear()}`;
    setSelectedDate(formattedDate);
  };

  const STEP = 1;
  const MIN = 0;
  const MAX = 24;

  const formatTime = (value) => {
    const hours = Math.floor(value);
    const minutes = (value - hours) * 60;
    const period = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    return `${formattedHours}:${minutes === 0 ? "00" : minutes} ${period}`;
  };

  return (
    <div className="bg-black    ">
      <div className="max-w-screen-xl border-b border-b-smallColor mx-auto py-24 ">
        <div className="grid grid-cols-3 grid-rows-2 place-items-cen ter  capitalize ">
          <div className="col-span-2 row-span-2 text-white  ">
            <h1 className=" font-primaryBold text-8xl">{details.movieName}</h1>
            <h2 className="flex items-center font-primarySemi text-3xl pt-5">
              Tamil <GoDotFill className="mx-3 text-xs bg" />
              3h 1m <GoDotFill className="mx-2 text-xs bg" /> 27 jun, 2024
            </h2>
            <p className="text-xl font-primaryRegular pt-10 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              exercitationem veniam deleniti quibusdam quaerat quam error
              excepturi quas consequatur odio.quibusdam quaerat quam error
              excepturi quas consequatur odio.
            </p>
            <button className=" items-end justify-center  gap-2 h-15 mt-10 flex focus:outline-none text-2xl text-white bg-buttonColor hover:bg-purple-800  focus:ring-purple-300 font-medium rounded-lg  px-4 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 font-primaryBold ">
              <MdMovieFilter className="text-4xl " /> Trailer
            </button>
          </div>
          <div className="col-start-3 row-span-2 ">
            <div className="flex justify-center items-center h-96 ">
              <img src={details.image} className="h-full rounded-xl" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg- pt-7">
        <div className="max-w-screen-lg mx-auto bg-black w-full   h-full px- py-10 rounded-2xl ">
          <div className="flex justify-between  items-center gap-x-24">
            <div className=" w-2/5 flex gap-5">
              <Swiper
                slidesPerView={5}
                spaceBetween={5}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="px-10"
                breakpoints={{
                  769: {
                    slidesPerView: 7,
                    slidesPerGroup: 3,
                  },
                }}
              >
                {date.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    onClick={() => handleSlideClick(index, item)}
                    className={`shadow-xl hover:bg-primaryColor active:bg-purple-500 rounded-lg flex justify-center items-center flex-col text-white py-2 mx-1 ${
                      activeIndex === index ? "bg-primaryColor" : ""
                    }`}
                  >
                    <h1 className="text-sm font-primaryRegular uppercase">
                      {item.day}
                    </h1>
                    <h1 className="text-lg font-primarySemi">{item.date}</h1>
                    <h1 className="text-xs font-primaryLight uppercase">
                      {item.month}
                    </h1>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* Filter */}
            <div className=" w-3/5 flex items-center gap-9">
              <h1 className="font-primarySemi text-xl text-white">Filter By</h1>
              <div className="flex justify-between hover:bg-primaryColor group  text-white py-2 rounded-xl border border-smallColor bg- items-center gap-2 px-5 h-full ">
                <MdLocationPin className="text-3xl text-primaryColor  group-hover:text-white  " />
                <div className="flex flex-col">
                  <div
                    className="font-primarySemi relative text-xl"
                    onClick={() => setlocation(!location)}
                    ref={toggleRef}
                  >
                    {locationName ? locationName : "Location"}
                    {location && (
                      <div className="w-48 h-auto z-10 rounded-xl  bg bg-[black] overflow-hidden bgwi absolute  top-10 -right-10 py">
                        {loaction.map((item, index) => (
                          // console.log(item)
                          <p
                            key={index}
                            onClick={() => setlocationName(item)}
                            className="text-lg capitalize flex hover:bg-[#0a0a0a] font-primaryRegular hover:text-primaryColor text-center duration-100  justify-center items-center py-3   p-5 "
                          >
                            {item}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between  text-white py-2 group hover:bg-primaryColor transition rounded-xl border border-smallColor bg- items-center gap-2 px-5 h-full ">
                <IoMdTime className="text-3xl text-primaryColor group-hover:text-white " />
                <div className="flex flex-col">
                  <div
                    className="font-primarySemi relative text-xl broder-2 border-rose-400"
                    ref={timeRef}
                  >
                    <h1 onClick={() => setTime(!time)}> ShowTime</h1>
                    {time && (
                      <div className="w-56 h-auto py-2 px-4 z-10 rounded-xl  bg bg-[black] overflow-hidden bgwi absolute  top-10 -right-14 py">
                        <div>
                          <Range
                            values={values}
                            step={STEP}
                            min={MIN}
                            max={MAX}
                            onChange={(values) => setValues(values)}
                            renderTrack={({ props, children }) => (
                              <div
                                {...props}
                                className="h-2 w-full bg-gray-300 rounded mt-5"
                                style={{
                                  background: getTrackBackground({
                                    values,
                                    colors: ["#ccc", "#af73d8", "#ccc"],
                                    min: MIN,
                                    max: MAX,
                                  }),
                                }}
                              >
                                {children}
                              </div>
                            )}
                            renderThumb={({ props, isDragged }) => (
                              <div
                                {...props}
                                className={`h-4 w-4 bg-[#ffffff] rounded-full ${
                                  isDragged ? "shadow-lg" : ""
                                }`}
                              />
                            )}
                          />
                          <div className="mt-4 flex justify-between">
                            <span className="font-primaryLight text-base">
                              {formatTime(values[0])}
                            </span>
                            <span className="font-primaryLight text-base">
                              {formatTime(values[1])}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" h mx-auto mt- max-w-screen-lg pb-10 ">
          <Theaters
            time={values}
            location={locationName}
            date={selectedDate}
            movieName={details.movieName}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;
