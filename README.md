💼 LaunchDesk
Empowering job seekers and recruiters with tools to connect, hire, and grow — all in one place.

🚀 Live Demo
🔗 View on GitHub Pages

📌 Overview
LaunchDesk is a full-featured React web application that bridges the gap between recruiters and job seekers through a modern, role-based hiring platform.

Recruiters can post jobs, manage listings, and review applicants.

Job Seekers can apply to jobs, manage their profiles, and upload resumes.

This project was built with a focus on:

Scalable and clean architecture using React.js + Redux Toolkit

Real-time capabilities using Firebase Firestore & Authentication

Role-based UI, user persistence, and route protection

Reusable components and developer-friendly code organization

🧠 Features
🔐 Authentication
Signup with email & password

Email verification required before login

Secure login/logout

Persistent login with redux-persist

👥 User Roles
Choose a role during signup: Recruiter or JobSeeker

Role-based dashboard & profile screens

Conditional rendering based on role type

🧾 Recruiter Functionality
Post new job listings

View and manage posted jobs

Track job application data (future scope)

💼 Job Seeker Functionality
Browse and search job listings

Apply to jobs and upload resume (PDF, DOC, DOCX)

View jobs they've applied to

Edit profile information (skills, bio, social links)

💾 Data Persistence
App state saved across refresh with redux-persist

Firebase stores all user data, job posts, and resumes

⚙️ Tech Stack
Frontend State Backend (BaaS) Styling
React.js Redux Toolkit + redux-persist Firebase Auth, Firestore, Firebase Storage Tailwind CSS

🧰 Tools & Libraries
React Router DOM – Routing and navigation

Redux Toolkit – Global state management

redux-persist – Local state persistence

@tanstack/react-query – Data fetching & caching

Firebase – Auth, Firestore DB, File Storage

React Toastify – Clean toast alerts

Tailwind CSS – Modern utility-first styling

📸 Screenshots
Login Page Profile View Job Details

💡 What I Learned
While building LaunchDesk, I learned to:

Structure large React apps using feature-based architecture

Use Redux Toolkit effectively for scalable state management

Implement role-based conditional rendering in React

Set up and manage Firebase Authentication, Firestore, and Storage

Handle file uploads and generate secure download links via Firebase

Use react-query for efficient server state management

Improve UX with clean UI, form validation, and responsive design

🧱 Challenges I Faced & How I Solved Them
Challenge How I Solved It
Email verification blocking login Added conditional logic to check user.emailVerified and alert the user if not verified
Managing role-based rendering Created centralized logic to render different components based on user role (JobSeeker vs Recruiter)
Resume uploads with Firebase Storage Learned how to upload files using uploadBytes and fetch download URLs via getDownloadURL
Persistent Redux state Integrated redux-persist to store user data even on refresh
Protecting routes Used Firebase auth and Redux state to conditionally allow/deny access
Filtering & searching jobs Implemented search input and dynamic filtering using useState and Array.filter()
Sticky job details box Used sticky + responsive breakpoints to keep selected job details visible while scrolling

⚙️ How to Run Locally
bash
Copy
Edit

# 1. Clone the repo

git clone https://github.com/your-username/freelancerbox.git
cd freelancerbox

# 2. Install dependencies

npm install

# 3. Set up Firebase

# Replace the config in /firebase/firebase.js with your Firebase project credentials

# 4. Start the development server

npm run dev
