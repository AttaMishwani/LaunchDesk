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
import { Link } from "react-router-dom";

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
              id: docsnap.id,
              ...appData,
              jobDetails: jobSnap.exists() ? jobSnap.data() : {},
            };
          })
        );
        setApplications(apps);
        console.log(applications);
        console.log("Docs fetched:", querySnapshot.docs.length);
        console.log(
          "Docs:",
          querySnapshot.docs.map((d) => d.data())
        );
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
      <h2 className="text-3xl font-bold text-textLight mb-6">Jobs Applied</h2>

      {loading ? (
        <Loader />
      ) : applications.length === 0 ? (
        <p className="text-gray-500">You haven't applied to any jobs yet.</p>
      ) : (
        applications.map((app) => (
          <div
            key={app.id}
            className="p-4 border border-primary rounded-lg shadow-sm bg-cardBg"
          >
            <h3 className="text-xl font-semibold text-primary">
              {app.jobDetails.title || "Untitled Job"}
            </h3>
            <p className="text-textLight mb-1">
              <strong>Company:</strong> {app.jobDetails.company || "N/A"}
            </p>
            <p className="text-textLight mb-1">
              <strong>Location:</strong> {app.jobDetails.location || "N/A"}
            </p>
            <p className="text-sm text-textLight mb-4">
              <strong>Applied On:</strong>{" "}
              {app.createdAt?.toDate?.().toLocaleDateString() || "Unknown"}
            </p>
            {app.resumeURL && (
              <a
                href={app.resumeURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mr-3 bg-primary text-textLight py-2 px-5 rounded-md"
              >
                View Resume
              </a>
            )}

            <button className="bg-primary text-textLight py-2 px-5 rounded-md">
              {" "}
              <Link to={`/jobpage/${app.jobId}`}> View Job</Link>{" "}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default JobsApplied;
