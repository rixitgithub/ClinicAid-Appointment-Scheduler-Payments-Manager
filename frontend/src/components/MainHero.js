import React from "react";
import { FaArrowRight } from "react-icons/fa";

const MainHero = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center p-8 lg:py-16">
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h2 className="text-7xl text-gray-800 ..dm-sans-header">
            Enabling exceptional{" "}
            <span className="bg-green-100 px-2 py-0.1 rounded">
              telehealth
            </span>{" "}
            at every touchpoint
          </h2>
          <p className="text-gray-600 text-lg">
            Innovative telehealth solutions proven to deliver seamless virtual
            care.
          </p>

          <div className="space-x-4 mt-4">
            <button className="bg-black text-white px-6 py-2 rounded-lg">
              Get Started
            </button>
            <button className="bg-green-100 text-green-700 px-6 py-2 rounded-lg hover:bg-green-200">
              Book Discovery Call
            </button>
          </div>
          <div className="mt-6 flex items-center space-x-2">
            <div className="flex -space-x-2">
              {/* Example Avatars */}
              <img
                className="w-8 h-8 rounded-full border"
                src="https://via.placeholder.com/40"
                alt="user"
              />
              <img
                className="w-8 h-8 rounded-full border"
                src="https://via.placeholder.com/40"
                alt="user"
              />
            </div>
            <p className="text-gray-600">1000+ happy patients</p>
          </div>
        </div>

        {/* Doctor Image */}
        <div className="lg:w-1/2 mt-12 lg:mt-0">
          <div className="relative">
            <img
              className="w-full rounded-2xl"
              src="/assets/mainhero_doctor.jpg"
              alt="Doctor Consultation"
            />
            <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-md">
              <p className="text-sm">24/7 Support for Virtual Clinics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 bg-gray-50 text-center">
        <h3 className="text-3xl font-bold text-gray-700">
          Full range of solutions to effectively enhance your{" "}
          <span className="text-green-700">virtual care</span>.
        </h3>
        <p className="text-gray-600 mt-2">
          Discover AyaRX's expertly crafted white-label solutions.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Virtual Solutions", desc: "Brick And Mortar" },
            { title: "50 State Coverage", desc: "Nationwide Services" },
            { title: "EHR/EMR", desc: "Electronic Records" },
            { title: "E-Prescribe", desc: "Easy Prescription" },
          ].map((solution, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg"
            >
              <h4 className="text-xl font-bold text-green-700">
                {solution.title}
              </h4>
              <p className="text-gray-600 mt-2">{solution.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainHero;
