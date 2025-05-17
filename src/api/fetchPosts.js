import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const fetchPosts = async () => {
    try {
        const snapshot = await getDocs(collection(db, "posts"));
        const posts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        return []; // return empty array on failure to prevent app crash
    }
};
