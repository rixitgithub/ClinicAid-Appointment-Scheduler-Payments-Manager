import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserAPI from "../api/userAPI.js"; // Import the checkLoginStatus function
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { checkLoginStatus, logout } = useUserAPI(); // Import the logout function
  const navigate = useNavigate();

  useEffect(() => {
    // Call the checkLoginStatus function when the component mounts
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const response = await checkLoginStatus(token);
      setIsOwner(response.isOwner);
      setIsLoggedIn(response.isLoggedIn);
    };

    fetchData();
  }, []);

  // Function to handle logout
  const handleLogout = async () => {
    // Remove the token from local storage
    localStorage.removeItem("token");

    // Perform any additional logout logic here

    setIsLoggedIn(false); // Update isLoggedIn state to false after logout
    navigate("/");
    window.location.reload(); // Refresh the page after logout
  };

  return (
    <header className="sticky top-0 z-50">
      <nav>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/clinic">My Clinic</Link>
                </li>
                {isLoggedIn && !isOwner && (
                  <>
                    <li>
                      <Link to="/profile">Portfolio</Link>
                    </li>
                    <li>
                      <Link to="/appointments">Appointments</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <Link to="/" className="btn btn-ghost text-xl">
              ClinicAid
            </Link>
          </div>
          <div className="navbar-end">
            {/* Render logout link only if user is logged in */}
            {isLoggedIn && (
              <div className="mr-4">
                {isLoggedIn && (
                  <div className="mr-4">
                    <Link
                      onClick={handleLogout}
                      className="btn btn-ghost btn-circle"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} />
                    </Link>
                  </div>
                )}
              </div>
            )}
            {/* Render nothing if user is logged in */}
            {!isLoggedIn && (
              <Link to="/register" className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A5 5 0 0110 15h4a5 5 0 014.879 2.804M15 11a4 4 0 10-8 0 4 4 0 008 0z"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
