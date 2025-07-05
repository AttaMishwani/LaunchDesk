import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const fetchPostsPage = async ({ pageParam = null }) => {

    const postRef = collection(db, "posts");

    let q = query(postRef, orderBy("createdAt", "desc"), limit(10));

    if (pageParam) {
        q = query(postRef, orderBy("createdAt", "desc"), startAfter(pageParam), limit(10));
    }

    const snap = await getDocs(q);
    const posts = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const lastVisible = snap.docs[snap.docs.length - 1];

    return {
        posts,
        lastVisible
    };
};
