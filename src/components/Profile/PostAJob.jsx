import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase/firebase";
import { useSelector } from "react-redux";
import Loader from "../../ui/Loader";
import Popup from "../../ui/Popup";
// categories ,  jobTypes .experienceLevels ,pakistaniCities
import {
  categories,
  jobTypes,
  experienceLevels,
  pakistaniCities,
} from "../../utils/SearchAndFilterData/SearchAndFilterData";

const PostAJob = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(false);
  const [showPopUp, setshowPopUp] = useState(false);
  const [location, setLocation] = useState("");
  const [workMode, setWorkMode] = useState("");

  const [jobData, setjobData] = useState({
    title: "",
    description: "",
    location: "",
    workMode: "",
    company: "",
    salary: "",
    experienceLevel: "",
    jobType: "",
    category: "",
    questions: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setjobData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim all string fields to handle whitespace-only inputs
    const trimmedJobData = {
      title: jobData.title.trim(),
      description: jobData.description.trim(),
      location: jobData.location.trim(),
      company: jobData.company.trim(),
      salary: jobData.salary.trim(),
      category: jobData.category.trim(),
      experienceLevel: jobData.experienceLevel.trim(),
      jobType: jobData.jobType.trim(),
      questions: jobData.questions,
      workMode: jobData.workMode.trim(),
    };

    const {
      title,
      description,
      location,
      company,
      salary,
      experienceLevel,
      workMode,
      jobType,
      category,
      questions,
    } = trimmedJobData;

    if (
      !title ||
      !description ||
      !location ||
      !company ||
      !salary ||
      !experienceLevel ||
      !jobType ||
      !category ||
      !workMode
    ) {
      alert("Yo! Fill in all the fields first 😤");
      return;
    }

    setLoading(true);
    try {
      // Explicitly construct the document object instead of spreading jobData
      const jobDocument = {
        title,
        description,
        location,
        company,
        salary,
        experienceLevel,
        workMode,
        jobType,
        category,
        questions: questions.filter((q) => q.trim() !== ""),
        createdAt: serverTimestamp(),
        ownerId: currentUser.uid,
        postedBy: {
          uid: currentUser.uid,
          email: currentUser.email,
          name: currentUser.username,
        },
      };

      await addDoc(collection(db, "posts"), jobDocument);

      setjobData({
        title: "",
        description: "",
        location: "",
        company: "",
        salary: "",
        experienceLevel: "",
        workMode: "",
        jobType: "",
        category: "",
        questions: [""],
      });
    } catch (error) {
      console.error("🔥 Error posting job:", error);
      alert("Failed to post job. Please try again.");
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

  const removeQuestionField = (index) => {
    if (jobData.questions.length > 1) {
      const updatedQuestions = jobData.questions.filter((_, i) => i !== index);
      setjobData((prev) => ({ ...prev, questions: updatedQuestions }));
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

            {/* category */}
            <label
              htmlFor="category"
              className="block text-sm font-medium text-textLight mb-1"
            >
              📁 Category
            </label>
            <select
              onChange={handleChange}
              value={jobData.category}
              name="category"
              id="category"
              className="bg-[#1f2937] border border-primary text-textLight rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
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

            {/* jobType */}
            <label
              htmlFor="jobType"
              className="block text-sm font-medium text-textLight mb-1"
            >
              💼 Job Type
            </label>
            <select
              id="jobType"
              onChange={handleChange}
              name="jobType"
              value={jobData.jobType}
              className="bg-[#1f2937] border border-primary text-textLight rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {jobTypes.map((type) => (
                <option key={type.typeValue} value={type.typeValue}>
                  {type.typeName}
                </option>
              ))}
            </select>

            {/* experienceLevel */}
            <label
              htmlFor="experienceLevel"
              className="block text-sm font-medium text-textLight mb-1"
            >
              📈 Experience Level
            </label>
            <select
              id="experienceLevel"
              name="experienceLevel"
              onChange={handleChange}
              value={jobData.experienceLevel}
              className="bg-[#1f2937] border border-primary text-textLight rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {experienceLevels.map((level) => (
                <option key={level.levelValue} value={level.levelValue}>
                  {level.levelName}
                </option>
              ))}
            </select>

            {/* Work Mode Checkboxes */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-textLight mb-2">
                Work Mode
              </label>
              <div className="flex flex-wrap gap-6 items-center">
                <label className="flex items-center gap-2 text-textMuted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={workMode === "remote"}
                    onChange={() => {
                      setWorkMode("remote");
                      setjobData((prev) => ({
                        ...prev,
                        workMode: "remote",
                        location: "Remote",
                      }));
                    }}
                    className="accent-primary w-4 h-4"
                  />
                  Remote
                </label>

                <label className="flex items-center gap-2 text-textMuted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={workMode === "onsite"}
                    onChange={() => {
                      setWorkMode("onsite");
                      setjobData((prev) => ({
                        ...prev,
                        workMode: "onsite",
                        location: "",
                      }));
                    }}
                    className="accent-primary w-4 h-4"
                  />
                  Onsite
                </label>

                {workMode === "onsite" && (
                  <select
                    name="location"
                    value={jobData.location}
                    onChange={handleChange}
                    className="mt-3 sm:mt-0 sm:ml-4 bg-[#1f2937] border border-primary text-textLight rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition w-full sm:w-auto"
                  >
                    <option value="">Select City</option>
                    {pakistaniCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <h2 className="text-lg font-semibold mt-4 text-textMuted">
              🧠 Optional Screening Questions
            </h2>

            {jobData.questions.map((question, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  placeholder={`❓ Question ${index + 1}`}
                  className="flex-1 bg-[#1f2937] border border-gray-600 text-textLight rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-textMuted"
                />
                {jobData.questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestionField(index)}
                    className="text-red-400 hover:text-red-300 p-2 transition"
                    title="Remove question"
                  >
                    🗑️
                  </button>
                )}
              </div>
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
              disabled={loading}
              className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 text-white px-6 py-3 rounded-xl mt-6 font-bold shadow"
            >
              {loading ? "Posting..." : "Submit Job"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default PostAJob;
