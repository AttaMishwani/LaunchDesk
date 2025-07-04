import React from "react";

const Button = ({ buttonText, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-primary text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-sky-600 cursor-pointer transition-colors duration-200"
    >
      {buttonText}
    </button>
  );
};

export default Button;
