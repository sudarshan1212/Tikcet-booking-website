import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  moviePoster1,
  moviePoster2,
  moviePoster3,
  moviePoster4,
} from "../assets";

const date = [
  {
    img: moviePoster1,
  },
  {
    img: moviePoster2,
  },
  {
    img: moviePoster3,
  },
  {
    img: moviePoster4,
  },
];
const Carousels = () => {
  return (
    <div className="flex bg-black pt-8">
      <Swiper
        className="mx-20 rounded-2xl"
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        effect={"fade"}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
      >
        {date.map((item, index) => (
          <SwiperSlide key={index} className="w-screen h-80 bg-center bg-cover">
            <img
              className="w-full h-full object-cover"
              src={item.img}
              alt={`slide-${index}`}
              onError={(e) =>
                console.error(`Failed to load image: ${item.img}`)
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousels;
