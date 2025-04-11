import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { closeMenu } from "../redux/menuSlice";
import AccountInformation from "../components/Profile/AccountInformation";
import DeleteAccount from "../components/Profile/DeleteAccount";
import PostAJob from "../components/Profile/PostAJob";
import PostAProject from "../components/Profile/PostAProject";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { setUser } from "../redux/userSlice";
import { db } from "../firebase/firebase";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [selectedOption, setSelectedOption] = useState("Account Information");

  const options = [
    "Account Information",
    "Post a Job",
    "Post a Project",
    "Delete Account",
  ];

  const handleLogout = async () => {
    await logout();
    dispatch(closeMenu());
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const loggedInUser = auth.currentUser;

      if (loggedInUser) {
        const uid = loggedInUser.uid;

        try {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const freshData = docSnap.data();
            dispatch(setUser(freshData));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [dispatch]);

  const renderContent = () => {
    switch (selectedOption) {
      case "Account Information":
        return <AccountInformation user={currentUser} />;
      case "Post a Job":
        return <PostAJob />;
      case "Post a Project":
        return <PostAProject />;
      case "Delete Account":
        return <DeleteAccount />;
      default:
        return <AccountInformation />;
    }
  };

  return (
    <div className="w-full ">
      <div className="profile-content py-10 flex w-full max-w-[1300px] mx-auto ">
        <div className="profile-options flex flex-col min-h-12 min-w-[30%]">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => setSelectedOption(option)}
              className={`border-1 border-gray-400 py-3 px-2 cursor-pointer ${
                selectedOption === option ? "bg-gray-400" : "bg-gray-200"
              }`}
            >
              <h2 className="text-black text-2xl select-none">{option}</h2>
            </div>
          ))}

          <button
            onClick={handleLogout}
            className="bg-[#E11D48] px-4 py-2 mt-4 text-white hover:bg-[#B91C40]"
          >
            Logout
          </button>
        </div>

        <div className="container min-h-12 min-w-[70%]  p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
