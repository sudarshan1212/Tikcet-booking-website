import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { businessAddUsers } from "../redux/bookingSlice";

const Cinema = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/business`,
        { email, password },
        config
      );
      dispatch(
        businessAddUsers({
          email: data.data.email,
          token: data.data.token,
        })
      );
      setLoading(false);
      console.log(data);

      navigate("/business/createshow");
      toast.success("Welcome", {
        style: {
          border: "1px solid #71757F",
          padding: "16px 20px",
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
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="h-screen bg-[#F2F2F2]">
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white py-10 px-5 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-lg">
          <h1 className="mr-24 mb-5 text-6xl font-primaryBold text-primaryColor text-left">
            Welcome <span className="text-black block">back.</span>
          </h1>
          <form className="mt-10" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-2xl capitalize font-primaryRegular mb-2"
              >
                email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-1 py-1 outline-none shadow-[inset_-12px_-8px_40px_#46464620] text-xl font-primaryRegular"
              />
              <label
                htmlFor="password"
                className="block text-2xl capitalize font-primaryRegular mb-2"
              >
                password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-1 py-1 outline-none shadow-[inset_-12px_-8px_40px_#46464620] text-xl font-primaryRegular"
              />
            </div>
            <button
              type="submit"
              className="mt-5 focus:outline-none text-white w-full bg-buttonColor hover:bg-purple-800 focus:ring-purple-300 font-medium rounded-lg text-lg px-4 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 font-primaryBold"
            >
              {loading ? <Loading /> : "Login"}
            </button>
          </form>
          <p className="mt-5 text-center text-xl font-primaryRegular">
            Don&apos;t have an account?{" "}
            <Link
              to="/business/register"
              className="font-primaryBold text-purple-500 hover:text-purple-800 transition"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cinema;
