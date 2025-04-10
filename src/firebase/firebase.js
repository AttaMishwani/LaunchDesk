// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import getAuth function
import { getFirestore } from "firebase/firestore"; // Firestore import
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7NsDb66GfmlCGzbMBU-S2KwQiy2vkjNI",
    authDomain: "freelancerbox-a7f4f.firebaseapp.com",
    projectId: "freelancerbox-a7f4f",
    storageBucket: "freelancerbox-a7f4f.firebasestorage.app",
    messagingSenderId: "994204511794",
    appId: "1:994204511794:web:ec0cb5a9532167ce93162b",
    measurementId: "G-E3WGGPRGRM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
const auth = getAuth(app); // Initialize authentication
const db = getFirestore(app); // Initialize Firestore
export const storage = getStorage(app); // ✅ Add this

// Export auth and db for use in other files
export { auth, db };
