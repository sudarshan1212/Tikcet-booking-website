/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AllMovies = ({ movieNames }) => {
  const navigate = useNavigate();

  const handleDetails = (item) => {
    const rootId = item.movieName.toLowerCase();
    navigate(`/movies/${rootId}`, {
      state: { item: item },
    });
  };
  return (
    <div className="mx-auto max-w-screen-lg grid grid-cols-4 gap-x-10  ">
      {movieNames.map((item, index) => (
        <div key={index} className="group " onClick={() => handleDetails(item)}>
          <div className="w-20 rounded-lg h-8  z-10  relative top-[17rem] gap-1 left-2 text-sm font-primaryLight bg-black text-white  justify-center items-center flex opacity-80 px-1 ">
            <FaStar className="text-primaryColor text-lg mb-1 " /> 7.5/10
          </div>

          <img
            src={item.image}
            alt=""
            className="rounded-2xl w-ful h-72  bg-cover  overflow-hidden duration-100 group-hover:scale-105  "
          />

          <div>
            <h2 className="text-white font-primarySemi mt-2 text-xl duration-100 group-hover:text-">
              {item.movieName}
            </h2>
            <p className="text-lg font-primaryLight  text-[#f1f2f6]">Tamil</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllMovies;
