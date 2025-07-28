// components/home/JobPost.jsx
import React from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { addSavedJob, removeSavedJob } from "../../redux/bookMarkedJobsSlice";
import bookMarkAJob from "../../api/bookMarkJob";
import { toast } from "react-toastify";

const JobPost = ({ post, setselectedPost }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const savedJobIds = useSelector((state) => state.bookmarkedJobs.jobIds);
  const dispatch = useDispatch();

  const isSaved = savedJobIds.includes(post.id);

  const handleSaveJob = async (e) => {
    e.stopPropagation();
    if (!currentUser) {
      toast.info("Login first to bookmark 🔒");
      return;
    }

    const jobId = post.id;

    if (isSaved) {
      dispatch(removeSavedJob(jobId));
      toast.success("Removed from bookmarks");
      const q = query(
        collection(db, "savedJobs"),
        where("userId", "==", currentUser.uid),
        where("jobId", "==", jobId)
      );
      const querySnap = await getDocs(q);
      for (const docu of querySnap.docs) {
        await deleteDoc(doc(db, "savedJobs", docu.id));
      }
    } else {
      dispatch(addSavedJob(jobId));
      toast.success("Job bookmarked 🔖");
      await bookMarkAJob(currentUser.uid, jobId);
    }
  };

  return (
    <div
      onClick={() => setselectedPost?.(post)}
      className="relative bg-cardBg p-6 rounded-2xl border hover:border-primary shadow transition cursor-pointer"
    >
      {isSaved ? (
        <FaBookmark
          onClick={handleSaveJob}
          className="absolute top-4 right-4 text-2xl text-primary"
        />
      ) : (
        <FaRegBookmark
          onClick={handleSaveJob}
          className="absolute top-4 right-4 text-2xl text-primary"
        />
      )}

      <h3 className="text-2xl font-bold text-primary mb-2">{post.title}</h3>
      <p className="text-textMuted mb-4 line-clamp-3">{post.description}</p>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg text-primary">{post.salary}</p>
        <button
          disabled={currentUser?.type === "Recruiter"}
          className={`text-sm px-3 py-1 rounded-full transition 
    ${
      currentUser?.type === "Recruiter"
        ? "bg-[#103d52] cursor-not-allowed opacity-60"
        : "bg-primary  cursor-pointer"
    } text-white`}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobPost;
