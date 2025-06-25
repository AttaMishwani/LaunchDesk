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

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [selectedOption, setSelectedOption] = useState("Account Information");

  const getOptionsByRole = (role) => {
    if (role === "freelancer") {
      return ["Account Information", "Delete Account", "Jobs Applied"];
    } else if (role == "client") {
      return [
        "Account Information",
        "Post a Job",
        "Delete Account",
        "Jobs Posted",
      ];
    } else {
      return ["Account Information"];
    }
  };

  const handleLogout = async () => {
    await logout();
    dispatch(closeMenu());
    navigate("/login");
  };

  useEffect(() => {
    const auth = getAuth();
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            dispatch(setUser(data)); // Set Redux state directly
          } else {
            console.warn("No user document found!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // User signed out
        dispatch(setUser(null));
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  const renderContent = () => {
    if (!currentUser) {
      return <div>Loading profile…</div>; // Show loading message if currentUser is null
    }
    switch (selectedOption) {
      case "Account Information":
        return <AccountInformation user={currentUser} />;
      case "Post a Job":
        return <PostAJob />;
      case "Delete Account":
        return <DeleteAccount />;
      case "Jobs Posted":
        return <JobsPosted />;
      case "Jobs Applied":
        return <JobsApplied />;
      default:
        return <AccountInformation user={currentUser} />;
    }
  };

  const userRole = currentUser.type;
  const options = getOptionsByRole(userRole);
  return (
    <div className="w-full">
      <div className="profile-content py-10 flex w-full max-w-[1300px] mx-auto">
        <div className="profile-options flex flex-col min-w-[250px] bg-white shadow-md rounded-xl p-4 gap-2">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => setSelectedOption(option)}
              className={`transition-all duration-200 border px-4 py-3 rounded-lg cursor-pointer ${
                selectedOption === option
                  ? "bg-gray-700 text-white border-gray-700"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300"
              }`}
            >
              <h2 className="text-lg font-medium select-none">{option}</h2>
            </div>
          ))}

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 mt-4 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>

        <div className="container min-h-12 min-w-[70%] p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
