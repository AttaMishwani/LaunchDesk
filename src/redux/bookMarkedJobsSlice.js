// redux/bookMarkedJobsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const bookMarkedJobSlice = createSlice({
    name: "bookmarkedJobs",
    initialState: {
        jobIds: [],
    },
    reducers: {
        setSavedJobs: (state, action) => {
            state.jobIds = action.payload;
        },
        addSavedJob: (state, action) => {
            if (!state.jobIds.includes(action.payload)) {
                state.jobIds.push(action.payload);
            }
        },
        removeSavedJob: (state, action) => {
            state.jobIds = state.jobIds.filter((id) => id !== action.payload);
        },
        clearSavedJobs: (state) => {
            state.jobIds = [];
        },
    },
});

export const {
    setSavedJobs,
    addSavedJob,
    removeSavedJob,
    clearSavedJobs,
} = bookMarkedJobSlice.actions;
export default bookMarkedJobSlice.reducer;
