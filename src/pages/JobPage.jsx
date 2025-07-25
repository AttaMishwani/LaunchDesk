import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobById } from "../api/fetchJobById";
import Loader from "../ui/Loader";

const JobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      const data = await fetchJobById(id);
      if (data) {
        setJob(data);
      } else {
        console.log("job ka data nhi mila bro");
      }
      setLoading(false);
    };

    fetchJob();
  }, [id]);

  if (loading) return <Loader height={true} />;
  if (!job)
    return <p className="text-center text-red-500 py-10">Job not found.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-textLight">
      <div className="bg-cardBg p-6 rounded-lg shadow-md border border-gray-700">
        <h1 className="text-3xl font-bold text-primary mb-4">{job.title}</h1>

        <div className="space-y-2 mb-6">
          <p>
            <strong className="text-textMuted">Company:</strong> {job.company}
          </p>
          <p>
            <strong className="text-textMuted">Location:</strong> {job.location}
          </p>
          <p>
            <strong className="text-textMuted">Salary:</strong> {job.salary}
          </p>
          <p>
            <strong className="text-textMuted">Job Type:</strong> {job.jobType}
          </p>
          <p>
            <strong className="text-textMuted">Work Mode:</strong>{" "}
            {job.workMode}
          </p>
          <p>
            <strong className="text-textMuted">Experience Level:</strong>{" "}
            {job.experienceLevel}
          </p>
          <p>
            <strong className="text-textMuted">Category:</strong> {job.category}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-primary mb-2">
            Job Description
          </h2>
          <p className="text-textLight leading-relaxed">{job.description}</p>
        </div>

        {job.questions?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Screening Questions
            </h2>
            <ul className="list-disc list-inside space-y-1 text-textLight">
              {job.questions.map((q, index) => (
                <li key={index}>{q}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 border-t border-gray-700 pt-4 text-sm text-textMuted">
          <p>
            <strong>Posted by:</strong> {job.postedBy?.name || "Unknown"} (
            {job.postedBy?.email})
          </p>
          <p>
            <strong>Posted on:</strong>{" "}
            {job.createdAt?.toDate?.().toLocaleDateString() || "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
