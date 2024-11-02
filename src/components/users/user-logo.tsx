import React from "react";

const DefaultUserLogo = () => {
  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 150 150"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="75" cy="75" r="75" fill="#E0E0E0" />
      <circle cx="75" cy="60" r="30" fill="#B3B3B3" />
      <path d="M30 115c0-20 20-30 45-30s45 10 45 30" fill="#B3B3B3" />
    </svg>
  );
};

export default DefaultUserLogo;
