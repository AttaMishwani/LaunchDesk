import { useQuery } from "@tanstack/react-query"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";


const fetchSavedJobsByIds = async (savedJobIds) => {
    if (!savedJobIds || savedJobIds.length === 0) {
        return [];
    }

    try {
        const jobs = await Promise.all(
            savedJobIds.map(async (jobId) => {
                const docRef = doc(db, "posts", jobId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return { id: docSnap.id, ...docSnap.data() };
                } else {
                    return null;
                }
            })
        );

        const filteredJobs = jobs.filter((job) => job !== null);

        return filteredJobs;
    } catch (error) {
        console.error("Failed to fetch saved job details:", error);
    }
}

export const useSavedJobDetails = (savedJobIds) => {
    return useQuery({
        queryKey: ["savedJobs", savedJobIds],
        queryFn: () => fetchSavedJobsByIds(savedJobIds),
        enabled: savedJobIds.length > 0,
        staleTime: 1000 * 60 * 5
    })
} 