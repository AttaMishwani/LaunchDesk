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
      toast.success("Removed from your vibe list 💔");
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
      toast.success("Job saved 🔖 Let's go!");
      await bookMarkAJob(currentUser.uid, jobId);
    }
  };

  return (
    <div
      key={post.id}
      onClick={() => setselectedPost(post)}
      className="post-card relative bg-cardBg text-textLight p-6 rounded-2xl border-2 border-transparent hover:border-primary hover:shadow-xl cursor-pointer transition-all duration-300 ease-in-out group"
    >
      {/* Bookmark Icon */}
      {isSaved ? (
        <FaBookmark
          onClick={handleSaveJob}
          className="absolute top-4 right-4 text-2xl text-primary hover:scale-125 transition-transform"
        />
      ) : (
        <FaRegBookmark
          onClick={handleSaveJob}
          className="absolute top-4 right-4 text-2xl text-primary hover:scale-125 transition-transform"
        />
      )}

      {/* Title */}
      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary">
        {post.title}
      </h3>

      {/* Description */}
      <p className="text-textMuted mb-4 line-clamp-3">{post.description}</p>

      {/* Salary */}
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg text-sky-400">💰 {post.salary}</p>
        <span className="text-sm bg-primary text-white px-3 py-1 rounded-full shadow hover:scale-105 transition-transform">
          Apply Now
        </span>
      </div>
    </div>
  );
};

export default JobPost;
