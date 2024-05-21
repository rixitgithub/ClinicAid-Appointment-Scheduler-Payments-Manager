import React from "react";

const ClinicLogs = () => {
  return (
    <div className="flex justify-center">
      <div>
        <div className="chat chat-start">
          <div className="chat-image avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-10">
              <span className="text-3xl">R</span>
            </div>
          </div>
          <div className="chat-bubble">
            <p>Rachna booked an appointment for Mr. Rajesh.</p>
            <span className="text-xs text-white">12:30 PM</span>
          </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-image avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-10">
              <span className="text-3xl">J</span>
            </div>
          </div>
          <div className="chat-bubble">
            <p>Dr. Jha completed an appointment with Mr. Rajesh.</p>
            <span className="text-xs text-white">1:45 PM</span>
          </div>
        </div>
        {/* Add more chat bubbles as needed */}
      </div>
    </div>
  );
};

export default ClinicLogs;
