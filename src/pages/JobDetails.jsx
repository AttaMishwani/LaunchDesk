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
    dispatch(setResumeURL(convertedLink)); // ✅ save converted previewable link
  };

  function convertGoogleDriveLink(url) {
    const match = url.match(/\/d\/(.*?)\//);
    if (match && match[1]) {
      return `https://drive.google.com/uc?id=${match[1]}`;
    }
    return url; // fallback if not in expected format
  }

  if (loading) return <Loader />;
  if (!job) return <div className="text-center py-12">Job not found.</div>;

  return (
    <div className="mx-auto py-12 px-4 flex flex-col md:flex-row gap-8 w-full max-w-[1300px]">
      {/* Left Side - Resume Link Input */}
      <div className="left w-full md:w-[40%] border-2 border-blue-600 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          Paste Google Drive Resume Link
        </h2>
        <input
          type="url"
          placeholder="https://drive.google.com/..."
          value={resumeLink}
          onChange={handleResumeLinkChange}
          className="w-full border p-2 rounded mb-4"
        />
        <NavLink to={`/screening-questions/${id}`}>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition duration-200 mt-6"
            disabled={!resumeLink}
          >
            Continue
          </button>
        </NavLink>
      </div>

      {/* Right Side - Job Details */}
      <div className="right w-full md:w-[60%] bg-white p-6 rounded-lg">
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
