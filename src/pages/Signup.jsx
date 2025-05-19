// components/Signup.js
import { useState } from "react";
import { signUp } from "../firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import Loader from "../ui/Loader";
import { toast } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setloading] = useState(false);

  const [userType, setUserType] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      const user = await signUp(email, password, userType);
      toast("Verification email sent. Please check your inbox.");

      const checkInterval = setInterval(async () => {
        await user.reload();

        if (user.emailVerified) {
          clearInterval(checkInterval);
          dispatch(setUser({ ...user, emailVerified: true }));
          setloading(false);
          navigate("/userdetailspage");
        }
      }, 3000);
    } catch (error) {
      console.error("❌ Signup error:", error);
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 border-2 border-blue-600">
          <h2 className="text-3xl font-semibold text-center text-[#4F46E5] mb-6">
            Create Account
          </h2>
          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Are you a Freelancer or a Client?
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="freelancer"
                    checked={userType === "freelancer"}
                    onChange={(e) => setUserType(e.target.value)}
                    className="mr-2"
                  />{" "}
                  Freelancer
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="client"
                    checked={userType === "client"}
                    onChange={(e) => setUserType(e.target.value)}
                    className="mr-2"
                  />{" "}
                  Client
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#E11D48] hover:bg-[#c9153e] text-white py-2 rounded-md font-medium transition-all"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-[#4F46E5] font-medium hover:underline"
            >
              Login
            </NavLink>
          </p>
        </div>
      )}
    </div>
  );
};

export default Signup;
