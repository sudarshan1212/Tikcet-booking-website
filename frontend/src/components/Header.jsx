import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { Link, NavLink } from "react-router-dom";
import { BASE_URL } from "../../config";
import toast from "react-hot-toast";
import { FaRegUserCircle } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import Loading from "./Loading";
import { addUsers, removeUsers } from "../redux/bookingSlice";
const Header = () => {
  const [popUp, setPopUp] = useState(false);
  const [popUpOTP, setPopUpOTP] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.booking.user);
  // console.log(userInfo);
  const [email, setemail] = useState("");
  const [userId, setUserID] = useState("");
  const [accountPopup, setAccountPopup] = useState(false);
  // const [profilePopup, setprofilePopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/users`,
        {
          email,
        },
        config
      );
      // homekraft12@gmail.com
      // console.log(data);

      if (data.Status == "PENDING") {
        setPopUpOTP(true);
        setUserID(data.data.userID);
      } else {
        setPopUp(false);
        dispatch(
          addUsers({
            email: data.data.email,
          })
        );
        setAccountPopup(false);
        setUserID(data.data.userID);
      }

      setLoading(false);
      toast.success(data.message, {
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
    } catch (error) {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error(error.response.data.message);
      }
      setLoading(false);
    }
  };
  const submitOTPHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(userId, otp);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = await axios.post(
        `${BASE_URL}/users/verifyOTP`,
        {
          userId,
          otp,
        },
        config
      );
      console.log(data.data.users.email);
      dispatch(
        addUsers({
          email: data.data.users.email,
        })
      );
      console.log("fininsh");

      setPopUp(false);
      setPopUpOTP(false);
      setLoading(false);
      setAccountPopup(false);
      toast.success(data.data.message, {
        style: {
          border: "1px solid #71757F",
          padding: "16px 20px",
          width: "300px",
          color: "#ffffff",
          background: "#141414",
          fontSize: "20px",
        },
        iconTheme: {
          primary: "green",
          secondary: "#FFFAEE",
        },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  const signOut = () => {
    dispatch(removeUsers());
    toast.success("Bye", {
      style: {
        border: "1px solid #71757F",
        padding: "16px 20px",
        width: "300px",
        color: "#ffffff",
        background: "#141414",
        fontSize: "20px",
      },
      iconTheme: {
        primary: "green",
        secondary: "#FFFAEE",
      },
    });
  };
  const navLinks = [
    { path: "/home", display: "Home" },
    { path: "/movies", display: "Movies" },
    { path: "/business", display: "Business" },
  ];
  const forAccount = () => {
    setAccountPopup(!accountPopup);
  };
  const toggleRef = useRef(null);
  const handleClickOutside = (event) => {
    if (toggleRef.current && !toggleRef.current.contains(event.target)) {
      setAccountPopup(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex items-center px-20 pt-5  justify-between bg-gradient-to-b from-[#1f1f20] to-[#212020] py-4">
      <div className="flex   items-center  w-1/2 justify-between ">
        <Link
          to="/home"
          className="text-primaryColor font-primaryBlack text-6xl"
        >
          BookTix .
        </Link>
        <div className="flex ">
          <ul className="flex gap-x-8">
            {navLinks.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className="text-white font-primarySemi text-2xl hover:text-[#d1d0d0] duration-100 "
                >
                  {" "}
                  {item.display}
                </NavLink>
              </li>
            ))}{" "}
          </ul>
        </div>
      </div>

      <div>
        {userInfo == null ? (
          <button
            type="button"
            onClick={() => setPopUp(true)}
            className="focus:outline-none text-white  bg-buttonColor hover:bg-purple-800  focus:ring-purple-300 font-medium rounded-lg text-lg px-4 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 font-primaryBold "
          >
            Login
          </button>
        ) : (
          <div ref={toggleRef}>
            <button
              onClick={forAccount}
              className="focus:outline-none text-white  bg-buttonColor hover:bg-purple-800  focus:ring-purple-300 font-medium rounded-lg text-lg px-4 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 font-primaryBold"
            >
              <FaRegUserCircle className="text-3xl" />
            </button>
            {accountPopup && (
              <div className="w-56  -right-0 mx-5 h-auto absolute mt-1 rounded-lg shadow-lg flex  justify-center items-center flex-col z-10 bg-backgroundColor">
                <div className="flex w-full items-center  py-4 p justify-center gap-2 0  h-full hover:bg-[#333131]">
                  <FaRegUserCircle className="text-white  text-center text-2xl" />
                  <p className="font-primaryLight text-white text-center  text-xl">
                    Your Account
                  </p>
                </div>
                <div className="flex w-full items-center py-4 justify-center group  hover:text-white duration-100  gap-2 hover:bg-opacity-3   h-full hover:bg-red-500 ">
                  <PiSignOutBold className="text-white  text-center text-2xl" />
                  <p
                    onClick={signOut}
                    className="font-primarySemi text-red-500 text-center group-hover:text-white  text-xl"
                  >
                    Signout
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {popUp && (
        <div className="fixed top-0 left-0 w-full  h-full bg-black/50 flex items-start justify-center  z-30">
          <div className="max-w-lg  relative  bg-backgroundColor mt-48 p-10 h-atuo w-full rounded-3xl  shadow-mg">
            <button
              onClick={() => setPopUp(false)}
              id="closebutton"
              className=" absolute    text-5xl right-5 top-5 text-gray-600"
            >
              <IoClose className="  w-10 h-10 hover:rotate-90 duration-150 delay-75" />
            </button>
            <div className="mt-8">
              <h2 className=" text-3xl font-primarySemi text-primaryColor mt-2">
                Log in or sign up to book
              </h2>
              {!popUpOTP && (
                <form onSubmit={submitHandler}>
                  <div className=" border-smallColor border-b px-3  mt-8 ">
                    <input
                      className="w-full outline-none bg-transparent  text-lg text-white"
                      type="email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      placeholder="Enter Your Gmail"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    // onClick={}
                    className="w-full h-10 mt-6 focus:outline-none text-xl text-white bg-buttonColor hover:bg-purple-800  focus:ring-purple-300 font-medium rounded-lg  px-4 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 font-primaryBold "
                  >
                    {loading ? <Loading className="text-lg" /> : "Continue"}
                  </button>
                </form>
              )}

              {popUpOTP && (
                <form onSubmit={submitOTPHandler}>
                  <div className=" border-smallColor border-b px-3 p rounded- mt-8 ">
                    <input
                      className="w-full outline-none bg-transparent py-1 text-lg text-white"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter Your OTP"
                      required
                    />
                  </div>
                  <div className="flex gap-10">
                    {/* <button type="button"></button> */}
                    <button
                      onClick={() => {
                        setPopUpOTP(false);
                      }}
                      type="button"
                      className="w-full h-10 mt-6 focus:outline-none text-xl text-white bg-buttonColor hover:bg-purple-800  focus:ring-purple-300 font-medium rounded-lg  px-4 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 font-primaryBold "
                    >
                      Back
                    </button>
                    <button
                      // onClick={() => {
                      //   setPopUp(false);
                      // }}
                      type="submit"
                      className="w-full h-10 mt-6 focus:outline-none text-xl text-white bg-buttonColor hover:bg-purple-800  focus:ring-purple-300 font-medium rounded-lg  px-4 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 font-primaryBold "
                    >
                      {loading ? <Loading /> : "Submit"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
