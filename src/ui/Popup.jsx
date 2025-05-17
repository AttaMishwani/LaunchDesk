import React from "react";
import { IoMdClose } from "react-icons/io";

const Popup = ({ showPopUp, setshowPopUp }) => {
  const onClose = () => {
    setshowPopUp(false);
  };

  return (
    <div
      className={`${
        showPopUp ? "flex" : "hidden"
      } fixed inset-0 items-center justify-center    z-50`}
    >
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-blue-500 p-8 w-[90%] max-w-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl"
        >
          <IoMdClose />
        </button>

        {/* Popup Content */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Job Posted!</h2>
          <p className="text-gray-600">
            Your job has been successfully posted to the board.
          </p>

          {/* Optional: Button below */}
          <button
            onClick={onClose}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
