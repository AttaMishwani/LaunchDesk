// Updated Signup.js (with user details form combined)
import { useState, useEffect } from "react";
import { signUp } from "../firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import Loader from "../ui/Loader";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [bio, setBio] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check if already signed in and verified
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        navigate("/home");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await signUp(email, password, type);
      toast("Verification email sent. Please check your inbox.");

      const checkInterval = setInterval(async () => {
        await user.reload();

        if (user.emailVerified) {
          clearInterval(checkInterval);

          await updateProfile(user, {
            displayName: username,
          });

          const skillsArray = skills.split(",").map((s) => s.trim());

          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            type,
            username,
            phone,
            bio,
            skills: skillsArray,
            github,
            linkedin,
            createdAt: new Date().toISOString(),
          });

          dispatch(
            setUser({
              uid: user.uid,
              email: user.email,
              emailVerified: true,
              type,
              username,
              phone,
              bio,
              skills: skillsArray,
              github,
              linkedin,
            })
          );

          navigate("/home");
        }
      }, 3000);
    } catch (error) {
      console.error("❌ Signup error:", error);
      alert("Signup failed: " + error.message);
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
            Create Account
          </h2>
          <form onSubmit={handleSignUp} className="space-y-4">
            <input
              type="text"
              placeholder="Username *"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
            />
            <input
              type="email"
              placeholder="Email *"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            <input
              type="password"
              placeholder="Password *"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
            />
            <input
              type="text"
              placeholder="Skills (comma separated)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="input"
            />
            <input
              type="text"
              placeholder="Your Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="input"
            />
            <input
              type="url"
              placeholder="GitHub Profile"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="input"
            />
            <input
              type="url"
              placeholder="LinkedIn Profile"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="input"
            />

            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="JobSeeker"
                  checked={type === "JobSeeker"}
                  onChange={(e) => setType(e.target.value)}
                  className="mr-2"
                />
                JobSeeker
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Recruiter"
                  checked={type === "Recruiter"}
                  onChange={(e) => setType(e.target.value)}
                  className="mr-2"
                />
                Recruiter
              </label>
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
