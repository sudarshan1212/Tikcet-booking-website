/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CarsoulMovies = ({ movieNames }) => {
  const navigate = useNavigate();

  const handleDetails = (item) => {
    const rootId = item.movieName.toLowerCase();
    navigate(`/movies/${rootId}`, {
      state: { item: item },
    });
  };
  console.log(movieNames[1].image);

  return (
    <>
      <Swiper
        slidesPerView={4.5}
        spaceBetween={15}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="py-10 h-auto"
      >
        {movieNames.slice(0, 10).map((item, index) => (
          <SwiperSlide
            onClick={() => handleDetails(item)}
            key={index}
            className=" flex flex-col justify-center bg-backgroundCol border-smallColor rounded-xl hover:shadow-xl"
          >
            <img
              src={item.image}
              className="rounded-xl w-full h-full"
              alt="escription of image"
            />

            <div className="px-2 mt-2">
              <h2 className="text-2xl text-white font-primarySemi capitalize">
                {item.movieName}
              </h2>
              <p className="font-primaryLight text-white">Tamil</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CarsoulMovies;
