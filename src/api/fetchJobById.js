// src/api/fetchJobById.js

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";


export const fetchJobById = async (id) => {
    const ref = doc(db, "posts", id);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error("Job not found");
    return { id: snap.id, ...snap.data() };
};
