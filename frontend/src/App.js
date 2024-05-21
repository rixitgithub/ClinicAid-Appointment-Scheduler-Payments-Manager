import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ClinicDetailsPage from "./pages/ClinicDetailsPage";
import Settings from "./pages/Settings";
import ManagePage from "./pages/ManagePage";
import OverviewPage from "./pages/OverviewPage";
// Import other pages as needed

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/clinic" element={<ClinicDetailsPage />} />
            <Route path="/:clinicId/manage" element={<ManagePage />} />
            <Route path="/:clinicId/overview" element={<OverviewPage />} />

            <Route path="/settings" element={<Settings />} />

            {/* Add other routes here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
