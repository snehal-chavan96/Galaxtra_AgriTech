import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Video, Phone, MapPin } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import VideoCallPage from "./VideoCallPage";

const experts = [
  {
    id: 1,
    name: "Dr. Rajesh Sharma",
    expertise: "Soil & Crop Health",
    rating: 4.8,
    charges: { video: 500, voice: 300, field: 1000 },
    image:
      "https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFybWVyfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    name: "Ms. Priya Verma",
    expertise: "Organic Farming",
    rating: 4.7,
    charges: { video: 600, voice: 350, field: 1200 },
    image:
      "https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFybWVyfGVufDB8fDB8fHww",
  },
  {
    id: 3,
    name: "Dr. Anand Kumar",
    expertise: "Irrigation & Water Management",
    rating: 4.9,
    charges: { video: 450, voice: 250, field: 900 },
    image:
      "https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFybWVyfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    name: "Dr. Meera Iyer",
    expertise: "Pest Control & Disease Management",
    rating: 4.6,
    charges: { video: 550, voice: 400, field: 1100 },
    image:
      "https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFybWVyfGVufDB8fDB8fHww",
  },
  {
    id: 5,
    name: "Mr. Arvind Desai",
    expertise: "Agricultural Machinery & Automation",
    rating: 4.5,
    charges: { video: 500, voice: 300, field: 950 },
    image:
      "https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFybWVyfGVufDB8fDB8fHww",
  },
  {
    id: 6,
    name: "Ms. Sunita Patel",
    expertise: "Dairy & Animal Husbandry",
    rating: 4.7,
    charges: { video: 650, voice: 400, field: 1300 },
    image:
      "https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFybWVyfGVufDB8fDB8fHww",
  },
  {
    id: 7,
    name: "Dr. Ramesh Yadav",
    expertise: "Hydroponics & Vertical Farming",
    rating: 4.9,
    charges: { video: 700, voice: 500, field: 1400 },
    image:
      "https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFybWVyfGVufDB8fDB8fHww",
  },
  {
    id: 8,
    name: "Ms. Neha Thakur",
    expertise: "Seed Quality & Plantation Techniques",
    rating: 4.6,
    charges: { video: 600, voice: 350, field: 1200 },
    image:
      "https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFybWVyfGVufDB8fDB8fHww",
  },
  {
    id: 9,
    name: "Dr. Sandeep Bhosale",
    expertise: "Greenhouse Farming",
    rating: 4.8,
    charges: { video: 550, voice: 300, field: 1050 },
    image:
      "https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFybWVyfGVufDB8fDB8fHww",
  },
  {
    id: 10,
    name: "Mr. Vikram Rao",
    expertise: "Market & Supply Chain Management",
    rating: 4.7,
    charges: { video: 500, voice: 350, field: 950 },
    image:
      "https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFybWVyfGVufDB8fDB8fHww",
  },
];



const ExpertHelp = () => {
  const navigate = useNavigate();
  const [selectedExpert, setSelectedExpert] = useState(null);

  const handleConsultation = (expert, mode) => {
    alert(
      `You selected ${expert.name} for a ${mode} consultation.\nCharge: ₹${expert.charges[mode]}`
    );
  };

  const handleVideoCall = (expert) => {
    navigate(`/video-call/${expert.name.replace(/\s+/g, "-")}`);
  };

  return (
    <div className="p-6 min-h-screen relative z-10 flex flex-col items-center">
      <h2 className="text-4xl tracking-widest font-bold text-center mb-6 text-gray-100">
        EXPERT'S HELP
      </h2>
      <p className="text-center text-gray-100 mb-6">
        Choose an expert based on expertise, ratings, and consultation charges.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
        {experts.map((expert) => (
          <div
            key={expert.id}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center"
          >
            <img
              src={expert.image}
              alt={expert.name}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="text-lg font-bold">{expert.name}</h3>
            <p className="text-gray-600">{expert.expertise}</p>
            <p className="text-yellow-500 font-semibold">⭐ {expert.rating}</p>

            <div className="mt-4 w-full">
              <p className="font-bold text-gray-800 text-sm mb-2">
                Consultation Charges:
              </p>
              <div className="flex justify-between w-full">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded flex items-center"
                  onClick={() => handleVideoCall(expert)}
                >
                  <Video size={16} className="mr-1" /> ₹{expert.charges.video}
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded flex items-center"
                  onClick={() => handleConsultation(expert, "voice")}
                >
                  <Phone size={16} className="mr-1" /> ₹{expert.charges.voice}
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
                  onClick={() => handleConsultation(expert, "field")}
                >
                  <MapPin size={16} className="mr-1" /> ₹{expert.charges.field}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertHelp;
