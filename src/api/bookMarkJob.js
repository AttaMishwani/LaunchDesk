// api/bookmarkJob.js
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

const bookmarkJob = async (userId, jobId) => {
    try {
        const docRef = await addDoc(collection(db, "savedJobs"), {
            userId,
            jobId,
            date: serverTimestamp(),
        });

        console.log("Saved job to Firestore with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error saving job:", error);
        throw error;
    }
};

export default bookmarkJob;
