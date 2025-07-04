import React from "react";
import { useSelector } from "react-redux";
import JobPost from "../components/home/JobPost";
import Loader from "../ui/Loader";
import { useSavedJobDetails } from "../api/useSavedJobDetails";

const SavedJobs = () => {
  const savedJobIds = useSelector((state) => state.bookmarkedJobs.jobIds);

  const {
    data: savedJobs = [],
    isLoading,
    isError,
  } = useSavedJobDetails(savedJobIds);

  if (isError)
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-sm m-5">
        <strong className="font-semibold">Oops!</strong> Failed to load
        bookmarked jobs.
        <p className="text-sm mt-1">
          Please try again later or check your internet connection.
        </p>
      </div>
    );
  return (
    <>
      <div className="w-full max-w-[1300px] py-5  mx-auto">
        <h2 className="text-2xl font-bold mb-5">Saved Jobs</h2>
        <hr className="mb-8" />
        <div className="job-post-container w-full flex flex-col">
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
      </div>
    </>
  );
};

export default SavedJobs;
