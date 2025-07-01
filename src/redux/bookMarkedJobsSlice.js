import { createSlice } from "@reduxjs/toolkit";


const bookMarkedJobSlice = createSlice({
    name: "bookmarkedJobs",
    initialState: {
        jobIds: []
    },
    reducers: {
        setSavedJobs: (state, action) => {
            console.log("🔥 Bookmarked jobs set in Redux:", action.payload);
            state.jobIds = action.payload;
            console.log(`Bookmarked job IDs: ${state.jobIds}`);
        },
        addSavedJob: (state, action) => {
            if (!state.jobIds.includes(action.payload)) {
                state.jobIds.push(action.payload);
                console.log(`Job ID ${action.payload} added to bookmarks`);
            }
        },
        removeSavedJob: (state, action) => {
            state.jobIds = state.jobIds.filter((id) => id !== action.payload);
            console.log(`Job ID ${action.payload} removed from bookmarks`);
        }
    }
});

export const { setSavedJobs, addSavedJob, removeSavedJob } = bookMarkedJobSlice.actions
export default bookMarkedJobSlice.reducer;