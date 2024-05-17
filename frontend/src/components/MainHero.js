import React from "react";
import { Link } from "react-router-dom";

const MainHero = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="">
          <h1 className="text-7xl font-bold">FIRST AID TO YOUR CLINIC</h1>
          <p className="py-6">
            Effortlessly manage appointments, referrals, and payments with
            ClinicAid: your all-in-one clinic management solution.
          </p>
          <Link to="/login">
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainHero;
