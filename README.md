# 💼 LaunchDesk

> Empowering job seekers and recruiters with tools to connect, hire, and grow — all in one place.

![LaunchDesk Screenshot](https://your-screenshot-link-if-available)

---

## 🚀 Live Demo

🔗 [View on GitHub Pages](https://attamishwani.github.io/freelancerbox/)

---

## 📌 Overview

**LaunchDesk** is a full-featured React web application that bridges the gap between **recruiters** and **job seekers** through a modern, role-based hiring platform.

- **Recruiters** can post jobs, manage listings, and review applicants.
- **Job Seekers** can apply to jobs, manage their profiles, and upload resumes.

This project was built with a focus on:

- Scalable and clean architecture using **React.js + Redux Toolkit**
- Real-time capabilities using **Firebase Firestore & Authentication**
- **Role-based UI**, user persistence, and protected routes
- Reusable components and developer-friendly code organization

---

## 🧠 Features

### 🔐 Authentication

- Signup with email & password
- Email verification required before login
- Secure login/logout
- Persistent login using `redux-persist`

### 👥 User Roles

- Choose a role during signup: `Recruiter` or `JobSeeker`
- Role-based dashboards and profile screens
- Conditional rendering based on user role

### 🧾 Recruiter Functionality

- Post new job listings
- View and manage posted jobs
- (Future Scope) Track applications received

### 💼 Job Seeker Functionality

- Browse and search job listings
- Apply to jobs and upload resume (PDF, DOC, DOCX)
- View jobs they've applied to
- Edit profile details like skills, bio, etc.

### 💾 Data Persistence

- Redux state is saved across refresh using `redux-persist`
- Firebase stores user data, job posts, and resumes

---

## ⚙️ Tech Stack

| Frontend | State Management              | Backend (BaaS)                    | Styling      |
| -------- | ----------------------------- | --------------------------------- | ------------ |
| React.js | Redux Toolkit + redux-persist | Firebase Auth, Firestore, Storage | Tailwind CSS |

---

## 🧰 Tools & Libraries

- `React Router DOM` – Routing and navigation
- `Redux Toolkit` – Global state management
- `redux-persist` – State persistence on refresh
- `@tanstack/react-query` – Data fetching and caching
- `Firebase` – Auth, Firestore DB, File Storage
- `React Toastify` – Elegant toast notifications
- `Tailwind CSS` – Clean utility-first styling

---

## 📸 Screenshots

| Login Page                             | Profile View                             | Job Details                                 |
| -------------------------------------- | ---------------------------------------- | ------------------------------------------- |
| ![Login](https://your-screenshot-link) | ![Profile](https://your-screenshot-link) | ![JobDetails](https://your-screenshot-link) |

---

## 💡 What I Learned

While building **LaunchDesk**, I learned:

- How to structure large React apps using feature-based architecture
- Using Redux Toolkit efficiently for scalable state
- Role-based conditional rendering in React
- Firebase Authentication, Firestore, and File Uploads
- Handling resume uploads and generating secure download URLs
- Using `react-query` for real-time data and caching
- Enhancing UX with polished UI, validation, and responsiveness

---

## 🧱 Challenges I Faced & How I Solved Them

| Challenge                          | Solution                                                                |
| ---------------------------------- | ----------------------------------------------------------------------- |
| Email verification blocking login  | Added logic to check `emailVerified` and show appropriate toast message |
| Role-based rendering complexity    | Centralized role-based logic with clean switch cases                    |
| Resume uploads to Firebase Storage | Used `uploadBytes` and `getDownloadURL` for safe file storage           |
| Persistent Redux state             | Integrated `redux-persist` for consistent user session                  |
| Route protection                   | Combined Firebase Auth and Redux for conditional access                 |
| Filtering and searching jobs       | Applied search filtering via `useState` and `.filter()`                 |
| Sticky job details panel           | Used `sticky` with responsive top offset for better UX                  |

---

## ⚙️ How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/your-username/freelancerbox.git
cd freelancerbox

# 2. Install dependencies
npm install

# 3. Set up Firebase
# Replace the config inside /firebase/firebase.js with your Firebase project credentials

# 4. Start the development server
npm run dev
```
