// pages/SavedJobs.jsx
import React from "react";
import { useSelector } from "react-redux";
import JobPost from "../components/home/JobPost";
import Loader from "../ui/Loader";
import { useSavedJobDetails } from "../api/useSavedJobDetails";

const SavedJobs = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const {
    data: savedJobs = [],
    isLoading,
    isError,
  } = useSavedJobDetails(currentUser?.uid);

  if (isError)
    return (
      <div className="text-red-600 text-center mt-4">
        ❌ Failed to load saved jobs.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-5">Saved Jobs</h2>
      {isLoading ? (
        <Loader />
      ) : savedJobs.length === 0 ? (
        <p>You haven’t liked anything yet 😴</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedJobs.map((job) => (
            <JobPost key={job.id} post={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
