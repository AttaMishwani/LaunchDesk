import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import Loader from "../ui/Loader";
import { auth, db } from "../firebase/firebase";
import { fetchJobById } from "../api/fetchJobById";
import { resetApplication } from "../redux/jobApplicationSlice";

const Review = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jobApplication = useSelector((state) => state.jobApplication || {});
  const { resumeURL, QA = [], jobId } = jobApplication;
  const currentUser = auth.currentUser;
  const [loading, setLoading] = useState(false);

  const {
    data: jobDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => fetchJobById(jobId),
    enabled: !!jobId,
  });

  const handleSubmitApplication = async () => {
    if (!currentUser) {
      alert("You must be logged in to submit an application.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "applications"), {
        ...jobApplication,
        applicantId: currentUser.uid,
        ownerId: jobDetails?.ownerId || "",
        createdAt: serverTimestamp(),
      });

      alert("Application Submitted Successfully!");
      dispatch(resetApplication());
      navigate("/thank-you");
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Failed to submit application. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  if (error)
    return (
      <div className="text-center py-10 text-red-600 font-semibold">
        Error loading job: {error.message}
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
            Review Your Application
          </h1>

          {/* Job Details */}
          <div className="bg-white p-6 rounded-lg shadow mb-8 border border-blue-100">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
              {jobDetails?.title || "Job Title"}
            </h2>
            <p className="text-gray-700 mb-1">
              <strong>Company:</strong> {jobDetails?.company || "N/A"}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Location:</strong> {jobDetails?.location || "N/A"}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Salary:</strong> ${jobDetails?.salary || "N/A"}
            </p>
            <p className="text-gray-700 mt-2">
              {jobDetails?.description || "No description available."}
            </p>
          </div>

          {/* Resume */}
          <div className="bg-white p-6 rounded-lg shadow mb-8 border border-blue-100">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Resume Preview
            </h2>

            {resumeURL ? (
              <iframe
                src={resumeURL}
                title="Resume Preview"
                className="w-full h-[500px] border rounded"
                allowFullScreen
              />
            ) : (
              <p className="text-red-500">No resume uploaded.</p>
            )}
          </div>

          {/* QA Answers */}
          <div className="bg-white p-6 rounded-lg shadow mb-8 border border-blue-100">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Screening Answers
            </h2>
            {QA.length > 0 ? (
              QA.map((qa, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold text-gray-800">
                    Q{index + 1}: {qa.question}
                  </p>
                  <p className="text-gray-700 mt-1">
                    <strong>Answer:</strong>{" "}
                    {qa.answer || "No answer provided."}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No answers submitted.</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSubmitApplication}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-8 rounded-lg transition duration-200"
            >
              Submit Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
