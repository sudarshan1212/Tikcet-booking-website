const Footer = () => {
  return (
    <div className=" bg-black border-t border-gray-600 py-6">
      <div className="max-w-screen-lg mx-auto my-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-primaryColor font-primaryBlack text-6xl">
              BookTix .
            </h1>
            <p className="text-white font-primaryLight text-3xl">
              Discover movies, book seats easily.
            </p>
          </div>
          <div className=" flex justify-between w-1/3">
            <div className="flex flex-col">
              <h2 className="text-white text-xl font-primaryRegular">
                Community
              </h2>
              <ul className="text-smallColor text-lg mt-2">
                <li className="hover:text-gray-400 duration-100">Twitter</li>
                <li className="hover:text-gray-400 duration-100">Instagram</li>
                <li className="hover:text-gray-400 duration-100">Email</li>
              </ul>
            </div>
            <div>
              <h2 className="text-white text-xl font-primaryRegular">Legal</h2>
              <ul className="text-smallColor text-lg mt-2">
                <li className="hover:text-gray-400 duration-100">
                  Terms of Service
                </li>
                <li className="hover:text-gray-400 duration-100">
                  privacy Policy
                </li>
                <li className="hover:text-gray-400 duration-100">
                  Code Policy
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-smallColor text-lg font-primaryLight text-left mt-16">
          Copyright © 2024 Sudarshan, Inc. All Rights Reserved.{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
