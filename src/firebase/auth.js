import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; // Ensure you have initialized Firebase in this file
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Sign Up Function
export const signUp = async (email, password, userType) => {
    try {
        // Create the user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Now, save the userType to Firestore under the user's document
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            userType: userType, // Save the user type (freelancer or client)
            createdAt: new Date(),
        });

        // Return the user object after saving userType in Firestore
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};
// Login Function
export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user; // Return user if successful
    } catch (error) {
        throw new Error(error.message); // Let the component catch it
    }
};


// Logout Function
export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error logging out:", error.message);
    }
};

// Listen to Auth State Changes
export const authStateListener = (callback) => {
    return onAuthStateChanged(auth, callback);
};
