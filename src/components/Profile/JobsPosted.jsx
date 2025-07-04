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
import { NavLink } from "react-router-dom";

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

  return (
    <div className="px-4 py-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-textLight mb-6 text-center">
        ✨ Jobs You’ve Posted
      </h2>

      {!jobs ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-2xl border border-primary">
          <table className="min-w-full bg-cardBg text-textLight rounded-xl overflow-hidden">
            <thead className="bg-[#1F2937] text-primary">
              <tr>
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-left">Company</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr
                  key={job.id}
                  className="hover:bg-[#2c3444] transition-all duration-200"
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3 font-medium">{job.title}</td>
                  <td className="px-6 py-3">{job.company}</td>
                  <td className="px-6 py-3 space-x-2">
                    <NavLink to={`/view-job-applicants/${job.id}`}>
                      <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-1.5 rounded-lg text-sm transition">
                        View 🚀
                      </button>
                    </NavLink>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm transition"
                    >
                      {deletingJobId === job.id ? "Deleting..." : "Delete 🗑️"}
                    </button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-8 text-textMuted text-lg"
                  >
                    😕 You haven’t posted any jobs yet.
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
