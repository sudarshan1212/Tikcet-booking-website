import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Home from "../pages/Home";
import Movies from "../pages/Movie";
import Cinema from "../pages/Cinema";
import SingleMovie from "../pages/SingleMovie";

// import "locomotive-scroll/dist/locomotive-scroll.css";
import ScrollToTop from "./../components/Home/ScrollToTop";
import BookSeats from "../pages/BookSeats";
import Checkout from "../pages/Checkout";
import Header2 from "./../components/Header2";
import Register from "../pages/Register";
import CreateShow from "./../pages/CreateShow";
import YourShow from "../pages/YourShow";
const Layout = () => {
  const location = useLocation();
  const showHeader2 =
    location.pathname === "/business" ||
    location.pathname === "/business/createshow" ||
    location.pathname === "/business/yourshow" ||
    location.pathname === "/business/register";
  return (
    <>
      {showHeader2 ? <Header2 /> : <Header />}
      <ScrollToTop />

      <Routes>
        <Route path="/business" element={<Cinema />} />
        <Route path="/business/register" element={<Register />} />
        <Route path="/business/createshow" element={<CreateShow />} />
        <Route path="/business/yourshow" element={<YourShow />} />
      </Routes>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<SingleMovie />} />
          <Route path="/movies/:id/bookseats" element={<BookSeats />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

export default Layout;
