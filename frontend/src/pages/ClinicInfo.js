import React from "react";

const ClinicInfo = ({ clinic }) => {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-xl font-bold mb-4">{clinic.name}</h2>
      <div className="mb-4">
        <p className="text-gray-600">{clinic.about}</p>
      </div>
      <div className="mb-4">
        <p className="text-gray-700">Address: {clinic.address}</p>
      </div>
      <div>
        <p className="text-gray-700">Phone: {clinic.phone}</p>
      </div>
    </div>
  );
};

export default ClinicInfo;
