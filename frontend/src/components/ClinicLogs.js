import React, { useEffect, useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Icons for navigation
import useClinicAPI from "../api/useClinicAPI";

const ClinicLogs = ({ clinic }) => {
  const { getLogsByClinicId } = useClinicAPI();
  const [logs, setLogs] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const fetchLogs = async (date) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formattedDate = date.toISOString().split("T")[0];
      const logsData = await getLogsByClinicId(clinic._id, token, formattedDate);
      setLogs(logsData);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(currentDate);
  }, [currentDate]);

  const handlePrevDate = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setCurrentDate(prevDate);
  };

  const handleNextDate = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate);
  };

  const handleDateChange = (event) => {
    setCurrentDate(new Date(event.target.value));
  };

  const handleScroll = async () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollHeight - scrollTop === clientHeight) {
      // Load more logs when user reaches the bottom
      console.log("Reached bottom. Load more logs...");
      // Implement pagination or fetching more logs if necessary
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mb-4">
        <button onClick={handlePrevDate} className="mr-2">
          <FaChevronLeft size={20} />
        </button>
        <div className="flex items-center bg-neutral text-neutral-content rounded-full px-2 py-1">
          <input
            type="date"
            value={currentDate.toISOString().split("T")[0]}
            onChange={handleDateChange}
            className="bg-neutral text-white border-none outline-none date-picker"
          />
        </div>
        <button onClick={handleNextDate} className="ml-2">
          <FaChevronRight size={20} />
        </button>
      </div>

      <div className="flex justify-center w-full">
        <div
          ref={containerRef}
          className={`w-full ${logs.length > 0 ? "overflow-y-scroll max-h-60" : ""}`}
          onScroll={handleScroll}
        >
          {loading ? (
            <div className="text-center p-2">Loading logs...</div>
          ) : logs.length === 0 ? (
            <div className="text-center text-gray-500 p-2">No logs available.</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="chat chat-start">
                <div className="chat-image avatar placeholder flex justify-center">
                  <div className="bg-neutral text-neutral-content rounded-full w-10">
                    <span className="text-3xl">{log.by[0]}</span>
                  </div>
                </div>
                <div className="chat-bubble">
                  <p>{log.by} {log.what} {log.for}.</p>
                  <span className="text-xs text-white">
                    {new Date(log.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicLogs;
