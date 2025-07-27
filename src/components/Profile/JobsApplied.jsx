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
  const [tab, setTab] = useState("pending");
  const [pendingApplications, setpendingApplications] = useState([]);
  const [acceptedApplications, setacceptedApplications] = useState([]);
  const [rejecteApplications, setrejecteApplications] = useState([]);

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
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [currentUser]);

  useEffect(() => {
    if (applications.length > 0) {
      sortApplications();
    }
  }, [applications]);

  const sortApplications = () => {
    const pending = applications.filter((app) => app.jobstatus === "pending");
    setpendingApplications(pending);

    const accepted = applications.filter((app) => app.jobstatus === "accepted");
    setacceptedApplications(accepted);

    const rejected = applications.filter((app) => app.jobstatus === "rejected");
    setrejecteApplications(rejected);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-textLight mb-6">Jobs Applied</h2>

      <ul className="flex">
        <li
          onClick={() => setTab("pending")}
          className="py-[10px]  px-5 border-2 border-b-gray-400 border-t-0 border-b-0 hover:bg-primary"
        >
          PENDING
        </li>
        <li
          onClick={() => setTab("accepted")}
          className="py-[10px]  px-5 border-2 border-b-gray-400 border-t-0 border-b-0 hover:bg-primary"
        >
          ACCEPTED
        </li>
        <li
          onClick={() => setTab("rejected")}
          className="py-[10px]  px-5 border-2 border-b-gray-400 border-t-0 border-b-0 hover:bg-primary"
        >
          REJECTED
        </li>
      </ul>

      <div>
        {tab === "pending" && (
          <ul>
            {pendingApplications.map((app) => {
              return (
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
                    <strong>Location:</strong>{" "}
                    {app.jobDetails.location || "N/A"}
                  </p>
                  <p className="text-sm text-textLight mb-4">
                    <strong>Applied On:</strong>{" "}
                    {app.createdAt?.toDate?.().toLocaleDateString() ||
                      "Unknown"}
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
              );
            })}
          </ul>
        )}
        {tab === "accepted" && (
          <ul>
            {acceptedApplications.map((app) => {
              return (
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
                    <strong>Location:</strong>{" "}
                    {app.jobDetails.location || "N/A"}
                  </p>
                  <p className="text-sm text-textLight mb-4">
                    <strong>Applied On:</strong>{" "}
                    {app.createdAt?.toDate?.().toLocaleDateString() ||
                      "Unknown"}
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
              );
            })}
          </ul>
        )}
        {tab === "rejected" && (
          <ul>
            {rejecteApplications.map((app) => {
              return (
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
                    <strong>Location:</strong>{" "}
                    {app.jobDetails.location || "N/A"}
                  </p>
                  <p className="text-sm text-textLight mb-4">
                    <strong>Applied On:</strong>{" "}
                    {app.createdAt?.toDate?.().toLocaleDateString() ||
                      "Unknown"}
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
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default JobsApplied;
