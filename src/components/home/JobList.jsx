// components/home/JobList.jsx
import React from "react";
import JobPost from "./JobPost";
import Loader from "../../ui/Loader";

const JobList = ({ posts, setselectedPost, ref, isFetching }) => {
  return (
    <div className="flex-1 space-y-6">
      {posts.length === 0 ? (
        <p className="text-textMuted text-center">No jobs found 🔍</p>
      ) : (
        posts.map((post) => (
          <JobPost
            key={post.id}
            post={post}
            setselectedPost={setselectedPost}
          />
        ))
      )}

      <div ref={ref} className="h-10"></div>
      {isFetching && <Loader height={false} />}
    </div>
  );
};

export default JobList;
