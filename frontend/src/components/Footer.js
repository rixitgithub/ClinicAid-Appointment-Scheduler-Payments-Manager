import React from "react";
import logo from "../assets/nav.png";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* -----Left Section----- */}
        <div>
          <img className="mb-5 w-40" src={logo} alt="ClinicAid Logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            ClinicAid simplifies healthcare management by connecting patients, doctors, and clinics in a seamless and secure platform. From booking appointments to managing schedules, ClinicAid ensures a smooth healthcare experience.
          </p>
        </div>

        {/* -----Center Section----- */}
        {/* <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div> */}

        {/* -----Right Section----- */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91-8595847479</li>
            <li>mail.clinicaid@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* -----Copyright Section----- */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          © 2025 ClinicAid by Rishit Tiwari. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
