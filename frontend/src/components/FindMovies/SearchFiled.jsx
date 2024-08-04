import { useEffect, useRef, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import data from "../../data/data.json";
import { IoClose } from "react-icons/io5";

const SearchFiled = () => {
  const [location, setlocation] = useState(false);

  const [popUp, setPopUp] = useState(false);
  const [locationName, setlocationName] = useState("");
  const [filterState, setFilterState] = useState([]);

  const uniqueMovies = Object.values(
    data.reduce((acc, current) => {
      acc[current.movieName] = current;
      return acc;
    }, {})
  );

  const handleSearch = (e) => {
    if (!e) {
      const filteredData = uniqueMovies.filter((datas) => {
        return datas.movieName.toLowerCase();
      });
      setFilterState(filteredData);
    } else {
      const search = e.target.value.toLowerCase().replace(/ /g, "");

      // Assuming uniqueMovies is an array of objects with movieName property
      const filteredData = uniqueMovies.filter((datas) => {
        return datas.movieName.toLowerCase().replace(/ /g, "").includes(search);
      });
      setFilterState(filteredData);
    }
  };
  // console.log(filterState);
  const uhiqueElement = data.map((element) => {
    const uniqueElemtn = element.theaterLocation;
    return uniqueElemtn;
  });
  const loaction = [...new Set(uhiqueElement)];

  const toggleRef = useRef(null);
  const handleClickOutside = (event) => {
    if (toggleRef.current && !toggleRef.current.contains(event.target)) {
      setlocation(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleCombinedClick = () => {
    setPopUp(true);
    handleSearch();
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-5">
      <div className="border-gray-500 rounded-lg shadow-xl flex bg-backgroundColor justify-between items-center  p-2">
        <div className="w-3/4 border-gray-400 relative">
          <input
            className="w-full px-2 py-2 rounded-lg outline-none bg-backgroundColor text-primaryColor text-xl font-primarySemi t"
            type="text"
            onClick={handleCombinedClick}
            placeholder="Search Movies"
          />
          {popUp && (
            <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center  z-30">
              <div className="max-w-6xl bg-backgroundColor p-10 h-screen scrollbar-thin scrollbar-track-slate-700  scrollbar-thumb-primaryColor  overflow-y-scroll scroll-smooth w-full rounded-3xl relative shadow-mg">
                <button
                  onClick={() => setPopUp(false)}
                  id="closebutton"
                  className=" fixed   text-5xl right-52 top-5 text-gray-600"
                >
                  <IoClose className="w-10 h-10 hover:rotate-90 duration-150 delay-75" />
                </button>

                <input
                  id="come"
                  placeholder="Search Movies"
                  type="text"
                  onClick={handleSearch}
                  onChange={handleSearch}
                  className="w-full mt-10 py-3 bg-transparent outline-none text-4xl font-primaryRegular border-b border-b-primaryColor px-5"
                />
                <div className="grid grid-cols-4 gap-x-7">
                  {filterState.map((item, index) => (
                    <div key={index} className="mt-10">
                      <div>
                        <img src={item.image} className="rounded-lg" alt="" />
                        <div className="px-2 text-lg mt-1">
                          <h2 className="hover:text-smallColor duration-100">
                            {item.movieName}
                          </h2>
                          <p className="font-thin">Tamil</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between border-l-2 py-2 border-purple-800 bg- items-center gap-2 px-5 h-full ">
          <MdLocationPin className="text-2xl text-primaryColor " />
          <div className="flex flex-col">
            <div
              className="font-primarySemi relative"
              onClick={() => setlocation(!location)}
              ref={toggleRef}
            >
              {locationName ? locationName : "Location"}
              {location && (
                <div className="w-48 h-auto z-10  bg bg-[#141414] overflow-hidden bgwi absolute  top-10 -right-10 py">
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
      </div>
    </div>
  );
};

export default SearchFiled;
