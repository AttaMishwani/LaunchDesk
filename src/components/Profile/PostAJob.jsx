import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase/firebase";
import { useSelector } from "react-redux";
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
    questions: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setjobData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, location, company, salary } = jobData;
    if (!title || !description || !location || !company || !salary) {
      alert("Yo! Fill in all the fields first 😤");
      return;
    }

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

      setjobData({
        title: "",
        description: "",
        location: "",
        company: "",
        salary: "",
        questions: [""],
      });
    } catch (error) {
      console.error("🔥 Error posting job:", error);
    }

    setLoading(false);
    setshowPopUp(true);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...jobData.questions];
    updatedQuestions[index] = value;
    setjobData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const addQuestionField = () => {
    if (jobData.questions.length < 5) {
      setjobData((prev) => ({
        ...prev,
        questions: [...prev.questions, ""],
      }));
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-3xl mx-auto mt-10 bg-cardBg text-textLight rounded-2xl shadow-lg border border-primary animate-fadeIn">
      <Popup showPopUp={showPopUp} setshowPopUp={setshowPopUp} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-6 text-primary">
            🚀 Let's Post That Job!
          </h1>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              placeholder="💼 Job Title"
              className="bg-[#1f2937] border border-primary text-textLight rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-textMuted"
            />

            <textarea
              placeholder="📝 Job Description"
              value={jobData.description}
              name="description"
              onChange={handleChange}
              rows={5}
              className="bg-[#1f2937] border border-primary text-textLight rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-textMuted"
            />

            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              placeholder="📍 Location"
              className="bg-[#1f2937] border border-primary text-textLight rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-textMuted"
            />

            <input
              type="text"
              name="company"
              onChange={handleChange}
              value={jobData.company}
              placeholder="🏢 Company Name"
              className="bg-[#1f2937] border border-primary text-textLight rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-textMuted"
            />

            <input
              type="text"
              name="salary"
              onChange={handleChange}
              value={jobData.salary}
              placeholder="💰 Salary Range"
              className="bg-[#1f2937] border border-primary text-textLight rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-textMuted"
            />

            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option className="text-black" value="">
                All Categories
              </option>
              <option className="text-black" value="design">
                Design
              </option>
              <option className="text-black" value="marketing">
                Marketing
              </option>
              <option className="text-black" value="development">
                Development
              </option>
              <option className="text-black" value="writing">
                Writing
              </option>
              <option className="text-black" value="sales">
                Sales
              </option>
              <option className="text-black" value="support">
                Customer Support
              </option>
              <option className="text-black" value="finance">
                Finance
              </option>
            </select>

            <label
              htmlFor="jobType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Type
            </label>
            <select
              id="jobType"
              className="w-full p-2 border border-gray-300 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option className="text-black" value="">
                All Types
              </option>
              <option className="text-black" value="full-time">
                Full-time
              </option>
              <option className="text-black" value="part-time">
                Part-time
              </option>
              <option className="text-black" value="contract">
                Contract
              </option>
              <option className="text-black" value="internship">
                Internship
              </option>
              <option className="text-black" value="temporary">
                Temporary
              </option>
              <option className="text-black" value="freelance">
                Freelance
              </option>
            </select>

            <label
              htmlFor="experienceLevel"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Experience Level
            </label>
            <select
              id="experienceLevel"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Levels</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
              <option value="expert">Expert</option>
            </select>

            <h2 className="text-lg font-semibold mt-4 text-textMuted">
              🧠 Optional Screening Questions
            </h2>

            {jobData.questions.map((question, index) => (
              <input
                key={index}
                type="text"
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                placeholder={`❓ Question ${index + 1}`}
                className="bg-[#1f2937] border border-gray-600 text-textLight rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-textMuted"
              />
            ))}

            {jobData.questions.length < 5 && (
              <button
                type="button"
                onClick={addQuestionField}
                className="text-primary hover:underline text-sm mt-1 transition"
              >
                ➕ Add another question
              </button>
            )}

            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-primary hover:bg-primary/90 transition duration-200 text-white px-6 py-3 rounded-xl mt-6 font-bold shadow"
            >
              ✨ Submit Job
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default PostAJob;
