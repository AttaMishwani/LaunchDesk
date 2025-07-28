import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgc px-4">
      <div className="bg-white dark:bg-cardBg p-8 rounded-2xl shadow-md text-center max-w-md w-full border border-primary">
        <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-primary mb-2">Thank You!</h1>
        <p className="text-textLight mb-6">
          Your job application has been submitted successfully.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-6 rounded-md transition-all duration-200"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
