import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { FaBookmark } from "react-icons/fa";
import { addSavedJob, removeSavedJob } from "../../redux/bookMarkedJobsSlice";
import bookMarkAJob from "../../api/bookMarkJob";

const JobPost = ({ post, setselectedPost }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const savedJobIds = useSelector((state) => state.bookmarkedJobs.jobIds);
  const dispatch = useDispatch();

  // check if this specific job is already saved
  const isSaved = savedJobIds.includes(post.id);

  const handleSaveJob = async (e) => {
    e.stopPropagation(); // prevent triggering parent click
    if (!currentUser) {
      alert("Please log in first to save jobs.");
      return;
    }

    const jobId = post.id;

    if (isSaved) {
      const q = query(
        collection(db, "savedJobs"),
        where("userId", "==", currentUser.uid),
        where("jobId", "==", jobId)
      );

      const querySnap = await getDocs(q);

      for (const docu of querySnap.docs) {
        await deleteDoc(doc(db, "savedJobs", docu.id));
      }

      dispatch(removeSavedJob(jobId));

      console.log("job removed from bookmark");
    } else {
      await bookMarkAJob(currentUser.uid, jobId);
      dispatch(addSavedJob(jobId));
    }
  };
  return (
    <div
      key={post.id}
      onClick={() => setselectedPost(post)}
      className="post-card relative bg-white py-4 px-6 mb-4 rounded-md shadow-md hover:shadow-xl cursor-pointer  hover:border-blue-600 border-2 border-transparent"
    >
      {isSaved ? (
        <FaBookmark
          onClick={handleSaveJob}
          className="absolute top-3 right-4 text-2xl text-[#4F46E5]"
        />
      ) : (
        <FaRegBookmark
          onClick={handleSaveJob}
          className="absolute top-3 right-4 text-2xl text-[#4F46E5]"
        />
      )}

      <h3 className="text-xl font-semibold text-blue-600 mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-4">{post.description}</p>
      <div className="flex justify-between items-center">
        <p className="font-bold text-green-600">{post.salary}</p>
      </div>
    </div>
  );
};

export default JobPost;
