import React, { useState } from "react";
import { Link } from "react-router-dom";

const Doctors = ({ doctors }) => {
  // Filter doctors where type is "Doctor"
  const filteredDoctors = doctors.filter((doctor) => doctor.type === "Doctor");

  // State to keep track of the selected doctor
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Function to handle selecting a doctor
  const handleDoctorSelect = (index, doctorId) => {
    setSelectedDoctor(index);
  };

  return (
    <div className="flex-1 bg-white p-4 border-b border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Doctors</h2>
      {filteredDoctors.map((doctor, index) => (
        <Link
          key={index}
          to={`?doctorId=${doctor._id}`}
          className={`block mb-2 p-2 ${
            selectedDoctor === index
              ? "bg-blue-400 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          } rounded-md transition-colors duration-300`}
          onClick={() => handleDoctorSelect(index, doctor._id)}
        >
          <p className="text-gray-800">{doctor.name}</p>
          {console.log(doctor)}
        </Link>
      ))}
    </div>
  );
};

export default Doctors;
