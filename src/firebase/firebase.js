// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7NsDb66GfmlCGzbMBU-S2KwQiy2vkjNI",
    authDomain: "freelancerbox-a7f4f.firebaseapp.com",
    projectId: "freelancerbox-a7f4f",
    storageBucket: "freelancerbox-a7f4f.appspot.com", // ✅ FIXED: Correct bucket domain
    messagingSenderId: "994204511794",
    appId: "1:994204511794:web:ec0cb5a9532167ce93162b",
    measurementId: "G-E3WGGPRGRM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Init services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export for use in other files
export { auth, db, storage };
