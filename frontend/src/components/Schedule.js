import React, { useEffect, useState } from "react";
import { format, addDays, subDays } from "date-fns";
import useScheduleAPI from "../api/useScheduleAPI";

const Schedule = ({ schedule, doctorId }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { updateEventStatus } = useScheduleAPI();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const filteredSchedule = schedule.filter(
    (event) =>
      event.doctorId._id === doctorId &&
      new Date(event.date).toDateString() === selectedDate.toDateString()
  );

  const timeSlots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time = `${String(hour % 12 === 0 ? 12 : hour % 12).padStart(
        2,
        "0"
      )}:${String(minute).padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`;
      timeSlots.push(time);
    }
  }

  const convertTo24HourFormat = (time) => {
    const [hourString, minuteString, period] = time.split(/[: ]/);
    let hour = parseInt(hourString);
    const minute = parseInt(minuteString);
    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}`;
  };

  const calculateEventTop = (startTime) => {
    const index = timeSlots.findIndex(
      (slot) => convertTo24HourFormat(slot) === convertTo24HourFormat(startTime)
    );
    return index * 20 + 30; // Adjusted: 20px height for each 15-minute slot plus 30px margin
  };

  const calculateEventHeight = (startTime, endTime) => {
    const startIndex = timeSlots.findIndex(
      (slot) => convertTo24HourFormat(slot) === convertTo24HourFormat(startTime)
    );
    const endIndex = timeSlots.findIndex(
      (slot) => convertTo24HourFormat(slot) === convertTo24HourFormat(endTime)
    );
    return (endIndex - startIndex) * 20; // 20px height for each 15-minute slot
  };

  const calculateCurrentTimeTop = () => {
    const options = {
      timeZone: "Asia/Kolkata",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    };

    const formatter = new Intl.DateTimeFormat([], options);
    const [hourString, minuteString] = formatter
      .formatToParts(currentTime)
      .filter((part) => part.type === "hour" || part.type === "minute")
      .map((part) => part.value);

    const currentHour = parseInt(hourString, 10);
    const currentMinute = parseInt(minuteString, 10);
    const timeString = `${String(
      currentHour % 12 === 0 ? 12 : currentHour % 12
    ).padStart(2, "0")}:${String(currentMinute).padStart(2, "0")} ${
      currentHour < 12 ? "AM" : "PM"
    }`;

    const index = timeSlots.findIndex(
      (slot) =>
        convertTo24HourFormat(slot) === convertTo24HourFormat(timeString)
    );
    return index * 20 + 30; // Adjusted: 20px height for each 15-minute slot plus 30px margin
  };

  const handlePrevDay = () => {
    setSelectedDate((prevDate) => subDays(prevDate, 1));
  };

  const handleNextDay = () => {
    setSelectedDate((prevDate) => addDays(prevDate, 1));
  };

  const handleStatusChange = async (eventId, status) => {
    try {
      await updateEventStatus(eventId, status);
      window.location.reload();
    } catch (error) {
      console.error(`Failed to update status for event ${eventId}:`, error);
    }
  };

  return (
    <div className="relative h-full">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevDay} className="btn btn-primary">
          Previous Day
        </button>
        {console.log(selectedDate)}
        <h2 className="text-xl font-semibold">
          {format(selectedDate, "dd MMMM yyyy")}
        </h2>
        <button onClick={handleNextDay} className="btn btn-primary">
          Next Day
        </button>
      </div>
      {timeSlots.map((slot, index) => (
        <React.Fragment key={index}>
          <div
            className="absolute left-0 text-sm text-gray-500"
            style={{
              top: `${index * 20 + 30}px`, // Adjusted: Add margin at the top
              transform: "translateY(-50%)",
            }}
          >
            {slot.endsWith(":00 AM") || slot.endsWith(":00 PM") ? slot : ""}
          </div>
          <div
            className="absolute left-20 right-0 border-t border-gray-300"
            style={{
              top: `${index * 20 + 30}px`, // Adjusted: Add margin at the top
              marginTop: "0.2rem",
            }}
          />
        </React.Fragment>
      ))}
      {filteredSchedule.map((event) => (
        <div
          key={event.id}
          className={`absolute left-20 p-2 rounded border ${
            event.status === "missed"
              ? "border-black bg-red-500"
              : event.status === "completed"
              ? "border-black bg-green-500"
              : "border-black bg-blue-500"
          } text-white`}
          style={{
            top: `${calculateEventTop(event.startTime)}px`,
            height: `${calculateEventHeight(event.startTime, event.endTime)}px`,
            width: "calc(100% - 5rem)",
          }}
        >
          <div className="flex justify-between">
            <div className="font-semibold">
              {event.patientId.name} - {event.patientId.phoneNumber}
            </div>
            {event.status === "upcoming" && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleStatusChange(event._id, "completed")}
                  className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                >
                  ✔
                </button>
                <button
                  onClick={() => handleStatusChange(event._id, "missed")}
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                >
                  ✘
                </button>
              </div>
            )}
          </div>
          <div className="text-sm">
            {event.startTime} - {event.endTime}
          </div>
        </div>
      ))}

      <div
        className="absolute left-20 right-0 h-0.5 bg-red-500"
        style={{
          top: `${calculateCurrentTimeTop()}px`,
        }}
      />
    </div>
  );
};

export default Schedule;
