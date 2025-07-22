// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPostsPage } from "../api/fetchPosts";
import Loader from "../ui/Loader";
import JobPost from "../components/home/JobPost";
import { useSavedJobs } from "../api/fetchBookMarkedJobs";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { setSavedJobs } from "../redux/bookMarkedJobsSlice";
import SelectedJob from "../components/home/SelectedJob";
import HomeSearchBar from "../components/home/HomeSearchBar";

const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { data: savedJobsIds, isLoading: isBookMarkLoading } = useSavedJobs(
    currentUser?.uid
  );
  const dispatch = useDispatch();
  const [selectedPost, setselectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { ref, inView } = useInView();
  const [sortOptions, setsortOptions] = useState("newest");
  const [sortCategory, setSortCategory] = useState("all");
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
    if (!isBookMarkLoading && savedJobsIds) {
      dispatch(setSavedJobs(savedJobsIds || []));
    }
  }, [isBookMarkLoading, savedJobsIds, dispatch]);

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

  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      sortCategory === "all" || post.category === sortCategory;

    return matchesCategory && matchesSearch;
  });

  const sortedOptions = [...filteredPosts].sort((a, b) => {
    if (sortOptions === "newest") {
      return b.createdAt - a.createdAt;
    } else if (sortOptions === "oldest") {
      return a.createdAt - b.createdAt;
    } else {
      return 0;
    }
  });

  if (isPostLoading || isBookMarkLoading) return <Loader height={true} />;
  if (error) return <div>Error loading posts</div>;

  const categories = [
    {
      categoryName: "All",
      categoryValue: "all",
    },
    {
      categoryName: "Web Development",
      categoryValue: "web-development",
    },
    {
      categoryName: "Data Science",
      categoryValue: "data-science",
    },
    {
      categoryName: "Graphic Design",
      categoryValue: "graphic-design",
    },
    {
      categoryName: "Content Writing",
      categoryValue: "content-writing",
    },
    {
      categoryName: "Digital Marketing",
      categoryValue: "digital-marketing",
    },
    {
      categoryName: "Cyber Security",
      categoryValue: "cyber-security",
    },
    {
      categoryName: "Marketing",
      categoryValue: "marketing",
    },
    {
      categoryName: "Finance",
      categoryValue: "finance",
    },
    {
      categoryName: "Engineering",
      categoryValue: "engineering",
    },
    {
      categoryName: "Healthcare",
      categoryValue: "healthcare",
    },
    {
      categoryName: "Education",
      categoryValue: "education",
    },
    {
      categoryName: "Sales",
      categoryValue: "sales",
    },
    {
      categoryName: "Customer Service",
      categoryValue: "customer-service",
    },
    {
      categoryName: "Human Resources",
      categoryValue: "human-resources",
    },
    {
      categoryName: "IT Support",
      categoryValue: "it-support",
    },
    {
      categoryName: "Project Management",
      categoryValue: "project-management",
    },
    {
      categoryName: "Consulting",
      categoryValue: "consulting",
    },
    {
      categoryName: "Legal",
      categoryValue: "legal",
    },
    {
      categoryName: "Administrative",
      categoryValue: "administrative",
    },
  ];

  return (
    <div className="bg-bgc min-h-screen pt-20 px-4">
      {/* Search & Title */}
      <div className="flex flex-col items-center mb-10">
        <HomeSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="filters flex items-center">
          {" "}
          <div className="mt-4">
            <select
              name=""
              className="bg-cardBg text-textLight border border-textMuted rounded px-4 py-2"
              value={sortOptions}
              onChange={(e) => setsortOptions(e.target.value)}
              id=""
            >
              <option value="newest">Sort by: Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <div className="mt-4">
            <label htmlFor="category-select" className="text-textLight">
              Category:
            </label>
            <select
              name="category"
              value={sortCategory}
              onChange={(e) => setSortCategory(e.target.value)}
              className="bg-cardBg text-textLight border border-textMuted rounded px-4 py-2"
              id="category-select"
            >
              {categories.map((category) => (
                <option
                  key={category.categoryValue}
                  value={category.categoryValue}
                >
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Job List & Details */}
      <div className="flex flex-col-reverse md:flex-row gap-10 max-w-[1200px] mx-auto">
        {/* Job List */}
        <div className="flex-1 space-y-6">
          {filteredPosts.length === 0 ? (
            <p className="text-textMuted text-center">No jobs found 🔍</p>
          ) : (
            sortedOptions.map((post) => (
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
          {selectedPost && <SelectedJob selectedPost={selectedPost} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
