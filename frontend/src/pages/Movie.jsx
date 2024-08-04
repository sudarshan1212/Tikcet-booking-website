import UniqueMovie from "../hooks/UniqueMovie";
import data from "../data/data.json";
import AllMovies from "../components/FindMovies/AllMovies";
const Movie = () => {
  const movieNames = UniqueMovie(data);

  return (
    <div className="bg-backgroundColor h-full py-12">
      <AllMovies movieNames={movieNames} />
    </div>
  );
};

export default Movie;
