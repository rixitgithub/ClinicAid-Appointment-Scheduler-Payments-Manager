import React from "react";

const ClinicInfo = ({ clinic }) => {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-2xl font-semibold mb-2">{clinic.name}</h2>

      {clinic.about && (
        <p className="text-gray-600 mb-4">{clinic.about}</p>
      )}

      {clinic.address && (
        <p className="text-gray-700 mb-2">Address: {clinic.address}</p>
      )}

      {clinic.phone && (
        <p className="text-gray-700">Phone: {clinic.phone}</p>
      )}
    </div>
  );
};

export default ClinicInfo;
