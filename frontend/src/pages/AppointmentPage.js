import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import useScheduleAPI from "../api/useScheduleAPI";

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const patientId = localStorage.getItem("token");
  const { fetchAppointmentsByPatient } = useScheduleAPI();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await fetchAppointmentsByPatient(patientId);
        setAppointments(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [patientId]);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        Error loading appointments.
      </div>
    );
  }

  const allCount = appointments.length;
  const upcomingCount = appointments.filter(
    (appointment) => appointment.status === "upcoming"
  ).length;
  const completedCount = appointments.filter(
    (appointment) => appointment.status === "completed"
  ).length;
  const missedCount = appointments.filter(
    (appointment) => appointment.status === "missed"
  ).length;

  let filteredAppointments = [];

  if (filter === "all") {
    filteredAppointments = appointments;
  } else {
    filteredAppointments = appointments.filter(
      (appointment) => appointment.status === filter
    );
  }
  const activeFilterStyle = {
    borderBottom: "2px solid #3182ce",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-4 md:p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Your Appointments
        </h2>
        <div className="text-center mb-4">
          <button
            className={`mr-4 ${filter === "all" ? "active" : ""}`}
            style={filter === "all" ? activeFilterStyle : null}
            onClick={() => setFilter("all")}
          >
            All ({allCount})
          </button>
          <button
            className={`mr-4 ${filter === "upcoming" ? "active" : ""}`}
            style={filter === "upcoming" ? activeFilterStyle : null}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming ({upcomingCount})
          </button>
          <button
            className={`mr-4 ${filter === "completed" ? "active" : ""}`}
            style={filter === "completed" ? activeFilterStyle : null}
            onClick={() => setFilter("completed")}
          >
            Completed ({completedCount})
          </button>
          <button
            className={filter === "missed" ? "active" : ""}
            style={filter === "missed" ? activeFilterStyle : null}
            onClick={() => setFilter("missed")}
          >
            Missed ({missedCount})
          </button>
        </div>
        {filteredAppointments.length === 0 ? (
          <div className="text-center text-gray-500">
            No appointments found.
          </div>
        ) : (
          <ul className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <li
                key={appointment._id}
                className="border rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <div className="flex-1">
                  <div className="text-lg font-semibold">
                    Dr. {appointment.doctorId.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {format(new Date(appointment.date), "MMMM dd, yyyy")} -{" "}
                    {appointment.startTime} to {appointment.endTime}
                  </div>
                  <div className="mt-2 text-gray-700">
                    {appointment.patientId.name} -{" "}
                    {appointment.patientId.phoneNumber}
                  </div>
                  <div className="mt-2 text-gray-700">
                    {appointment.clinicId.name} - {appointment.clinicId.address}
                  </div>
                  <div className="mt-2 text-gray-700">
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        appointment.status === "upcoming"
                          ? "text-blue-600"
                          : appointment.status === "completed"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-4">
                  <button className="btn btn-primary mr-2">Reschedule</button>
                  <button className="btn btn-secondary">Cancel</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AppointmentPage;
