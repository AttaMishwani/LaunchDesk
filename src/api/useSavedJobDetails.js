// api/useSavedJobDetails.js
import { useQuery } from "@tanstack/react-query";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

const fetchSavedJobsByUserId = async (userId) => {
    const savedQuery = query(
        collection(db, "savedJobs"),
        where("userId", "==", userId)
    );
    const savedSnap = await getDocs(savedQuery);
    const jobIds = savedSnap.docs.map((doc) => doc.data().jobId);

    const jobs = await Promise.all(
        jobIds.map(async (jobId) => {
            const docRef = doc(db, "posts", jobId);
            const docSnap = await getDoc(docRef);
            return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
        })
    );

    return jobs.filter(Boolean);
};

export const useSavedJobDetails = (userUid) => {
    return useQuery({
        queryKey: ["savedJobs", userUid],
        queryFn: () => fetchSavedJobsByUserId(userUid),
        enabled: !!userUid,
    });
};
