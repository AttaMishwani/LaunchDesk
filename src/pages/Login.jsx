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
        toast.error("Bruh... verify your email first 😤");
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

      toast.success("You're in. Let’s get that 💰");
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-bgc)] px-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-md bg-[var(--color-cardBg)] rounded-2xl shadow-lg p-8 border border-[var(--color-primary)] transition duration-300">
          <h2 className="text-4xl font-extrabold text-center text-[var(--color-primary)] mb-6 leading-tight">
            👋 Welcome Back, Legend.
          </h2>
          <p className="text-center text-[var(--color-textMuted)] text-sm mb-8">
            Login to unlock the good stuff.
          </p>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-textLight)] mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@vibemail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-transparent border border-[var(--color-textMuted)] rounded-md text-[var(--color-textLight)] placeholder-[var(--color-textMuted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-textLight)] mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-transparent border border-[var(--color-textMuted)] rounded-md text-[var(--color-textLight)] placeholder-[var(--color-textMuted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--color-primary)] hover:bg-sky-500 text-[var(--color-bgc)] py-2.5 rounded-md font-bold text-lg transition duration-200"
            >
              Let Me In 🚀
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--color-textMuted)]">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-[var(--color-primary)] hover:underline font-medium"
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
