import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Loader from "../../ui/Loader";

const JobsPosted = () => {
  const [jobs, setJobs] = useState(null);
  const user = auth.currentUser;
  const [deletingJobId, setDeletingJobId] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const postsRef = collection(db, "posts");
        const q = query(postsRef, where("ownerId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const jobsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setJobs(jobsData);
        console.log("✅ All jobs set to state:", jobsData);
      } catch (error) {
        console.error("❌ Error fetching jobs:", error);
      }
    };

    if (user?.uid) {
      fetchJobs();
    }
  }, [user]);

  const handleDelete = async (jobId) => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;

    setDeletingJobId(jobId);

    try {
      await deleteDoc(doc(db, "posts", jobId));
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      console.log(`🗑️ Job with ID ${jobId} deleted.`);
    } catch (error) {
      console.error("❌ Error deleting job:", error);
    } finally {
      setDeletingJobId(false);
    }
  };

  const handleViewApplications = (jobId) => {
    alert(`🔍 View applications for job ID: ${jobId}`);
  };

  return (
    <div className="p-4">
      {!jobs ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Job Title</th>
                <th className="px-4 py-2 border">Company</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job.id} className="text-center hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{job.title}</td>
                  <td className="px-4 py-2 border">{job.company}</td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => handleViewApplications(job.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                    >
                      View Applications
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                    >
                      {deletingJobId === job.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    No jobs posted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobsPosted;
