// utils/logout.js
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { clearSavedJobs } from "../redux/bookMarkedJobsSlice";
import { useDispatch } from "react-redux";

export const useLogout = (dispatch) => {


    const logout = async () => {
        try {
            dispatch(clearSavedJobs());
            await signOut(auth);
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    return logout;
};
