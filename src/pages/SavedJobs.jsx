import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebase";
import { data } from "react-router-dom";
import JobPost from "../components/home/JobPost";

const SavedJobs = () => {
  const savedJobIds = useSelector((state) => state.bookmarkedJobs.jobIds);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(savedJobIds);
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        setLoading(true);

        const jobs = await Promise.all(
          savedJobIds.map(async (jobId) => {
            const docRef = doc(db, "posts", jobId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              return { id: docSnap.id, ...docSnap.data() };
            } else {
              return null;
            }
          })
        );

        const filteredJobs = jobs.filter((job) => job !== null);
        setSavedJobs(filteredJobs);
        console.log("Saved Jobs:", filteredJobs);
      } catch (error) {
        console.error("Failed to fetch saved job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, [savedJobIds]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : savedJobs.length === 0 ? (
        <p>No jobs bookmarked yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedJobs.map((job) => (
            <JobPost key={job.id} post={job} />
          ))}
        </div>
      )}
    </>
  );
};

export default SavedJobs;
