import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ClinicDetailsPage from "./pages/ClinicDetailsPage";
import ManagePage from "./pages/ManagePage";
import Navbar from "./components/Navbar";
import OverviewPage from "./pages/OverviewPage";
import AppointmentPage from "./pages/AppointmentPage";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Doctors from "./pages/Doctors";

function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/clinic" element={<ClinicDetailsPage />} />
        <Route path="/:clinicId/manage" element={<ManagePage />} />
        <Route path="/:clinicId/overview" element={<OverviewPage />} />
        <Route path="/appointments" element={<AppointmentPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
