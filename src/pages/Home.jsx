import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/fetchPosts";
import Loader from "../ui/Loader";
import Button from "../ui/Button";
import JobPost from "../components/home/JobPost";
import { useSavedJobs } from "../api/fetchBookMarkedJobs";
import { useSelector } from "react-redux";

const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { isLoading: isBookMarkLoading } = useSavedJobs(currentUser?.uid);
  const [selectedPost, setselectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data,
    isLoading: isPostLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  useEffect(() => {
    if (data && data.length > 0 && selectedPost === null) {
      setselectedPost(data[0]);
    }
  }, [data, selectedPost]);

  const filteredPosts = data?.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isPostLoading || isBookMarkLoading) return <Loader />;
  if (error) return <div>Error loading posts</div>;

  return (
    <>
      <div className="flex flex-col bg-bgc items-center pt-[3rem] px-4">
        <div className="w-full max-w-[600px] mb-8">
          <input
            type="text"
            placeholder="🔍 Search jobs... titles, vibes, and more"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-[#1F2937]/70 backdrop-blur-md text-textLight border border-primary placeholder:text-textMuted focus:outline-none focus:ring-3 focus:ring-sky-500 transition-all duration-300 shadow-md hover:shadow-xl"
          />
        </div>
        <h1 className="text-5xl font-bold text-center mb-8 text-white">
          🚀 Land Your Dream Job Today!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1100px]">
          {/* Job List */}
          <div className="space-y-6">
            {filteredPosts.length === 0 ? (
              <p className="text-textMuted text-center">No jobs found 🔍</p>
            ) : (
              filteredPosts.map((post) => (
                <JobPost
                  key={post.id}
                  post={post}
                  setselectedPost={setselectedPost}
                />
              ))
            )}
          </div>

          {/* Job Details */}
          <div className="post-details w-full md:sticky md:top-[7rem]">
            {selectedPost && (
              <div className="p-6 rounded-2xl bg-cardBg shadow-lg border-2 border-primary space-y-5 animate-fadeIn">
                <h2 className="text-3xl font-extrabold text-textLight flex items-center gap-2">
                  {selectedPost.title} <span className="text-primary">🔥</span>
                </h2>

                <p className="text-md text-textMuted leading-relaxed tracking-wide">
                  {selectedPost.description}
                </p>

                <div className="space-y-2">
                  <p className="text-lg font-semibold text-sky-400">
                    💸 <span className="text-textLight">Salary:</span>{" "}
                    {selectedPost.salary}
                  </p>
                  <p className="text-lg font-semibold text-emerald-400">
                    🏢 <span className="text-textLight">Company:</span>{" "}
                    {selectedPost.company}
                  </p>
                  <p className="text-lg font-semibold text-pink-400">
                    📍 <span className="text-textLight">Location:</span>{" "}
                    {selectedPost.location}
                  </p>
                </div>

                <Link to={`/jobs/${selectedPost.id}`} className="block w-fit">
                  <Button buttonText="Apply Now 🚀" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
