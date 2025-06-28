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
import { db } from "../../firebase/firebase";
import Loader from "../../ui/Loader";

const JobsApplied = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!currentUser) return;
      setLoading(true);

      try {
        const q = query(
          collection(db, "applications"),
          where("applicantId", "==", currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        const apps = await Promise.all(
          querySnapshot.docs.map(async (docsnap) => {
            const appData = docsnap.data();
            const jobRef = doc(db, "posts", appData.jobId);
            const jobSnap = await getDoc(jobRef);

            return {
              id: docsnap.data(),
              ...appData,
              jobDetails: jobSnap.exists() ? jobSnap.data() : {},
            };
          })
        );
        setApplications(apps);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [currentUser]);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Jobs Applied</h2>

      {loading ? (
        <Loader />
      ) : applications.length === 0 ? (
        <p className="text-gray-500">You haven't applied to any jobs yet.</p>
      ) : (
        applications.map((app) => (
          <div
            key={app.id}
            className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
          >
            <h3 className="text-xl font-semibold text-blue-600">
              {app.jobDetails.title || "Untitled Job"}
            </h3>
            <p className="text-gray-700 mb-1">
              <strong>Company:</strong> {app.jobDetails.company || "N/A"}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Location:</strong> {app.jobDetails.location || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Applied On:</strong>{" "}
              {app.createdAt?.toDate?.().toLocaleDateString() || "Unknown"}
            </p>
            {app.resumeURL && (
              <a
                href={app.resumeURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm mt-2 inline-block"
              >
                View Resume
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default JobsApplied;
