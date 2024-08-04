import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uplaodImageToCloudinary from "../utils/uploadCloudinary";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../config";

const CreateShow = () => {
  const [formData, setFormData] = useState({
    location: "",
    category: "theater",
    showName: "",
    image: "",
    seat: "",
    address: "",
    time: "",
    cancellation: false,
    food: false,
  });
  const userInfo = useSelector((state) => state.booking.businessUser);
  console.log(userInfo);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleChange = async (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files[0];
      const data = await uplaodImageToCloudinary(file);
      setFormData((prevData) => ({
        ...prevData,
        image: data.url,
      }));
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      console.log("yes");
      console.log(userInfo);
      

      const { data } = await axios.post(
        `${BASE_URL}/show/create`,
        {
          // user: userInfo.id,
          location: formData.location,
          category: formData.category,
          showName: formData.showName,
          image: formData.image,
          seat: formData.seat,
          address: formData.address,
          time: formData.time, // Ensure correct naming here
          cancellation: formData.cancellation, // Ensure consistent naming here
          food: formData.food, // Ensure consistent naming here
        },
        config
      );

      toast.success(data.Status);
      navigate("/business/yourshow");
    } catch (error) {
      setLoading(false);
      console.log(error);

      toast.error(error.response.data.message || "something went wrong");
    }
    // Validate and process formData here
    console.log("Form Data:", formData);
  };
  return (
    <div className="h-auto bg-[#F2F2F2]">
      <div className="max-w-screen-sm mx-auto py-10">
        <h1 className="mr-24 mb-5 text-6xl font-primaryBold text-primaryColor text-left">
          create your <span className="text-black "> show .</span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mt-6 h-full  py-10 px-5 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-lg"
        >
          <div>
            <label
              htmlFor="location"
              className="block text-2xl capitalize font-thin mb-2 mt-3"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-1 py-1 outline-none border-2 focus:border-primaryColor rounded-lg  shadow-[inset_-52px_-28px_40px_#46464620] text-xl font-primaryRegular"

              // className="w-full px-1 py-1 mt- outline-none shadow-[inset_-12px_-8px_40px_#46464620] text-xl font-primaryRegular"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-2xl capitalize font-thin mb-2 mt-6"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-1 py-1 outline-none border-2 focus:border-primaryColor rounded-lg  shadow-[inset_-52px_-28px_40px_#46464620] text-xl font-primaryRegular"
            >
              <option value="theater">Theater</option>
              <option value="concert">Concert</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="showName"
              className="block text-2xl capitalize font-thin mb-2 mt-6"
            >
              Show Name
            </label>
            <input
              type="text"
              name="showName"
              id="showName"
              value={formData.showName}
              onChange={handleChange}
              required
              className="w-full px-1 py-1 outline-none border-2 focus:border-primaryColor rounded-lg  shadow-[inset_-52px_-28px_40px_#46464620] text-xl font-primaryRegular"
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-2xl capitalize font-thin mb-2 mt-6"
            >
              Image URL
            </label>
            <input
              type="file"
              name="image"
              accept=".jpg,.jpeg,.png"
              id="image"
              onChange={handleChange}
              required
              className="w-full px-1 py-1 outline-none shadow-[inset_-12px_-8px_40px_#46464620] text-xl font-primaryRegular"
            />
          </div>
          <div>
            <label
              htmlFor="seat"
              className="block text-2xl capitalize font-thin mb-2 mt-6"
            >
              Number of Seats
            </label>
            <input
              type="number"
              name="seat"
              id="seat"
              value={formData.seat}
              onChange={handleChange}
              required
              className="w-full px-1 py-1 outline-none shadow-[inset_-12px_-8px_40px_#46464620] text-xl font-primaryRegular"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-2xl capitalize font-thin mb-2 mt-6"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-1 py-1  outline-none border-2 focus:border-primaryColor rounded-lg  shadow-[inset_-52px_-28px_40px_#46464620] text-xl font-primaryRegular"
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-2xl capitalize font-thin mb-2 mt-6"
            >
              Time
            </label>
            <input
              type="time"
              name="time"
              id="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-1 py-1 outline-none border-2 focus:border-primaryColor rounded-lg  shadow-[inset_-52px_-28px_40px_#46464620] text-xl font-primaryRegular"
            />
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="cancellation"
              id="cancellation"
              checked={formData.cancellation}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <label htmlFor="cancellation" className="text-xl">
              Cancellation
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="food"
              id="food"
              checked={formData.food}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <label htmlFor="food" className="text-xl">
              food & beverage
            </label>
          </div>

          <button
            type="submit"
            className="mt-10 bg-black t focus:outline-none text-white w-full bg-buttonColor hover:bg-purple-800 focus:ring-purple-300 font-medium rounded-lg text-lg px-4 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 font-primaryBold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateShow;
