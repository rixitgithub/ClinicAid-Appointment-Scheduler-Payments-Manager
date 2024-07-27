import React, { useState, useEffect } from "react";
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
        const response = await searchClinics(query);
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
    <div className="hero min-h-screen bg-base-200 flex flex-col items-center">
      
      {/* Existing Content */}
      <div className="hero-content text-center mt-20">
        <div className="mt-20">
          <h1 className="text-4xl md:text-7xl font-bold">
            FIRST AID TO YOUR CLINIC
          </h1>
          <p className="py-6">
            Effortlessly manage appointments, referrals, and payments with
            ClinicAid: your all-in-one clinic management solution.
          </p>
          <div className="relative flex justify-center items-center space-x-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Name of the Clinic"
              className="input input-bordered w-24 md:w-auto"
            />
            <Link to={`/${selectedClinicId}/overview`}>
              <button className="btn btn-primary">Get Started</button>
            </Link>

            {loading && (
              <div className="absolute top-12 left-0 right-0 bg-white shadow-lg rounded-lg z-10">
                <span className="loading loading-bars loading-md"></span>
              </div>
            )}
            {noClinicFound && (
              <div className="absolute top-12 left-0 right-0 bg-white shadow-lg rounded-lg z-10">
                <p>No clinic found. Try another name.</p>
              </div>
            )}
            {suggestions.length > 0 && !loading && (
              <div className="absolute top-12 left-0 right-0 bg-white shadow-lg rounded-lg z-10">
                <ul>
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion._id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.name} , {suggestion.address}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mb-7"></div>
      <div className="mb-7"></div>
      <div className="mb-7"></div>
      <div className="mb-7"></div>
      <div className="mb-7"></div>
      <div className="mb-7"></div>
    </div>
  );
};

export default MainHero;
