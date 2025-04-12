import { useState, useEffect } from "react";
import ClinicCard from "./ClinicCard";

const categories = ["Dentist", "Cardiologist", "Pediatrician", "Dermatologist"];

const sampleClinics = [
  { id: 1, name: "Shifa Dental Care", category: "Dentist", lat: 26.2645, lon: 81.5471 },
  { id: 2, name: "Rishit Dental Care", category: "Dentist", lat: 26.2652, lon: 81.5495 },
  { id: 3, name: "Heart Wellness Center", category: "Cardiologist", lat: 26.2652, lon: 81.5495 },
  { id: 4, name: "Sunshine Child Care", category: "Pediatrician", lat: 26.2680, lon: 81.5520 },
  { id: 5, name: "Glow Skin Clinic", category: "Dermatologist", lat: 26.2621, lon: 81.5450 },
];

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Clinics = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
      },
      () => setUserLocation("Location Access Denied")
    );
  }, []);

  useEffect(() => {
    if (selectedCategory && userLocation) {
      const filteredClinics = sampleClinics
        .filter((c) => c.category === selectedCategory)
        .map((clinic) => {
          const distance = Math.round(calculateDistance(userLocation.lat, userLocation.lon, clinic.lat, clinic.lon));
          return { ...clinic, distance };
        })
        .sort((a, b) => a.distance - b.distance);

      setClinics(filteredClinics);
    }
  }, [selectedCategory, userLocation]);

  return (
    <div className="p-6 mx-auto max-w-4xl">
      <h1 className="text-2xl font-semibold text-center mb-6">Find a Clinic</h1>

      {/* Category Selection - Centered */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 justify-center">
        {categories.map((cat) => (
          <div
            key={cat}
            className={`card p-4 border rounded-lg text-center cursor-pointer transition ${
              selectedCategory === cat ? "bg-gray-100 border-gray-400" : "bg-white"
            } hover:shadow-md`}
            onClick={() => setSelectedCategory(cat)}
          >
            <p className="font-medium">{cat}</p>
          </div>
        ))}
      </div>

      {/* Clinics List */}
      <h2 className="text-lg font-semibold mb-4">Available Clinics</h2>
      {clinics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clinics.map((clinic) => (
            <ClinicCard key={clinic.id} clinic={clinic} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No clinics found for this category.</p>
      )}
    </div>
  );
};

export default Clinics;
