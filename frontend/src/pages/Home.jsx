import Carousels from "../components/Carousels";
import Movies from "../components/Home/Movies";
import SearchFiled from "./../components/FindMovies/SearchFiled";

const Home = () => {
  return (
    <div className="   bg-black h-auto text-white">
      <Carousels />
      <SearchFiled />
      <Movies />
    </div>
  );
};

export default Home;
