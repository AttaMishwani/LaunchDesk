import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { closeMenu } from "../redux/menuSlice";
import AccountInformation from "../components/Profile/AccountInformation";
import DeleteAccount from "../components/Profile/DeleteAccount";
import PostAJob from "../components/Profile/PostAJob";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser } from "../redux/userSlice";
import { db } from "../firebase/firebase";
import JobsPosted from "../components/Profile/JobsPosted";
import JobsApplied from "../components/Profile/JobsApplied";
import { persistor } from "../redux/store";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [selectedOption, setSelectedOption] = useState("👤 Account Info");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && !currentUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(docRef);
        if (userDoc.exists()) {
          dispatch(setUser(userDoc.data()));
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch, currentUser]);

  const getOptionsByRole = (role) => {
    if (role === "JobSeeker") {
      return ["👤 Account Info", "🗑️ Delete Account", "📌 Jobs Applied"];
    } else if (role === "Recruiter") {
      return [
        "👤 Account Info",
        "📢 Post a Job",
        "🗑️ Delete Account",
        "📋 Jobs Posted",
      ];
    } else {
      return ["👤 Account Info"];
    }
  };

  const handleLogout = async () => {
    await logout();
    persistor.purge();
    dispatch(closeMenu());
    navigate("/login");
  };

  if (!currentUser) {
    return (
      <div className="text-center mt-20 text-xl font-semibold text-white animate-pulse">
        Loading profile… ⚡
      </div>
    );
  }

  const userRole = currentUser.type || currentUser.type;
  const options = getOptionsByRole(userRole);

  const renderContent = () => {
    switch (selectedOption) {
      case "👤 Account Info":
        return <AccountInformation user={currentUser} />;
      case "📢 Post a Job":
        return <PostAJob />;
      case "🗑️ Delete Account":
        return <DeleteAccount />;
      case "📋 Jobs Posted":
        return <JobsPosted />;
      case "📌 Jobs Applied":
        return <JobsApplied />;
      default:
        return <AccountInformation user={currentUser} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br  text-white pt-10 px-4 sm:px-8">
      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
        {/* Sidebar */}
        <div className="w-full md:w-[260px] bg-[#1f2235] rounded-2xl  p-6 space-y-4 border border-[#31344b]">
          <h2 className="text-2xl font-extrabold text-primary mb-4">
            Yo, {currentUser.username?.split(" ")[0] || "User"} 👋
          </h2>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => setSelectedOption(option)}
              className={`w-full py-3 px-4 rounded-xl cursor-pointer transition-all duration-200 text-sm font-semibold ${
                selectedOption === option
                  ? "bg-primary text-white shadow-lg"
                  : "bg-[#2a2d41] hover:bg-[#3a3e5c] text-gray-300"
              }`}
            >
              {option}
            </div>
          ))}

          <button
            onClick={handleLogout}
            className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            🚪 Logout
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 bg-[#1f2235] border border-[#31344b] rounded-2xl  p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
