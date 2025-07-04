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
      toast("📨 Verification email sent. Go check it!");

      const checkInterval = setInterval(async () => {
        await user.reload();

        if (user.emailVerified) {
          clearInterval(checkInterval);

          await updateProfile(user, { displayName: username });

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
      toast.error("Signup failed: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-bgc)] px-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-md mt-5 bg-[var(--color-cardBg)] shadow-lg rounded-xl p-8 border border-[var(--color-primary)]">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] text-center mb-2">
            Let’s Create Your Profile 💼
          </h2>
          <p className="text-sm text-center text-[var(--color-textMuted)] mb-6">
            Just a few details and you're good to go.
          </p>
          <form
            onSubmit={handleSignUp}
            className="space-y-4 text-[var(--color-textLight)]"
          >
            <input
              type="text"
              placeholder="Username *"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-transparent border border-[var(--color-textMuted)] rounded-md w-full px-4 py-2 placeholder-[var(--color-textMuted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
            />
            <input
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent border border-[var(--color-textMuted)] rounded-md w-full px-4 py-2 placeholder-[var(--color-textMuted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
            />
            <input
              type="password"
              placeholder="Password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent border border-[var(--color-textMuted)] rounded-md w-full px-4 py-2 placeholder-[var(--color-textMuted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-transparent border border-[var(--color-textMuted)] rounded-md w-full px-4 py-2 placeholder-[var(--color-textMuted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
            />
            <input
              type="text"
              placeholder="Skills (comma separated)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="bg-transparent border border-[var(--color-textMuted)] rounded-md w-full px-4 py-2 placeholder-[var(--color-textMuted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
            />
            <input
              type="text"
              placeholder="Short Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-transparent border border-[var(--color-textMuted)] rounded-md w-full px-4 py-2 placeholder-[var(--color-textMuted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
            />
            <input
              type="url"
              placeholder="GitHub Profile"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="bg-transparent border border-[var(--color-textMuted)] rounded-md w-full px-4 py-2 placeholder-[var(--color-textMuted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
            />
            <input
              type="url"
              placeholder="LinkedIn Profile"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="bg-transparent border border-[var(--color-textMuted)] rounded-md w-full px-4 py-2 placeholder-[var(--color-textMuted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
            />

            {/* Role Selector */}
            <div className="flex justify-center gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="JobSeeker"
                  checked={type === "JobSeeker"}
                  onChange={(e) => setType(e.target.value)}
                  className="accent-[var(--color-primary)]"
                />
                <span className="text-[var(--color-textLight)]">
                  Job Seeker
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="Recruiter"
                  checked={type === "Recruiter"}
                  onChange={(e) => setType(e.target.value)}
                  className="accent-[var(--color-primary)]"
                />
                <span className="text-[var(--color-textLight)]">Recruiter</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--color-primary)] hover:bg-sky-500 text-[var(--color-bgc)] py-2.5 rounded-md font-bold text-lg transition"
            >
              Sign Me Up ✨
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-[var(--color-textMuted)]">
            Already vibing here?{" "}
            <NavLink
              to="/login"
              className="text-[var(--color-primary)] font-medium hover:underline"
            >
              Log in
            </NavLink>
          </p>
        </div>
      )}
    </div>
  );
};

export default Signup;
