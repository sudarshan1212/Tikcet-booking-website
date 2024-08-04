import RiseLoader from "react-spinners/RiseLoader";
// import RingLoader from "react-spinners/RingLoader";
import GridLoader from "react-spinners/GridLoader";

const Loading = () => {
  return (
    <div className=" flex items-center justify-center w-full h-full ">
      <RiseLoader color="#ffffff" size={10} />
    </div>
  );
};
export default Loading;
