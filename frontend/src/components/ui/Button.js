import React from "react";

function Button({ children, variant = "default", className = "", ...props }) {
  const baseStyles = "px-4 py-2 rounded-lg font-semibold transition duration-200";
  const variants = {
    default: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    blue: "bg-blue-600 text-white hover:bg-blue-700",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
