import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const theaterDetails = useSelector((state) => state.booking.checkout);
  const theaterDetail = useSelector((state) => state.booking.theaterDetails);
  const navogate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    if (cardNumber.length < 12) {
      newErrors.cardNumber =
        "Card number must be in the format 1234 5678 9012 3456";
    }
    // Validate Expiry Date
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = "Expiry date must be in the format MM/YY";
    }

    // Validate CVV
    if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }

    if (Object.keys(newErrors).length === 0) {
      // Process form submission
      toast.success("Ticket send through mail", {
        style: {
          border: "1px solid #71757F",
          padding: "16px 20px",
          // width: "300px",
          color: "#ffffff",
          background: "#141414",
          fontSize: "20px",
        },
        iconTheme: {
          primary: "green",
          secondary: "#FFFAEE",
        },
      });
      navogate("/");
    } else {
      setErrors(newErrors);
      toast.error("Payment Unsuccessfull");
      //   toast.error(errors);
    }
  };

  return (
    <div className="bg-black h-screen">
      <div className="max-w-screen-lg mx-auto flex justify-between items-center gap-x-12 pt-20">
        <div className="w-1/2">
          <div className="ml-3">
            <h2 className="font-primaryBold text-2xl capitalize text-white">
              {theaterDetail.movieName}
            </h2>
            <p className="font-primaryLight text-lg capitalize mt-1 text-white">
              {theaterDetail.theaterName} , {theaterDetail.theaterLocation}
            </p>
          </div>
          <div className="w-72 mt-3">
            <img
              src={theaterDetail.image}
              alt=""
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
        <div className="max-w-md mx-auto w-1/2  p-6 bg-backgroundColor font-primarySemi text-xl rounded-lg shadow-md">
          <h2 className="text-3xl font-primaryBold mb-4 text-primaryColor">
            Credit Card Payment
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="cardNumber"
                className="block text-sm font- text-white  mb-1"
              >
                Card Number
              </label>
              <input
                type="number"
                id="cardNumber"
                name="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.cardNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="expiryDate"
                className="block text-sm font-medium text-white mb-1"
              >
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.expiryDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-white mb-1"
              >
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.cvv ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full h-10 mt-6 capitalize focus:outline-none text-xl text-white bg-buttonColor hover:bg-purple-800  focus:ring-purple-300 font-medium rounded-lg  px-4 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 font-primaryBold "
            >
              Pay {theaterDetails.price} ₹
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
