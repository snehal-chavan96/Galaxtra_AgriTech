import React from "react";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center text-center">
      {/* Dark Overlay */}
      <div className="relative z-10 p-6 text-white">
        <h1 className="text-6xl font-light tracking-widest mt-20 my-10">
          Grow Smarter, Farm Better!
        </h1>
        <p className="mt-4 text-2xl text-center ">
          Empowering Farmers with AI & Digital Innovation
        </p>

        {/* <div className="mt-10 flex space-x-4">
          <Link
            to="/chatbot"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition"
          >
            Chatbot
          </Link>
          <Link
            to="/community"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition"
          >
            Community
          </Link>
          <Link
            to="/expert"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg shadow-lg transition"
          >
            Expert Help
          </Link>
        </div> */}

        {/* DJI Agras T50 Card */}
        <div className="flex flex-row justify-between w-full gap-20 mt-14">
          <Link to="/chatbot" className="">
            <div className="mt-10 bg-[#F7F5EF] p-6  rounded-l-full rounded-2xl shadow-lg flex items-center max-w-2xl mx-auto relative h-80 transform transiction-all hover:scale-105 ease-in-out duration-500  hover:shadow-green-400 hover:shadow-xl">
              {/* Image Section */}
              <div className="rounded-full overflow-hidden w-80 h-72">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="DJI Agras T50"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="ml-6 w-80 text-left">
                <h3 className="text-2xl font-bold text-gray-900">
                  How Can I help You...
                </h3>
                <p className="text-gray-600 mt-2  ">
                  AI-powered chatbot providing instant farming support and
                  expert advice in your local language.
                </p>

                <Link
                  to="/chatbot"
                  className="mt-4 inline-block px-4 mx-10 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition"
                >
                  Get help of AI
                </Link>
              </div>

              {/*// Arrow Button
              <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full">
                ➜
              </div> */}
            </div>
          </Link>

          <Link to="/community" className="">
            <div className="mt-10 bg-[#F7F5EF] p-6 rounded-r-full shadow-lg flex items-center max-w-2xl mx-auto relative h-80 transform transiction-all hover:scale-105 ease-in-out duration-500  hover:shadow-green-400 hover:shadow-xl">
              {/* Content Section */}
              <div className="ml-6 text-left w-80">
                <h3 className="text-2xl font-bold text-gray-900">
                  Join Community...
                </h3>
                <p className="text-gray-600 mt-2">
                  Connect with farmers and experts to share experiences and
                  receive real-time advice.
                </p>
                <Link
                  to="/community"
                  className="mt-4 inline-block  px-4 py-2 mx-10 border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition"
                >
                  Join Community
                </Link>
              </div>
              {/* Image Section */}
              <div className="rounded-full overflow-hidden w-80 h-72">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="DJI Agras T50"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Arrow Button */}
              {/* <div className="hover:bg-green-600 cursor-pointer absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full">
                ➜
              </div> */}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
