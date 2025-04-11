import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase/firebase";
import { useDispatch } from "react-redux";
import { updateEditedUser } from "../../redux/userSlice";

const AccountInformation = ({ user }) => {
  const [editingMode, setEditingMode] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    uid: user.uid || "",
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    education: user?.education || "",
    skills: user?.skills || "",
    bio: user?.bio || "",
    github: user?.github || "",
    linkedin: user?.linkedin || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setEditingMode(true);
  };

  const handleCancel = () => {
    setEditingMode(false);
  };

  const handleSave = async () => {
    try {
      const { uid, ...dataToUpdate } = formData;

      if (!uid) {
        console.error("UID not found");
        return;
      }

      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, dataToUpdate);

      dispatch(updateEditedUser(formData));
      setEditingMode(false);
      console.log("✅ User info updated successfully");
    } catch (error) {
      console.error("❌ Error updating user info:", error.message);
    }
  };

  const renderField = (label, name) => {
    return (
      <div className="flex flex-col sm:flex-row mb-4">
        <label className="font-semibold w-40">{label}:</label>
        {editingMode ? (
          <input
            type="text"
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="border rounded px-3 py-1 w-full"
          />
        ) : (
          <div>{formData[name] || "Not provided"}</div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">
        Account Information
      </h2>

      {renderField("Username", "username")}
      {renderField("Email", "email")}
      {renderField("Phone", "phone")}
      {renderField("Education", "education")}
      {renderField("Skills", "skills")}
      {renderField("Bio", "bio")}
      {renderField("GitHub", "github")}
      {renderField("LinkedIn", "linkedin")}

      {editingMode ? (
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSave}
            className="bg-green-600 py-2 px-6 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-400 py-2 px-6 text-white rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={handleEdit}
          className="bg-red-500 py-3 px-10 text-white text-1xl rounded-sm"
        >
          Edit Info
        </button>
      )}
    </div>
  );
};

export default AccountInformation;
