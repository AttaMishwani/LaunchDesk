import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Loader from "../ui/Loader";
import { fetchJobById } from "../api/fetchJobById";
import { useDispatch } from "react-redux";
import {
  setJobId,
  setResumeURL,
  setUserInfo,
} from "../redux/jobApplicationSlice";
import { auth } from "../firebase/firebase";

const JobDetails = () => {
  const { id } = useParams();
  const [resumeFile, setResumeFile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [resumePreviewUrl, setResumePreviewUrl] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentUser = auth.currentUser;
    setCurrentUser(currentUser);
  }, []);

  if (currentUser) {
    dispatch(
      setUserInfo({
        email: currentUser.email,
        displayName: currentUser.displayName,
        emailVerified: currentUser.emailVerified,
        uid: currentUser.uid,
      })
    );
  }

  const {
    data: job,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id),
    enabled: !!id,
  });

  useEffect(() => {
    dispatch(setJobId(id));
  }, [job, id, dispatch]);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURl = URL.createObjectURL(file);
      setResumeFile(file);

      setResumePreviewUrl(previewURl);

      dispatch(setResumeURL(previewURl));
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading job: {error.message}</div>;
  if (!job) return <div className="text-center py-12">Job not found.</div>;

  return (
    <div className="mx-auto py-12 px-4 flex flex-col md:flex-row gap-8 w-full max-w-[1300px]">
      {/* Resume Upload Section */}
      <div className="left w-full md:w-[40%] border-2 border-blue-600 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          Upload Your Resume
        </h2>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
          className="mb-4"
        />
        {resumeFile && (
          <div className="mt-4">
            <h3 className="font-semibold text-lg mb-2">Resume Preview:</h3>
            <p className="text-sm text-gray-700 mb-2">
              File: {resumeFile.name}
            </p>
            {resumePreviewUrl && resumeFile.type === "application/pdf" ? (
              <iframe
                src={resumePreviewUrl}
                title="Resume Preview"
                className="w-full h-[400px] border"
              />
            ) : (
              <p className="text-sm text-gray-600">
                Preview not available for this file type.
              </p>
            )}
          </div>
        )}

        <NavLink to={`/screening-questions/${id}`}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition duration-200 mt-10  ">
            Continue
          </button>
        </NavLink>
      </div>

      {/* Job Details Section */}
      <div className="right w-full md:w-[60%] bg-white p-6  rounded-lg">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">{job.title}</h1>
        <p className="text-gray-700 mb-6">{job.description}</p>
        <p className="text-lg font-semibold text-green-700 mb-2">
          Company: {job.company}
        </p>
        <p className="text-lg font-semibold text-green-700 mb-2">
          Location: {job.location}
        </p>
        <p className="text-lg font-semibold text-green-700 mb-2">
          Salary: ${job.salary}
        </p>
      </div>
    </div>
  );
};

export default JobDetails;
