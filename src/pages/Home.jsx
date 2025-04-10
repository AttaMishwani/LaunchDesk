import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa"; // For star ratings
import { Link } from "react-router-dom";
import addPost from "../Posts/addPost";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/fetchPosts";
import Loader from "../ui/Loader";

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
      <div
        className="flex   pt-[5rem] justify-center 
      flex-col gap-4 w-full items-center"
      >
        <h1 className="text-center text-5xl font-bold">Browse Jobs</h1>
        <div className="flex justify-center gap-4 w-full max-w-[1300px] border-2 border-red-600 ">
          <div className="post-list min-h-[20rem] min-w-[48%]  ">
            {data.map((post) => {
              return (
                <div
                  key={post.id}
                  onClick={() => setselectedPost(post)}
                  className="post-card bg-white py-3 px-2 mb-4 flex justify-center flex-col rounded-md shadow-md hover:shadow-xl cursor-pointer min-h-[16rem] border-2 border-blue-600"
                >
                  <h3 className=" font-semibold text-blue-600 mb-2 text-3xl">
                    {post.title}
                  </h3>

                  <p className="text-gray-700 mb-4">{post.ShortDescription}</p>

                  <p className="font-bold text-green-600">${post.price}</p>
                </div>
              );
            })}
          </div>
          <div className="post-details  min-h-[20rem] min-w-[48%] ">
            {selectedPost && (
              <div className="p-6 fixed rounded-md bg-white shadow-md border-2 border-blue-600">
                <h2 className="text-2xl font-bold text-blue-700 mb-4">
                  {selectedPost.title}
                </h2>
                <p className="text-gray-800 text-md mb-6">
                  {selectedPost.ShortDescription}
                </p>
                <p className="text-gray-800 text-md mb-6">
                  {selectedPost.BriefDescription}
                </p>
                <p className="text-green-600 text-xl font-semibold">
                  Price: ${selectedPost.price}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
