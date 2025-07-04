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
