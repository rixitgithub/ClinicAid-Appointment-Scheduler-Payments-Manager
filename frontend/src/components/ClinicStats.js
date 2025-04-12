import React, { useEffect, useState } from "react";
import useScheduleAPI from "../api/useScheduleAPI";

const ClinicStats = () => {
  const [appointmentsToday, setAppointmentsToday] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [patientsThisMonth, setPatientsThisMonth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { fetchAppointmentsToday, fetchTotalPatients, fetchPatientsThisMonth } =
    useScheduleAPI();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const todayAppointments = await fetchAppointmentsToday();
        const totalPatients = await fetchTotalPatients(token);
        const patientsThisMonth = await fetchPatientsThisMonth(token);

        setAppointmentsToday(todayAppointments.length);
        setTotalPatients(totalPatients.totalPatients);
        setPatientsThisMonth(patientsThisMonth.totalPatients);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="stats shadow-lg">
        <div className="stat place-items-center">
          <div className="stat-title">Appointments</div>
          <div className="stat-value">{appointmentsToday}</div>
          <div className="stat-desc">Today</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Patients</div>
          <div className="stat-value text-secondary">{totalPatients}</div>
          <div className="stat-desc text-secondary">All Time</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Patients</div>
          <div className="stat-value">{patientsThisMonth}</div>
          <div className="stat-desc">This Month</div>
        </div>
      </div>
    </div>
  );
};

export default ClinicStats;
