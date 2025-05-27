import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Your job application has been submitted successfully.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
