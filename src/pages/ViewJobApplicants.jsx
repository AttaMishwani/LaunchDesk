import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, auth } from "../firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "../ui/Loader";
import { toast } from "react-toastify";

const ViewJobApplicants = () => {
  const { jobId } = useParams();
  const [user, setUser] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobTitle, setjobTitle] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
        setError("You must be logged in to view applicants.");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchApplicants = async () => {
      if (!user) return;
      setLoading(true);
      setError("");

      try {
        const q = query(
          collection(db, "applications"),
          where("jobId", "==", jobId)
        );

        const querySnapshot = await getDocs(q);

        const filteredApplicants = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter(
            (app) => app.ownerId === user.uid || app.applicantId === user.uid
          );

        setApplicants(filteredApplicants);
      } catch (err) {
        console.error("❌ Error fetching applicants:", err);
        setError("Failed to fetch applicants. Please check your permissions.");
      } finally {
        setLoading(false);
      }
    };

    const fetchJobTitle = async () => {
      if (!jobId) return;
      try {
        const jobDocRef = doc(db, "posts", jobId);
        const jobDocSnap = await getDoc(jobDocRef);

        if (jobDocSnap.exists()) {
          const jobData = jobDocSnap.data();
          setjobTitle(jobData.title || "Untitled Job");
        } else {
          setjobTitle("Job not found");
        }
      } catch (err) {
        console.error("Error fetching job title:", err);
        setjobTitle("Error loading job");
      }
    };
    if (jobId && user) {
      fetchApplicants();
      fetchJobTitle();
    }
  }, [jobId, user]);

  const updateJobStatus = async (applicantId, newstatus) => {
    const applicationRef = doc(db, "applications", applicantId);
    // console.log(applicationRef);
    try {
      const applicationSnap = await getDoc(applicationRef);

      if (!applicationSnap.exists()) {
        toast.error("Application not found.");
        return;
      }
      await updateDoc(applicationRef, {
        jobstatus: newstatus,
      });
      toast.success("application status updated");
      console.log("job status updated succesfully");
    } catch (error) {
      toast.error("failed to update the status");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Applicant for Job <span className="text-indigo-600">{jobTitle}</span>
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      {loading ? (
        <Loader />
      ) : applicants.length > 0 ? (
        <ul className="space-y-5">
          {applicants.map((applicant) => (
            <li
              key={applicant.id}
              className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition"
            >
              <p className="mb-2">
                <strong className="text-indigo-600">Email:</strong>{" "}
                <span className="text-gray-700">
                  {applicant.userInfo?.email || "N/A"}
                </span>
              </p>
              <div className="mb-2">
                <strong className="text-indigo-600">Answers:</strong>
                {Array.isArray(applicant.answers?.QA) &&
                applicant.answers.QA.length > 0 ? (
                  <ul className="list-disc ml-5 text-gray-700 mt-1">
                    {applicant.answers.QA.map((qa, idx) => (
                      <li key={idx}>
                        <span className="font-semibold">Q:</span> {qa.question}
                        <br />
                        <span className="font-semibold">A:</span> {qa.answer}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 ml-2">No answers provided</p>
                )}
              </div>

              <p>
                <strong className="text-indigo-600">Resume:</strong>{" "}
                {applicant.resumeURL ? (
                  <a
                    href={applicant.resumeURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 underline hover:text-indigo-800"
                  >
                    View
                  </a>
                ) : (
                  <span className="text-gray-500">Not uploaded</span>
                )}
              </p>
              {applicant.jobstatus === "accepted" && (
                <p>application accepted</p>
              )}
              {applicant.jobstatus === "rejected" && (
                <p>application rejected</p>
              )}
              {applicant.jobstatus === "pending" && (
                <div className="flex flex-row mt-3">
                  <p>Set Application Status: </p>
                  <button
                    onClick={() => updateJobStatus(applicant.id, "accepted")}
                    className="bg-green-400 text-white py-1 px-3 font-bold rounded-sm mx-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateJobStatus(applicant.id, "rejected")}
                    className="bg-red-500 text-white py-1 px-3 font-bold rounded-sm mx-2"
                  >
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-gray-500 text-center">No applicants found.</p>
      )}
    </div>
  );
};

export default ViewJobApplicants;
