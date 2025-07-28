import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase/firebase";



export const fetchApplications = async (uid) => {
    const q = query(collection(db, "applications"), where("applicantId", "==", uid));
    const querySnap = await getDocs(q);

    const apps = await Promise.all(
        querySnap.docs.map(async (docsnap) => {
            const appData = docsnap.data();
            const jobRef = doc(db, "posts", appData.jobId);
            const jobSnap = await getDoc(jobRef);

            return {
                id: docsnap.id,
                ...appData,
                jobDetails: jobSnap.exists() ? jobSnap.data() : {},
            }

        })
    )

    return apps
}