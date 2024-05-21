import React, { useEffect, useState } from "react";

const Schedule = ({ schedule, doctorId }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const filteredSchedule = schedule.filter(
    (event) => event.doctorId._id === doctorId
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
    return index * 20; // 20px height for each 15-minute slot
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
    console.log(formatter);
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
    console.log(timeString);
    const index = timeSlots.findIndex(
      (slot) =>
        convertTo24HourFormat(slot) === convertTo24HourFormat(timeString)
    );
    return index * 20;
  };

  return (
    <div className="relative h-full">
      {timeSlots.map((slot, index) => (
        <React.Fragment key={index}>
          <div
            className="absolute left-0 text-sm text-gray-500"
            style={{
              top: `${index * 20}px`,
              transform: "translateY(-50%)", // Center align the text vertically
            }}
          >
            {slot.endsWith(":00 AM") || slot.endsWith(":00 PM") ? slot : ""}
          </div>
          <div
            className="absolute left-20 right-0 border-t border-gray-300"
            style={{
              top: `${index * 20}px`,
              marginTop: "0.2rem", // Add spacing between lines
            }}
          />
        </React.Fragment>
      ))}
      {filteredSchedule.map((event) => (
        <div
          key={event.id}
          className="absolute left-20 bg-blue-500 text-white p-2 rounded"
          style={{
            top: `${calculateEventTop(event.startTime)}px`,
            height: `${calculateEventHeight(event.startTime, event.endTime)}px`,
            width: "calc(100% - 5rem)",
          }}
        >
          <div className="font-semibold">
            {event.patientId.name} - {event.patientId.phoneNumber}
          </div>
          <div className="font-light"></div>
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
