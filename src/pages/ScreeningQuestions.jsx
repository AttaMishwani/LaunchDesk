import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchJobById } from "../api/fetchJobById";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setAnswers } from "../redux/jobApplicationSlice";

const ScreeningQuestions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = auth.currentUser;

  const {
    data: job,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id),
    enabled: !!id,
  });

  const questions = job?.questions || [];
  const [answers, setLocalAnswers] = useState(Array(questions.length).fill(""));

  const handleChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setLocalAnswers(updatedAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first to proceed.");
      return;
    }

    dispatch(setAnswers(answers));

    navigate("/review");
  };

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Error loading job data</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-8">
          Screening Questions
        </h1>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {questions.length > 0 ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                  <div key={index}>
                    <label className="block text-gray-800 font-medium mb-2">
                      {index + 1}. {question}
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Type your answer..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      value={answers[index]}
                      onChange={(e) => handleChange(index, e.target.value)}
                      required
                    ></textarea>
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md transition duration-300"
                >
                  Next Step
                </button>
              </form>
            ) : (
              <p className="text-gray-600 text-center">
                No questions provided by the employer.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ScreeningQuestions;
