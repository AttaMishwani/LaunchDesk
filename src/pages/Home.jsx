// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPostsPage } from "../api/fetchPosts";
import Loader from "../ui/Loader";
import Button from "../ui/Button";
import JobPost from "../components/home/JobPost";
import { useSavedJobs } from "../api/fetchBookMarkedJobs";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { isLoading: isBookMarkLoading } = useSavedJobs(currentUser?.uid);
  const [selectedPost, setselectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { ref, inView } = useInView();

  const {
    data,
    isLoading: isPostLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPostsPage,
    getNextPageParam: (lastPage) => lastPage.lastVisible || undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    const all = data?.pages.flatMap((page) => page.posts) || [];
    if (all.length > 0 && selectedPost === null) {
      setselectedPost(all[0]);
    }
  }, [data, selectedPost]);

  const allPosts = data?.pages.flatMap((page) => page.posts) || [];

  const filteredPosts = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isPostLoading || isBookMarkLoading) return <Loader height={true} />;
  if (error) return <div>Error loading posts</div>;

  return (
    <div className="bg-bgc min-h-screen pt-20 px-4">
      {/* Search & Title */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-full max-w-[600px] mb-6">
          <input
            type="text"
            placeholder="🔍 Search jobs... titles, vibes, and more"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-[#1F2937]/70 backdrop-blur-md text-textLight border border-primary placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 shadow-md hover:shadow-xl"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-center text-textLight">
          🚀 Land Your Dream Job Today!
        </h1>
      </div>

      {/* Job List & Details */}
      <div className="flex flex-col-reverse md:flex-row gap-10 max-w-[1200px] mx-auto">
        {/* Job List */}
        <div className="flex-1 space-y-6">
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

          {/* Infinite scroll loader */}
          <div ref={ref} className="h-10"></div>
          {isFetchingNextPage && <Loader height={false} />}
        </div>

        {/* Sticky Job Details */}
        <div className="w-full md:w-[500px]">
          {selectedPost && (
            <div className="sticky top-10">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
