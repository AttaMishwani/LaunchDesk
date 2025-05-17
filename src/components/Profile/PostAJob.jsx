import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
import Loader from "../../ui/Loader";
import Popup from "../../ui/Popup";

const PostAJob = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(false);

  const [showPopUp, setshowPopUp] = useState(false);

  const [jobData, setjobData] = useState({
    title: "",
    description: "",
    location: "",
    company: "",
    salary: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setjobData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await addDoc(collection(db, "posts"), {
        ...jobData,
        createdAt: serverTimestamp(),
        ownerId: currentUser.uid,
        postedBy: {
          uid: currentUser.uid,
          email: currentUser.email,
          name: currentUser.username,
        },
      });

      console.log("job posted to posts collection successfully");

      setjobData({
        title: "",
        description: "",
        location: "",
        company: "",
        salary: "",
      });
    } catch (error) {
      console.error("Error posting job:", error);
    }

    setLoading(false);
    setshowPopUp(true);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-md">
      <Popup showPopUp={showPopUp} setshowPopUp={setshowPopUp} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Post a Job</h1>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              placeholder="Job Title"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Job Description"
              value={jobData.description}
              name="description"
              onChange={handleChange}
              rows={5}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              placeholder="Location"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="company"
              onChange={handleChange}
              value={jobData.company}
              placeholder="Company Name"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="salary"
              onChange={handleChange}
              value={jobData.salary}
              placeholder="Salary Range"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Submit Job
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default PostAJob;
