import React from "react";

const Button = ({ buttonText }) => {
  return (
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg shadow-sm transition duration-300 my-10">
      {buttonText}
    </button>
  );
};

export default Button;
