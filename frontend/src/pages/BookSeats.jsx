import { useDispatch, useSelector } from "react-redux";
import { MdOutlineChair } from "react-icons/md";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkout } from "../redux/bookingSlice";
const BookSeats = () => {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const theaterDetails = useSelector((state) => state.booking.theaterDetails);
  console.log(theaterDetails);
  const seats = Array.from(
    { length: theaterDetails.seat },
    (_, index) => index + 1
  );
  const [selectedIndices, setSelectedIndices] = useState([]);

  const handleClick = (index) => {
    setSelectedIndices(
      (prevIndices) =>
        prevIndices.includes(index)
          ? prevIndices.filter((i) => i !== index) // Remove index if already selected
          : [...prevIndices, index] // Add index if not already selected
    );
    setTotal(total + 100);
  };
  const dispathch = useDispatch();
  const handleCheckOut = () => {
    navigate("/checkout");
    dispathch(
      checkout({
        price: total,
        seat: selectedIndices,
      })
    );
  };
  return (
    <div className="h-full bg-black">
      <div className=" max-w-screen-xl mx-auto  flex justify-between items-start gap-x-10">
        <div className="w-3/4">
          <div className="  grid grid-cols-20 place-items-center gap-y-5 py-10">
            {seats.map((item, index) => (
              <div key={index} className="text-white ">
                <MdOutlineChair
                  key={index}
                  onClick={() => handleClick(index)}
                  className={`text-4xl rounded-2xl transition ${
                    selectedIndices.includes(index)
                      ? "bg-primaryColor text-white"
                      : " text-white"
                  } hover:text-smallColor active:text-backgroundColor  p-1`}
                />
              </div>
            ))}
          </div>
          <div className="pb-10 mt-10">
            <div className="w-full border-b-8 py-5 rounded-full capitalize  border-primaryColor text-white text-center font-primarySemi text-2xl">
              Screen this way
            </div>
          </div>
        </div>
        <div className="mt-12 h-auto w-1/4 bg-backgroundColor rounded-xl shadow-slate-800 shadow-md text-white px-3 py-5">
          <h1 className="font-primaryLight text-3xl text-primaryColor">
            Booking Summary
          </h1>
          <h2 className="font-primarySemi text-2xl capitalize mt-5">
            {theaterDetails.theaterName}
          </h2>
          <p className="font-primaryLight  text-sm mt-2">
            {theaterDetails.theaterAddress}
          </p>
          {selectedIndices.length > 0 && (
            <div>
              <div className="flex justify-between items-center mt-5 overflow-y-auto">
                <h2 className="font-primaryBold text-2xl capitalize">seats</h2>
                <p className="flex gap-2 ">
                  {selectedIndices.map((item, index) => (
                    <p
                      key={index}
                      className="  px-2 bg-primaryColor font-primaryRegular text-lg rounded-lg"
                    >
                      {item}
                    </p>
                  ))}
                </p>
              </div>
              <div className="flex justify-between items-baseline">
                <h2 className="font-primaryBold text-2xl capitalize mt-5">
                  Total
                </h2>
                <p className="  px-2  font-primaryRegular text-xl ">
                  {total}.00
                </p>
              </div>
              <button
                onClick={handleCheckOut}
                className="w-full h-10 mt-6 capitalize focus:outline-none text-xl text-white bg-buttonColor hover:bg-purple-800  focus:ring-purple-300 font-medium rounded-lg  px-4 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 font-primaryBold "
              >
                checkout {total}.00
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSeats;
