import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

const fetchSavedJobIds = async (userId) => {
    const savedQuery = query(collection(db, "savedJobs"), where("userId", "==", userId));
    const savedSnap = await getDocs(savedQuery);
    return savedSnap.docs.map((doc) => doc.data().jobId);
};

export const useSavedJobs = (userId) => {
    return useQuery({
        queryKey: ["savedJobIds", userId],
        queryFn: () => fetchSavedJobIds(userId),
        enabled: !!userId,
        staleTime: 1000 * 60 * 2
    });
};
