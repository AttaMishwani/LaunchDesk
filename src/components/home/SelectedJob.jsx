import React from "react";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";

const SelectedJob = ({ selectedPost }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div className="sticky top-10 ">
      <div className="p-6 rounded-2xl bg-cardBg shadow-lg border-2 border-primary space-y-5 animate-fadeIn">
        <h2 className="text-3xl font-extrabold border-b-2 border-primary pb-5 text-textLight flex items-center gap-2">
          {selectedPost.title}
        </h2>

        <div className="max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
          <p className="text-md text-textMuted leading-relaxed tracking-wide">
            {selectedPost.description}
          </p>

          <p className="text-lg font-semibold mt-5 text-textLight">
            Salary:
            <span className="text-primary"> {selectedPost.salary}</span>
          </p>
          <p className="text-lg font-semibold text-textLight ">
            Company:
            <span className="text-primary"> {selectedPost.company}</span>
          </p>
          <p className="text-lg font-semibold text-textLight ">
            Location:
            <span className="text-primary"> {selectedPost.location}</span>
          </p>
          <p className="text-lg font-semibold text-textLight ">
            Experience Level:
            <span className="text-primary">
              {selectedPost.experienceLevel
                ? selectedPost.experienceLevel
                : "Not specified"}
            </span>
          </p>
          <p className="text-lg font-semibold text-textLight ">
            Job Type:
            <span className="text-primary">
              {selectedPost.jobType ? selectedPost.jobType : "Not specified"}
            </span>
          </p>
        </div>

        <Link to={`/jobs/${selectedPost.id}`} className="block w-fit">
          <Button userType={"Recruiter"} buttonText="Apply Now 🚀" />
        </Link>
      </div>
    </div>
  );
};

export default SelectedJob;
