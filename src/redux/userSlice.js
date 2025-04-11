// redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;

        },
        logoutUser: (state) => {
            state.currentUser = null;
        },
        updateEditedUser: (state, action) => {
            return {
                ...state, ...action.payload
            }
        }
    },
});

export const { setUser, logoutUser, updateEditedUser } = userSlice.actions;
export default userSlice.reducer;
