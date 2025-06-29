import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/firebase/firebase";

import "./App.css";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserDetailsPage from "./pages/UserDetailsPage";
import Profile from "./pages/Profile";
import JobDetails from "./pages/JobDetails";
import ScreeningQuestions from "./pages/ScreeningQuestions";
import Review from "./pages/Review";
import ThankYou from "./pages/ThankYou";
import ViewJobApplicants from "./pages/ViewJobApplicants";
import SavedJobs from "./pages/SavedJobs";

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-semibold animate-pulse">Loading...</p>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const RequireAuth = ({ children }) => {
    if (checkingAuth) return <Loader />;
    if (!user || !user.emailVerified) return <Navigate to="/login" replace />;
    return children;
  };

  const RedirectIfLoggedIn = ({ children }) => {
    if (checkingAuth) return <Loader />;
    if (user && user.emailVerified) return <Navigate to="/home" replace />;
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route
          index
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        <Route path="about" element={<About />} />

        {/* Public routes */}
        <Route
          path="signup"
          element={
            <RedirectIfLoggedIn>
              <Signup />
            </RedirectIfLoggedIn>
          }
        />

        <Route
          path="login"
          element={
            <RedirectIfLoggedIn>
              <Login />
            </RedirectIfLoggedIn>
          }
        />

        {/* Protected routes */}

        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

        <Route
          path="profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        <Route
          path="userdetailspage"
          element={
            <RequireAuth>
              <UserDetailsPage />
            </RequireAuth>
          }
        />

        <Route
          path="jobs/:id"
          element={
            <RequireAuth>
              <JobDetails />
            </RequireAuth>
          }
        />

        <Route
          path="screening-questions/:id"
          element={
            <RequireAuth>
              <ScreeningQuestions />
            </RequireAuth>
          }
        />

        <Route
          path="review"
          element={
            <RequireAuth>
              <Review />
            </RequireAuth>
          }
        />
        <Route
          path="/thank-you"
          element={
            <RequireAuth>
              <ThankYou />
            </RequireAuth>
          }
        />

        <Route
          path="savedjobs"
          element={
            <RequireAuth>
              <SavedJobs />
            </RequireAuth>
          }
        />

        <Route
          path="view-job-applicants/:jobId"
          element={
            <RequireAuth>
              <ViewJobApplicants />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
