import { auth } from "../../firebase/firebase";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
} from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/userSlice";
import { persistor } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (!email || !password) {
      alert("Please enter your email and password to confirm deletion.");
      return;
    }

    if (email !== currentUser.email) {
      alert("Email does not match your account email.");
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(email, password);

      await reauthenticateWithCredential(user, credential);

      await deleteDoc(doc(db, "users", currentUser.uid));

      await deleteUser(user);

      await signOut(auth);

      dispatch(logoutUser());

      await persistor.purge();

      alert("Account deleted successfully.");

      navigate("/login");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/wrong-password") {
        alert("Incorrect password.");
      } else if (error.code === "auth/user-mismatch") {
        alert("Email does not match current user.");
      } else if (error.code === "auth/too-many-requests") {
        alert("Too many attempts. Please try again later.");
      } else {
        alert("Something went wrong. Check console.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 text-center">
      <h2 className="text-2xl font-bold mb-4 text-red-500">Delete Account</h2>
      <p className="mb-6 text-textMuted">
        This will permanently delete your account and all your data. This action
        cannot be undone.
      </p>

      <div className="input-container flex flex-col">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="w-full max-w-md px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full max-w-md px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
        />
      </div>
      <button
        disabled={loading}
        onClick={handleDeleteAccount}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-lg transition-all duration-300"
      >
        {loading ? "Deleting..." : "Delete My Account"}
      </button>
    </div>
  );
};

export default DeleteAccount;
