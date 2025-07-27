import React from "react";
import { useSelector } from "react-redux";

const Button = ({ buttonText, onClick }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const isRecruiter = currentUser?.type?.toLowerCase() === "recruiter";

  return (
    <button
      onClick={!isRecruiter ? onClick : undefined}
      disabled={isRecruiter}
      className={`text-sm px-3 py-1 rounded-full transition text-white ${
        isRecruiter
          ? "bg-[#103d52] cursor-not-allowed opacity-60"
          : "bg-primary hover:bg-[#066b99] cursor-pointer "
      }`}
    >
      {buttonText}
    </button>
  );
};

export default Button;
