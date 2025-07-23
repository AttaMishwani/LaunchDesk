import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchJobById } from "../api/fetchJobById";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";
import { auth } from "../firebase/firebase";
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

    const QA = questions.map((question, index) => ({
      question,
      answer: answers[index],
    }));

    dispatch(setAnswers({ QA, jobId: id }));
    navigate("/review");
  };

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">❌ Error loading job data</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-bgc flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-bgc rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">
          📝 Screening Questions
        </h1>

        {isLoading ? (
          <Loader />
        ) : questions.length > 0 ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {questions.map((question, index) => (
              <div key={index}>
                <label className="block text-textLight font-semibold mb-2">
                  {index + 1}. {question}
                </label>
                <textarea
                  rows="4"
                  placeholder="Type your answer..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-textLight focus:outline-none focus:ring-2 focus:ring-primary resize-none placeholder-gray-400"
                  value={answers[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  required
                ></textarea>
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-primary hover:bg-[#0284c7] text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
            >
              ✅ Next Step
            </button>
          </form>
        ) : (
          <p className="text-gray-600 text-center">
            No questions were provided by the employer.
          </p>
        )}
      </div>
    </div>
  );
};

export default ScreeningQuestions;
