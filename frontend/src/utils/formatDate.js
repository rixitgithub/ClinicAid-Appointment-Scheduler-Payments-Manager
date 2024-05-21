// src/utils/formatDate.js
export const formatISODate = (isoDateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kolkata",
  };

  const date = new Date(isoDateString);
  return new Intl.DateTimeFormat("en-IN", options).format(date);
};
