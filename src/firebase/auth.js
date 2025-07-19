// firebase/auth.js
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";


// ✅ Sign Up
export const signUp = async (email, password, type) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);

        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            type,
            createdAt: serverTimestamp(),
        });

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// ✅ Login
export const login = async (email, password) => {

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// ✅ Logout
export const logout = async () => {


    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error logging out:", error.message);
    }
};

// ✅ Auth Listener
export const authStateListener = (callback) => {
    return onAuthStateChanged(auth, (user) => {
        callback(user);
    });
};
