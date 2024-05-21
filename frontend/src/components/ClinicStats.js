import React from "react";

const ClinicStats = () => {
  return (
    <div className="flex justify-center">
      {" "}
      {/* Wrap ClinicStats with a container div with flexbox */}
      <div className="stats shadow">
        <div className="stat place-items-center">
          <div className="stat-title">Appointments</div>
          <div className="stat-value">6</div>
          <div className="stat-desc">Today</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Patients</div>
          <div className="stat-value text-secondary">43</div>
          <div className="stat-desc text-secondary">All Time</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Patients</div>
          <div className="stat-value">11</div>
          <div className="stat-desc">This Month</div>
        </div>
      </div>
    </div>
  );
};

export default ClinicStats;
