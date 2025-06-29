import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase/firebase"


const savedJobs = async (userId, jobId) => {

    try {
        await addDoc(collection(db, "savedJobs"), {
            userId: userId,
            jobId: jobId,
            date: serverTimestamp()
        });

        console.log("saved job to firestore");

    } catch (error) {

        console.log(error);

    }

};

export default savedJobs