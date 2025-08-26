import { useState } from "react";

const farmingSchemes = [
  { name: "PM-KISAN", purpose: "₹6,000 per year to small & marginal farmers.", gender: "All", income: "<2Lakh", last_date: "2025-12-31", website: "https://pmkisan.gov.in" },
  { name: "Mahila Kisan Yojana", purpose: "Empowers women farmers with skill training & aid.", gender: "Female", income: "<2Lakh", last_date: "2025-08-20", website: "https://nrlm.gov.in" },
  { name: "Fasal Bima Yojana", purpose: "Crop insurance against disasters & pests.", gender: "All", income: "2-5Lakh", last_date: "2025-07-10", website: "https://pmfby.gov.in" },
  { name: "Agri-Tech Scheme", purpose: "Supports AI, IoT & drone tech for farming.", gender: "Male", income: "5+Lakh", last_date: "2025-06-15", website: "https://agricoop.gov.in" },
  { name: "Pradhan Mantri Krishi Sinchayee Yojana", purpose: "Irrigation development and water use efficiency.", gender: "All", income: "All", last_date: "2025-09-30", website: "https://pmksy.gov.in" }
];

export default function FarmingSchemes() {
  const [filters, setFilters] = useState({ gender: "", income: "", startDate: "", endDate: "" });
  
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  
  const filteredSchemes = farmingSchemes.filter(scheme => {
    const genderMatch = !filters.gender || filters.gender === "All" || scheme.gender === filters.gender;
    const incomeMatch = !filters.income || scheme.income === filters.income;
    const schemeDate = new Date(scheme.last_date);
    const startDateMatch = !filters.startDate || schemeDate >= new Date(filters.startDate);
    const endDateMatch = !filters.endDate || schemeDate <= new Date(filters.endDate);
    return genderMatch && incomeMatch && startDateMatch && endDateMatch;
  });

  return (
    <div className="p-6 bg-transparent min-h-screen">
      <h1 className="text-4xl text-center text-white tracking-widest font-bold mb-6">Farming Government Schemes</h1>
      
      <div className=" p-4  text-black rounded-lg shadow-md flex flex-wrap gap-4 justify-center">
        <input type="date" name="startDate" onChange={handleChange} className="p-2 border rounded" />
        <input type="date" name="endDate" onChange={handleChange} className="p-2 border rounded" />
        <select name="gender" onChange={handleChange} className="p-2 border rounded">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="All">All</option>
        </select>
        <select name="income" onChange={handleChange} className="p-2 border rounded">
          <option value="">Select Income</option>
          <option value="<2Lakh">Less than 2 Lakh</option>
          <option value="2-5Lakh">2 to 5 Lakh</option>
          <option value="5+Lakh">More than 5 Lakh</option>
        </select>
      </div>
      
      <div className="mt-6 flex flex-wrap justify-center gap-6">
        {filteredSchemes.length === 0 ? (
          <p className="text-center text-black">No schemes found</p>
        ) : (
          filteredSchemes.map((scheme, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md w-80">
              <h2 className="text-lg font-bold text-black">{scheme.name}</h2>
              <p className="text-black"><strong>Purpose:</strong> {scheme.purpose}</p>
              <p className="text-black"><strong>Gender:</strong> {scheme.gender}</p>
              <p className="text-black"><strong>Income:</strong> {scheme.income}</p>
              <p className="text-black"><strong>Last Date:</strong> {scheme.last_date}</p>
              <a href={scheme.website} target="_blank" className="text-black font-bold">Official Website</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
