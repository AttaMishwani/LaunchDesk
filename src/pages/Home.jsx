import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa"; // For star ratings
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/fetchPosts";
import Loader from "../ui/Loader";
import Button from "../ui/Button";

const Home = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const [selectedPost, setselectedPost] = useState(null);

  useEffect(() => {
    if (data && data.length > 0 && selectedPost === null) {
      setselectedPost(data[0]);
    }
  }, [data, selectedPost]);

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading posts</div>;

  return (
    <>
      <div className="flex flex-col items-center pt-[5rem] px-4">
        <h1 className="text-5xl font-bold text-blue-700 text-center mb-8">
          Browse Jobs
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1300px]">
          {/* Job List */}
          <div className="space-y-6">
            {data.map((post) => (
              <div
                key={post.id}
                onClick={() => setselectedPost(post)}
                className="post-card bg-white py-4 px-6 mb-4 rounded-md shadow-md hover:shadow-xl cursor-pointer transition-transform transform hover:scale-105 hover:border-blue-600 border-2 border-transparent"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-700 mb-4">{post.description}</p>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-green-600">${post.salary}</p>
                  <FaStar className="text-yellow-400" />
                </div>
              </div>
            ))}
          </div>

          {/* Job Details */}
          <div className="post-details">
            {selectedPost && (
              <div className="p-6 rounded-md bg-white shadow-md border-2 border-blue-600 space-y-4">
                <h2 className="text-2xl font-bold text-blue-700">
                  {selectedPost.title}
                </h2>
                <p className="text-md text-gray-800">
                  {selectedPost.description}
                </p>

                <p className="text-xl font-semibold text-green-600">
                  Salary: ${selectedPost.salary}
                </p>
                <p className="text-xl font-semibold text-green-600">
                  Company: {selectedPost.company}
                </p>
                <p className="text-xl font-semibold text-green-600">
                  Location: {selectedPost.location}
                </p>

                <Link to={`jobs/${selectedPost.id}`}>
                  <Button buttonText="Apply Now" />
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
