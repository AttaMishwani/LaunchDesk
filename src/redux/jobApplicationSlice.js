import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobId: null,
    resumeURL: null,
    answers: [],
    userInfo: null,
    jobstatus: "pending"
}


const jobApplicationSlice = createSlice({
    name: 'jobApplication',
    initialState,
    reducers: {
        setJobId: (state, action) => {
            state.jobId = action.payload;
        },
        setResumeURL: (state, action) => {
            state.resumeURL = action.payload;
        },
        setAnswers: (state, action) => {
            state.answers = action.payload;
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setJobStatus: (state, action) => {
            state.jobstatus = action.payload;
        },
        resetApplication: (state) => {
            state.jobId = null;
            state.resumeURL = null;
            state.answers = [];
            state.userInfo = null;
        },
    }
})


export const {
    setJobId,
    setResumeURL,
    setAnswers,
    setJobStatus,
    setUserInfo,
    resetApplication
} = jobApplicationSlice.actions;

export default jobApplicationSlice.reducer