import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setSavedJobs } from "../redux/bookMarkedJobsSlice";
import { useQuery } from "@tanstack/react-query";


const fetchBookMarkedJobs = async (uid) => {
    try {
        console.log("🔍 Fetching bookmarks for uid:", uid);
        const q = query(collection(db, "savedJobs"), where("userId", "==", uid));
        const snap = await getDocs(q);
        const jobs = snap.docs.map((doc) => doc.data().jobId);
        console.log("✅ Bookmarked job IDs:", jobs);
        return jobs;
    } catch (error) {
        console.error("❌ Error fetching bookmarks:", error);
        return [];
    }
};


export const useSavedJobs = (uid) => {
    const dispatch = useDispatch();
    return useQuery({
        queryKey: ["savedJobs", uid],
        queryFn: () => fetchBookMarkedJobs(uid),
        enabled: !!uid,
        onSuccess: (data) => {
            console.log("📥 Bookmarked job IDs fetched from Firestore:", data)
            dispatch(setSavedJobs(data));
        }
    })
}
