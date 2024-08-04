import { Navigate, useNavigate } from "react-router-dom";
import data from "../../data/data.json";
import activitisShow from "../../data/activities.json";
import UniqueMovie from "../../hooks/UniqueMovie";
import CarsoulMovies from "../FindMovies/CarsoulMovies";
import { IoIosArrowForward } from "react-icons/io";
const Movies = () => {
  const movieNames = UniqueMovie(data);
  const navigate = useNavigate();
  return (
    <section className="mt-10 bg-backgroundColor">
      <div className="max-w-screen-xl mx-auto">
        <div>
          <div className="flex pt-10  justify-between items-end">
            <h1 className="text-5xl font-primaryBold  text-primaryColor">
              Recommend Movies
            </h1>
            <p
              onClick={() => navigate("/movies")}
              className="text-xl flex items-baseline justify-center text-smallColor hover:text-primaryColor hover:underline"
            >
              See All <IoIosArrowForward className="text-center text-xs" />
            </p>
          </div>
          <CarsoulMovies movieNames={movieNames} />
        </div>

        <div className="w-full my-10 h-auto bg-black border-2 border-smallColor rounded-lg flex justify-between items-center py-5 px-20">
          <h1 className="text-primaryColor font-primaryBlack text-6xl flex flex-col text-start">
            BookTix.{" "}
            <span className="text-white font-primarySemi text-5xl ">
              Stream
            </span>
          </h1>
          <h2 className="capitalize text-white font-primarySemi text-4xl">
            Endless entertainment anytime. Anywhere!
          </h2>
        </div>

        <div>
          <div className="flex pt-10  justify-between items-end">
            <h1 className="text-5xl font-primaryBold capitalize  text-primaryColor">
              explore fun Activities
            </h1>
            <p
              onClick={() => navigate("/movies")}
              className="text-xl flex items-baseline justify-center text-smallColor hover:text-primaryColor hover:underline"
            >
              See All <IoIosArrowForward className="text-center text-xs" />
            </p>
          </div>
          <CarsoulMovies movieNames={activitisShow} />
        </div>
        <div>
          <div className="flex pt-10  justify-between items-end">
            <h1 className="text-5xl font-primaryBold capitalize text-primaryColor">
              top games & events
            </h1>
            <p
              onClick={() => navigate("/movies")}
              className="text-xl flex items-baseline justify-center text-smallColor hover:text-primaryColor hover:underline"
            >
              See All <IoIosArrowForward className="text-center text-xs" />
            </p>
          </div>
          <CarsoulMovies movieNames={movieNames} />
        </div>
      </div>
    </section>
  );
};

export default Movies;
