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
  const [resizerPosition, setResizerPosition] = useState(50); // Initial position in percentage
  const [isDragging, setIsDragging] = useState(false);

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

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const diffElement = document.querySelector(".diff");
    const rect = diffElement.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newPercentage = (offsetX / rect.width) * 100;
    setResizerPosition(newPercentage);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="hero min-h-screen bg-base-200 flex flex-col items-center">
      {/* Comparison Section */}
      <div className="diff aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
        {/* Side with ClinicAid */}
        <div className="diff-item-1 relative w-full h-full">
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-500 text-white text-5xl font-semibold">
            <div className="mb-4">ClinicAid Management</div>
            <div className="text-lg">Effortless & Efficient</div>
            <div className="text-sm mt-2">
              Automated appointments, streamlined schedule
            </div>
          </div>
        </div>
        {/* Side without ClinicAid */}
        {/* Side without ClinicAid */}
        <div className="diff-item-2 relative w-full h-full">
          {/* Arrow and Text */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-6 text-center">
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 animate-bounce mb-2 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
              <p className="text-sm font-semibold text-red-500">
                PULL TO SEE THE MAGIC
              </p>
            </div>
          </div>
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-500 text-white text-5xl font-semibold">
            <div className="mb-4">Manual Management</div>
            <div className="text-lg">Tedious & Inefficient</div>
            <div className="text-sm mt-2">
              Missed appointments, disorganized schedule
            </div>
          </div>
        </div>

        {/* Resizer */}
        <div className="diff-resizer bg-gray-400"></div>
      </div>

      {/* Existing Content */}
      <div className="hero-content text-center">
        <div className="">
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
    </div>
  );
};

export default MainHero;
