import React from "react";

import { useState } from "react";

const Notifications = () => {
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
    <>
      <button
        onClick={toggleSidebar}
        className="  ml-[1730px] p-3 fixed z-10 bg-gray-200 rounded-full shadow-md"
      >
        🔔
      </button>
      {/* Sidebar */}
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
    </>
  );
};

export default Notifications;
