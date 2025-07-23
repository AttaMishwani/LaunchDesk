import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";

import Loader from "../ui/Loader";
import {
  setJobId,
  setResumeURL,
  setUserInfo,
} from "../redux/jobApplicationSlice";
import { auth, db } from "../firebase/firebase";

const JobDetails = () => {
  const { id } = useParams();
  const [resumeLink, setResumeLink] = useState("");
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentUser = auth.currentUser;
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
  }, [dispatch]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setJob(docSnap.data());
        } else {
          console.log("No such job found!");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      dispatch(setJobId(id));
      fetchJob();
    }
  }, [id, dispatch]);

  const handleResumeLinkChange = (e) => {
    const link = e.target.value;
    const convertedLink = convertGoogleDriveLink(link);
    setResumeLink(link);
    dispatch(setResumeURL(convertedLink));
  };

  function convertGoogleDriveLink(url) {
    const match = url.match(/\/d\/(.*?)\//);
    if (match && match[1]) {
      return `https://drive.google.com/uc?id=${match[1]}`;
    }
    return url;
  }

  if (loading) return <Loader />;
  if (!job) return <div className="text-center py-12">❌ Job not found.</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
      {/* Left - Resume Input */}
      <div className="lg:w-[40%] w-full bg-[#1f2937] border border-primary p-6 rounded-2xl shadow-md text-white">
        <h2 className="text-2xl font-bold mb-4 text-primary">
          📄 Upload Resume Link
        </h2>
        <p className="text-sm text-gray-300 mb-2">
          Please paste your **Google Drive** resume link here.
        </p>
        <input
          type="url"
          placeholder="https://drive.google.com/..."
          value={resumeLink}
          onChange={handleResumeLinkChange}
          className="w-full bg-[#111827] border border-gray-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 mb-4"
        />
        <NavLink to={`/screening-questions/${id}`}>
          <button
            className="bg-primary hover:bg-primary text-white w-full py-3 rounded-lg font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!resumeLink}
          >
            ➡️ Continue to Screening
          </button>
        </NavLink>
      </div>

      {/* Right - Job Info */}
      <div className="lg:w-[60%] w-full  p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-primary mb-4">{job.title}</h1>

        <p className="text-textLight text-base mb-6 leading-relaxed whitespace-pre-wrap">
          {job.description || "No job description provided."}
        </p>

        <ul className="text-base space-y-2 text-textLight">
          <li>
            <span className="font-medium text-primary">Company:</span>{" "}
            {job.company || "N/A"}
          </li>
          <li>
            <span className="font-medium text-primary">Location:</span>{" "}
            {job.location || "N/A"}
          </li>
          <li>
            <span className="font-medium text-primary">Salary:</span>{" "}
            {job.salary ? `Rs ${job.salary}` : "N/A"}
          </li>
          <li>
            <span className="font-medium text-primary">Job Type:</span>{" "}
            {job.jobType || "N/A"}
          </li>
          <li>
            <span className="font-medium text-primary">Category:</span>{" "}
            {job.category || "N/A"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default JobDetails;
