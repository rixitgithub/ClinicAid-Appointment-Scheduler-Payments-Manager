import React from "react";

const ClinicCard = ({ clinic }) => {
  const {
    name,
    category,
    distance,
    image = "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
    briefInfo = "A trusted clinic with expert care and advanced treatments.",
    detailedInfo = "We offer top-tier medical services with experienced professionals. Open from 9 AM - 7 PM on weekdays.",
  } = clinic;

  return (
    <div className="card card-side bg-white shadow-lg border flex h-60">
      {/* Left Side: Full Height Image + Extra Info */}
      <div className="w-1/3 flex flex-col h-full">
        <figure className="h-1/3">
          <img className="h-full w-full object-cover rounded-t-lg" src={image} alt={name} />
        </figure>
        <div className="h-1/4 bg-gray-100 flex flex-col justify-center p-2 text-center">
          <p className="text-xs text-gray-600">{briefInfo}</p>
          <p className="text-xs text-gray-500 mt-1">🏥 Open Today</p>
        </div>
      </div>

      {/* Right Side: Full Height Details */}
      <div className="card-body w-2/3 flex flex-col justify-between">
        <div>
          <h2 className="card-title">{name}</h2>
          <p className="text-xs text-gray-600">{category}</p>
          <p className="text-xs text-gray-700">
            📍 Distance: {distance < 1000 ? `${distance} m` : `${(distance / 1000).toFixed(1)} km`}
          </p>
          <p className="text-sm text-gray-700 mt-2">{detailedInfo}</p>
        </div>
        <div className="card-actions justify-end mt-auto">
          <button className="btn btn-primary btn-sm">Book Appointment</button>
        </div>
      </div>
    </div>
  );
};

export default ClinicCard;
