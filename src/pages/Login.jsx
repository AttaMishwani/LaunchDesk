import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import Loader from "../ui/Loader";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Login button clicked");
    console.log("Email:", email, "Password:", password);

    try {
      const user = await login(email, password);

      if (!user.emailVerified) {
        toast.error("Please verify your email before logging in.");
        setLoading(false);
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const fullUserdata = {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          ...userSnap.data(),
        };

        dispatch(setUser(fullUserdata));
      }

      toast.success("Login successful!");

      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 border-2 border-blue-600">
          <h2 className="text-3xl font-semibold text-center text-[#4F46E5] mb-6">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            <button
              type="submit"
              className="w-full bg-[#4F46E5] hover:bg-[#3b3fcf] text-white py-2 rounded-md font-medium transition-all"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-[#4F46E5] font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
