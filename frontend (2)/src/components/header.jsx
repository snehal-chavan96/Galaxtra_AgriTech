import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Bell } from "lucide-react";
import { useState } from "react";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const notifications = [
    {
      category: "Expert Talks",
      message: "Live session on smart farming at 5 PM",
    },
    { category: "Reminders", message: "Soil health test due next week" },
    {
      category: "Community Messages",
      message: "Join the discussion on organic farming",
    },
    {
      category: "New Updates",
      message: "Government launched a new subsidy scheme",
    },
  ];

  const categories = [
    "All",
    ...new Set(notifications.map((item) => item.category)),
  ];

  const filteredNotifications =
    selectedCategory === "All"
      ? notifications
      : notifications.filter((item) => item.category === selectedCategory);

  return (
    <div className="flex justify-center flex-row">
      <Link to="/" className="text-[#483e21] mx-4 text-lg">
        <header className="bg-[#F7F5EF]  relative z-10 shadow-inner shadow-gray-500 text-[#483e21] text-2xl font-bold  mt-8 pt-1  flex items-center justify-between px-10  rounded-3xl w-[300px] h-[70px]  mx-2 ml-20 flex-row">
          <div className=" h-20 w-20 mt-8">
            <img
              className="rounded-full"
              src="data:image/jpeg;base64,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"
              alt=""
            />
          </div>
          AgriMitra
        </header>
      </Link>
      <header className="bg-[#F7F5EF] relative z-10 shadow-inner shadow-gray-500 text-white px-6 mt-8  flex items-center justify-between flex-row rounded-full w-[1200px] mx-5">
        <div>
          <Link to="/" className="text-[#483e21] mx-4 text-lg relative group">
            Home
            <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-[#483e21] rounded-2xl mt-1 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="http://localhost:3000/"
            className="text-[#483e21] mx-4 text-lg relative group"
          >
            Community
            <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-[#483e21] transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/expert"
            className="text-[#483e21] mx-4 text-lg relative group"
          >
            Experts Talk
            <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-[#483e21] transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/schemes"
            className="text-[#483e21] mx-4 text-lg relative group"
          >
            Govt Schemes
            <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-[#483e21] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="http://192.168.101.90:8501/"
            className="text-[#483e21] mx-4 text-lg relative group"
          >           
            Image Analysis
            <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-[#483e21] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Search Box */}
        <div>
          <Link to="/chatbot" className="">
            <form className="relative flex items-center">
              <Search className="absolute left-3 text-[#483e21]" size={20} />
              <input
                type="text"
                placeholder="Ask any Agricultural Problems..."
                className="pl-10 pr-4 py-2 w-[400px] text-[#483e21] border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#483e21]"
              />
            </form>
          </Link>
        </div>
      </header>

  
      <header className="bg-[#F7F5EF]  relative z-10 shadow-inner shadow-gray-500  px-6 mt-8 py-5 flex items-center justify-between rounded-full mr-20">
        <div className="flex items-center space-x-3">
          <button onClick={toggleSidebar} className="relative">
            <Bell className="cursor-pointer text-black hover:scale-110 duration-300" />
          </button>
        </div>
      </header>
      <div
        className={`fixed right-0 z-10 h-full w-80 bg-white shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <button className="text-gray-500" onClick={toggleSidebar}>
            ✖
          </button>
        </div>
        <div className="p-4">
          <select
            className="w-full p-2 mb-4 border rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {filteredNotifications.map((item, index) => (
            <div key={index} className="mb-4 p-3 border rounded-lg bg-gray-100">
              <h3 className="text-sm font-semibold text-green-700">
                {item.category}
              </h3>
              <p className="text-gray-700 text-sm">{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
