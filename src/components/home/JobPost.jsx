import { current } from "@reduxjs/toolkit";
import React from "react";
import { FaRegBookmark } from "react-icons/fa";
import { useSelector } from "react-redux";
import savedJobs from "../../api/saveJob";

const JobPost = ({ post, setselectedPost }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleSaveJob = () => {
    if (!currentUser) {
      alert("Please log in first to save jobs.");
      return;
    }
    console.log(currentUser.uid, post.id);
    savedJobs(currentUser.uid, post.id);
  };
  return (
    <div
      key={post.id}
      onClick={() => setselectedPost(post)}
      className="post-card relative bg-white py-4 px-6 mb-4 rounded-md shadow-md hover:shadow-xl cursor-pointer  hover:border-blue-600 border-2 border-transparent"
    >
      <FaRegBookmark
        onClick={handleSaveJob}
        className="absolute top-3 right-4 text-2xl text-[#4F46E5]"
      />
      <h3 className="text-xl font-semibold text-blue-600 mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-4">{post.description}</p>
      <div className="flex justify-between items-center">
        <p className="font-bold text-green-600">{post.salary}</p>
      </div>
    </div>
  );
};

export default JobPost;
