import { Link } from "react-router-dom";

// import {}
const Header2 = () => {
  return (
    <div className="flex items-center px-20 pt-5  justify-between bg-gradient-to-b from-[#1f1f20] to-[#212020] py-4">
      <div className="flex   items-center  w-1/2 justify-between ">
        <Link
          to="/home"
          className="text-primaryColor font-primaryBlack text-6xl"
        >
          BookTix .{" "}
          <span className="text-white text-5xl font-primarySemi">
            business{" "}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header2;
