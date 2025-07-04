import { doc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db, storage } from "../../firebase/firebase";
import { useDispatch } from "react-redux";
import { updateEditedUser } from "../../redux/userSlice";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { toast } from "react-toastify";

const AccountInformation = ({ user }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    uid: "",
    username: "",
    email: "",
    phone: "",
    skills: "",
    bio: "",
    github: "",
    linkedin: "",
    resumeName: "",
    resumeURL: "",
  });

  const [editingMode, setEditingMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        uid: user.uid || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        skills: user.skills || "",
        bio: user.bio || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
        resumeName: user.resumeName || "",
        resumeURL: user.resumeURL || "",
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleEdit = () => setEditingMode(true);

  const handleCancel = () => {
    if (user) {
      setFormData({
        uid: user.uid || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        skills: user.skills || "",
        bio: user.bio || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
        resumeName: user.resumeName || "",
        resumeURL: user.resumeURL || "",
      });
    }
    setEditingMode(false);
    setResumeFile(null);
  };

  const handleSave = async () => {
    try {
      const { uid, ...dataToUpdate } = formData;
      if (!uid) return toast.error("User not found.");

      if (resumeFile) {
        setUploading(true);
        const resumeRef = ref(storage, `resumes/${uid}/${resumeFile.name}`);
        await uploadBytes(resumeRef, resumeFile);
        const downloadURL = await getDownloadURL(resumeRef);
        dataToUpdate.resumeURL = downloadURL;
        dataToUpdate.resumeName = resumeFile.name;

        setFormData((prev) => ({
          ...prev,
          resumeURL: downloadURL,
          resumeName: resumeFile.name,
        }));
        setUploading(false);
      }

      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, dataToUpdate);

      dispatch(updateEditedUser({ ...formData, ...dataToUpdate }));
      toast.success("Profile updated successfully 🎉");
      setEditingMode(false);
      setResumeFile(null);
    } catch (error) {
      toast.error("Failed to update profile 😓");
      console.error("Error:", error.message);
    }
  };

  const renderField = (label, name, icon = "") => (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-textMuted mb-1">
        {icon} {label}
      </label>
      {editingMode ? (
        <input
          type="text"
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={`Enter your ${label.toLowerCase()}`}
          className="bg-[#1F2937] text-textLight border border-primary rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      ) : (
        <p className="text-textLight">{formData[name] || "Not provided"}</p>
      )}
    </div>
  );

  const renderResumeSection = () => (
    <div className="flex flex-col">
      <label className="text-sm text-textMuted mb-1">📎 Resume</label>
      {editingMode ? (
        <div className="flex flex-col gap-2">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            className="text-sm text-textLight"
          />
          {formData.resumeName && !resumeFile && (
            <p className="text-xs text-gray-400">
              Current: <strong>{formData.resumeName}</strong>
            </p>
          )}
        </div>
      ) : formData.resumeName ? (
        <a
          href={formData.resumeURL}
          target="_blank"
          rel="noreferrer"
          className="text-sky-400 underline text-sm"
        >
          View {formData.resumeName}
        </a>
      ) : (
        <p className="text-gray-500 italic">No resume uploaded</p>
      )}
    </div>
  );

  if (loading || !user)
    return (
      <div className="text-center mt-10 text-textLight">
        ⏳ Loading profile...
      </div>
    );

  return (
    <div className="bg-cardBg text-textLight shadow-xl border border-primary rounded-2xl p-8 max-w-3xl mx-auto mt-10 animate-fadeIn">
      <h2 className="text-3xl font-extrabold mb-6 text-primary">
        👤 Your Profile
      </h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {renderField("Username", "username", "👾")}
        {renderField("Email", "email", "📧")}
        {renderField("Phone", "phone", "📱")}
        {renderField("Skills", "skills", "💡")}
        {renderField("Bio", "bio", "🧠")}
        {renderField("GitHub", "github", "🐙")}
        {renderField("LinkedIn", "linkedin", "💼")}
        {renderResumeSection()}
      </div>

      {editingMode ? (
        <div className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={handleSave}
            className="bg-emerald-500 hover:bg-emerald-600 transition text-white px-6 py-2 rounded-md shadow"
          >
            {uploading ? "Uploading..." : "💾 Save"}
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-600 hover:bg-gray-700 transition text-white px-6 py-2 rounded-md shadow"
          >
            🚫 Cancel
          </button>
        </div>
      ) : (
        <div className="mt-8">
          <button
            onClick={handleEdit}
            className="bg-sky-600 hover:bg-sky-700 transition text-white px-6 py-2 rounded-md shadow"
          >
            ✏️ Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountInformation;
