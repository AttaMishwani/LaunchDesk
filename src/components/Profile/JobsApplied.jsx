import React, { useState } from "react";
import { useSelector } from "react-redux";

import Loader from "../../ui/Loader";
import { Link } from "react-router-dom";
import { fetchApplications } from "../../api/fetchApplications";
import { useQuery } from "@tanstack/react-query";

const JobsApplied = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [tab, setTab] = useState("pending");

  const {
    data: applications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["applications", currentUser?.uid],
    queryFn: () => fetchApplications(currentUser.uid),
    staleTime: 1000 * 60 * 5, // cache for 5 mins
  });

  const pendingApplications = applications.filter(
    (app) => app.jobstatus === "pending"
  );

  const acceptedApplications = applications.filter(
    (app) => app.jobstatus === "accepted"
  );

  const rejecteApplications = applications.filter(
    (app) => app.jobstatus === "rejected"
  );

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-textLight mb-6">Jobs Applied</h2>

      <ul className="flex">
        <li
          onClick={() => setTab("pending")}
          className={`${
            tab === "pending" ? "bg-primary" : "bg-none"
          } py-[10px]  px-5 border-2 border-b-gray-400 border-t-0 border-b-0 hover:bg-primary`}
        >
          PENDING
        </li>
        <li
          onClick={() => setTab("accepted")}
          className={`${
            tab === "accepted" ? "bg-primary" : "bg-none"
          } py-[10px]  px-5 border-2 border-b-gray-400 border-t-0 border-b-0 hover:bg-primary`}
        >
          ACCEPTED
        </li>
        <li
          onClick={() => setTab("rejected")}
          className={`${
            tab === "rejected" ? "bg-primary" : "bg-none"
          } py-[10px]  px-5 border-2 border-b-gray-400 border-t-0 border-b-0 hover:bg-primary`}
        >
          REJECTED
        </li>
      </ul>

      {isLoading ? (
        <Loader />
      ) : (
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
                      <strong>Company:</strong>{" "}
                      {app.jobDetails.company || "N/A"}
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
                      <strong>Company:</strong>{" "}
                      {app.jobDetails.company || "N/A"}
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
                      <strong>Company:</strong>{" "}
                      {app.jobDetails.company || "N/A"}
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
      )}
    </div>
  );
};

export default JobsApplied;
