import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./../../config";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== retypePassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log("yes");

      const { data } = await axios.post(
        `${BASE_URL}/business/signup`,

        {
          email: email,
          password: password,
        },
        config
      );
      setLoading(false);
      console.log(data);
      navigate("/business");
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
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="h-screen bg-[#F2F2F2]">
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white py-10 px-5 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-lg">
          <h1 className="mr-24 mb-5 text-6xl font-primaryBold text-primaryColor text-left">
            Sign <span className="text-black ">up.</span>
          </h1>
          <form className="mt-10" onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              className="block text-2xl capitalize font-primaryRegular mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-1 py-1 outline-none shadow-[inset_-12px_-8px_40px_#46464620] text-xl font-primaryRegular"
              required
            />
            <label
              htmlFor="password"
              className="block mt-3 text-2xl capitalize font-primaryRegular mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-1 py-1 outline-none shadow-[inset_-12px_-8px_40px_#46464620] text-xl font-primaryRegular"
              required
            />
            <label
              htmlFor="retype-password"
              className="block mt-3 text-2xl capitalize font-primaryRegular mb-2"
            >
              Re-type Password
            </label>
            <input
              type="password"
              id="retype-password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              className="w-full px-1 py-1 outline-none shadow-[inset_-12px_-8px_40px_#46464620] text-xl font-primaryRegular"
              required
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
              type="submit"
              className="mt-5 focus:outline-none text-white w-full bg-buttonColor hover:bg-purple-800 focus:ring-purple-300 font-medium rounded-lg text-lg px-4 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 font-primaryBold"
            >
              {loading ? <Loading /> : "Register"}
            </button>
          </form>
          <p className="mt-5 text-center text-xl font-primaryRegular">
            Already have an account?{" "}
            <Link
              to="/business"
              className="font-primaryBold text-purple-500 hover:text-purple-800 transition"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
