# 💼 FreelancerBox

> Empowering freelancers and recruiters with tools to connect, hire, and grow — all in one place.

![FreelancerBox Screenshot](https://your-screenshot-link-if-available)

---

## 🚀 Live Demo

🔗 [View on GitHub Pages](https://attamishwani.github.io/freelancerbox/)

---

## 📌 Overview

**FreelancerBox** is a full-featured React web application built for two types of users:

- **Recruiters** can post jobs and manage applicants.
- **Freelancers** can apply to jobs, manage their profiles, and upload resumes.

This project was built with a focus on:

- Clean, scalable frontend architecture using **React.js + Redux Toolkit**
- Real-time data using **Firebase Firestore & Authentication**
- **Role-based UI rendering**, user persistence, and protected routes
- A strong emphasis on code readability and reusability

---

## 🧠 Features

### 🔐 Authentication

- Signup with email & password
- Email verification required before login
- Login/logout functionality
- Persistent login using **redux-persist**

### 👤 User Roles

- Role selected during signup: `Recruiter` or `JobSeeker`
- Role-based profile components (Post a Job, Apply to Jobs, etc.)

### 🧾 Recruiter Functionality

- Create and post new jobs
- View applicants for posted jobs
- Manage job listings in their profile

### 👨‍💻 Job Seeker Functionality

- Apply to job listings
- Upload resume (PDF, DOC, DOCX)
- View jobs they’ve applied to
- Edit personal details and bio

### 💾 Persistence

- Redux state is persisted to local storage using **redux-persist**
- Firebase stores user data, resumes, and job postings

### ⚙️ Tech Stack

| Frontend | State                         | Backend (BaaS)                             | Styling      |
| -------- | ----------------------------- | ------------------------------------------ | ------------ |
| React.js | Redux Toolkit + redux-persist | Firebase Auth, Firestore, Firebase Storage | Tailwind CSS |

---

## 🧰 Tools & Libraries

- `React Router DOM` – Routing and navigation
- `Redux Toolkit` – Global state management
- `redux-persist` – State persistence on refresh
- `@tanstack/react-query` – Data fetching and caching
- `Firebase` – Auth, Firestore DB, and File Storage
- `React Toastify` – Elegant toast notifications
- `Tailwind CSS` – Clean utility-first styling

---

## 📸 Screenshots

| Login Page                             | Profile View                             | Job Details                                 |
| -------------------------------------- | ---------------------------------------- | ------------------------------------------- |
| ![Login](https://your-screenshot-link) | ![Profile](https://your-screenshot-link) | ![JobDetails](https://your-screenshot-link) |

---

## ⚙️ How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/your-username/freelancerbox.git
cd freelancerbox

# 2. Install dependencies
npm install

# 3. Set up Firebase
# Replace config in /firebase/firebase.js with your own Firebase project credentials

# 4. Start the dev server
npm run dev

```
