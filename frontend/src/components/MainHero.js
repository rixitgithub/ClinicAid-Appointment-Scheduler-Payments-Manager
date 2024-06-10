import React, { useState } from "react";
import { Link } from "react-router-dom";
import useClinicAPI from "../api/useClinicAPI";

const MainHero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { searchClinics } = useClinicAPI();
  const [loading, setLoading] = useState(false);
  const [noClinicFound, setNoClinicFound] = useState(false);
  const [selectedClinicId, setSelectedClinicId] = useState(null);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 1) {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await searchClinics(query, token);
        if (response.length === 0) {
          setNoClinicFound(true);
        } else {
          setNoClinicFound(false);
        }
        setSuggestions(response);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setSuggestions([]);
    setSelectedClinicId(suggestion._id); // Update selected clinic ID
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      {/* Comparison Section */}
      <div className="diff aspect-[16/9] w-full mb-8">
        <div className="diff-item-1 relative w-1/2 h-full bg-gray-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-primary text-primary-content text-3xl md:text-9xl font-black grid place-content-center p-4">
              SAD & TIRING
              <p className="text-lg md:text-2xl mt-4">
                Manual Appointment Management
              </p>
            </div>
          </div>
        </div>
        <div className="diff-item-2 relative w-1/2 h-full bg-white">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-green-500 text-white text-3xl md:text-9xl font-black grid place-content-center p-4">
              HAPPY & FAST
              <p className="text-lg md:text-2xl mt-4">
                Effortless Clinic Management
              </p>
            </div>
          </div>
        </div>
        <div className="diff-resizer absolute inset-y-0 left-1/2 w-1 bg-gray-400"></div>
      </div>
    </div>
  );
};

export default MainHero;
