// components/UserDetailsPage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    education: "",
    skills: "",
    bio: "",
    github: "",
    linkedin: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("❌ User not logged in!");
      return;
    }

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const skillsArray = formData.skills
        .split(",")
        .map((skill) => skill.trim());

      await setDoc(userRef, {
        username: formData.username,
        email: currentUser.email,
        phone: formData.phone,
        education: formData.education,
        skills: skillsArray,
        bio: formData.bio,
        github: formData.github,
        linkedin: formData.linkedin,
        type: currentUser.userType || "freelancer",
        uid: currentUser.uid,
      });

      const updatedUserToRedux = {
        username: formData.username,
        email: currentUser.email,
        phone: formData.phone,
        education: formData.education,
        skills: skillsArray,
        bio: formData.bio,
        github: formData.github,
        linkedin: formData.linkedin,
        uid: currentUser.uid,
      };

      dispatch(setUser(updatedUserToRedux));

      alert("✅ Profile updated successfully!");

      navigate("/home");
    } catch (err) {
      alert("Something went wrong while saving profile!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-10">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Complete Your Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="username"
              type="text"
              placeholder="Username *"
              onChange={handleChange}
              required
              className="input"
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              onChange={handleChange}
              className="input"
            />
            <input
              name="education"
              type="text"
              placeholder="Education"
              onChange={handleChange}
              className="input"
            />
            <input
              name="skills"
              type="text"
              placeholder="Skills (comma separated)"
              onChange={handleChange}
              className="input"
            />
            <input
              name="github"
              type="url"
              placeholder="GitHub Profile"
              onChange={handleChange}
              className="input"
            />
            <input
              name="linkedin"
              type="url"
              placeholder="LinkedIn Profile"
              onChange={handleChange}
              className="input"
            />
          </div>

          <textarea
            name="bio"
            placeholder="Short Bio"
            rows={3}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsPage;
