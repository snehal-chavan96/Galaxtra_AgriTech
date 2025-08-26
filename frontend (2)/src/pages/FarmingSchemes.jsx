import React, { useState } from "react";

const farmingSchemes = [
  { name: "PM-KISAN", purpose: "₹6000 per year to small & marginal farmers.", gender: "All", income: "<2Lakh", last_date: "2025-12-31", website: "https://pmkisan.gov.in" },
  { name: "Mahila Kisan Yojana", purpose: "Empowers women farmers with skill training & aid.", gender: "Female", income: "<2Lakh", last_date: "2025-08-20", website: "https://nrlm.gov.in" },
  { name: "Fasal Bima Yojana", purpose: "Crop insurance against disasters & pests.", gender: "All", income: "2-5Lakh", last_date: "2025-07-10", website: "https://pmfby.gov.in" },
  { name: "Agri-Tech Scheme", purpose: "Supports AI, IoT & drone tech for farming.", gender: "Male", income: "5+Lakh", last_date: "2025-06-15", website: "https://agricoop.gov.in" },
  { name: "Pradhan Mantri Krishi Sinchayee Yojana", purpose: "Irrigation development and water use efficiency.", gender: "All", income: "All", last_date: "2025-09-30", website: "https://pmksy.gov.in" }
];

const FarmingSchemes = () => {
  const [filters, setFilters] = useState({
    gender: "",
    income: "",
    startDate: "",
    endDate: ""
  });
  
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredSchemes = farmingSchemes.filter((scheme) => {
    const genderMatch = filters.gender === "" || filters.gender === "All" || scheme.gender === filters.gender;
    const incomeMatch = filters.income === "" || scheme.income === filters.income;
    const schemeDate = new Date(scheme.last_date);
    const startDateMatch = !filters.startDate || schemeDate >= new Date(filters.startDate);
    const endDateMatch = !filters.endDate || schemeDate <= new Date(filters.endDate);
    return genderMatch && incomeMatch && startDateMatch && endDateMatch;
  });

  return (
    <div style={{ padding: "20px", background: "#f4f4f4" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>Farming Government Schemes</h1>
      
      <div className="filter-container" style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", padding: "15px", background: "white", borderRadius: "10px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", marginBottom: "20px" }}>
        <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
        <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
        <select name="gender" value={filters.gender} onChange={handleFilterChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="All">All</option>
        </select>
        <select name="income" value={filters.income} onChange={handleFilterChange}>
          <option value="">Select Income</option>
          <option value="<2Lakh">Less than 2 Lakh</option>
          <option value="2-5Lakh">2 to 5 Lakh</option>
          <option value="5+Lakh">More than 5 Lakh</option>
        </select>
      </div>

      <div className="scheme-container" style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
        {filteredSchemes.length === 0 ? (
          <p style={{ textAlign: "center" }}>No schemes found</p>
        ) : (
          filteredSchemes.map((scheme, index) => (
            <div key={index} className="scheme-card" style={{ background: "white", padding: "15px", borderRadius: "8px", boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)", width: "300px" }}>
              <h2 style={{ color: "#2980b9" }}>{scheme.name}</h2>
              <p><strong>Purpose:</strong> {scheme.purpose}</p>
              <p><strong>Gender:</strong> {scheme.gender}</p>
              <p><strong>Income:</strong> {scheme.income}</p>
              <p><strong>Last Date:</strong> {scheme.last_date}</p>
              <a href={scheme.website} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: "10px", color: "#27ae60", textDecoration: "none", fontWeight: "bold" }}>Official Website</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FarmingSchemes;
