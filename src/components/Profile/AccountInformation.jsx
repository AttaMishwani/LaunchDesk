import { doc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { useDispatch } from "react-redux";
import { updateEditedUser } from "../../redux/userSlice";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage } from "../../firebase/firebase"; // make sure storage is exported

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

      if (!uid) {
        console.error("UID not found, cannot update.");
        return;
      }

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
      setEditingMode(false);
      setResumeFile(null);
    } catch (error) {
      console.error("❌ Error updating user info:", error.message);
    }
  };

  const renderField = (label, name) => (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center mb-4">
      <label className="font-medium w-36 text-gray-700">{label}:</label>
      {editingMode ? (
        <input
          type="text"
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <p className="text-gray-800">{formData[name] || "Not provided"}</p>
      )}
    </div>
  );

  const renderResumeSection = () => (
    <div className="flex flex-col sm:flex-row sm:items-center mb-4">
      <label className="font-medium w-36 text-gray-700">Resume:</label>
      {editingMode ? (
        <div className="flex flex-col gap-2">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            className="block"
          />
          {formData.resumeName && !resumeFile && (
            <p className="text-sm text-gray-600">
              Current File : <strong>{formData.resumeName}</strong>
            </p>
          )}
        </div>
      ) : formData.resumeName ? (
        <p>
          Uploaded : <strong>{formData.resumeName}</strong>
        </p>
      ) : (
        <p className="text-gray-500 italic">No resume uploaded</p>
      )}
    </div>
  );

  if (loading || !user)
    return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="p-6 bg-white shadow-xl rounded-lg max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
        Account Information
      </h2>

      <div className="space-y-4">
        {renderField("Username", "username")}
        {renderField("Email", "email")}
        {renderField("Phone", "phone")}

        {renderField("Skills", "skills")}
        {renderField("Bio", "bio")}
        {renderField("GitHub", "github")}
        {renderField("LinkedIn", "linkedin")}
        {renderResumeSection()}
      </div>

      {editingMode ? (
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-md"
          >
            {uploading ? "Uploading..." : "Save Changes"}
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-400 hover:bg-gray-500 transition text-white px-5 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <button
            onClick={handleEdit}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-md"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountInformation;
