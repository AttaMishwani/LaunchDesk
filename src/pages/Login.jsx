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
    <div className="flex items-center justify-center min-h-screen  px-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-indigo-300 transition duration-300">
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Welcome Back 👋
          </h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-md font-semibold text-lg transition duration-200"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="text-indigo-600 hover:underline font-medium"
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
