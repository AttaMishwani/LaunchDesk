import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    showMenu: false,
};

// Create slice
const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.showMenu = !state.showMenu
        },
        closeMenu: (state) => {
            state.showMenu = false
        }
    }
});

export const { toggleMenu, closeMenu } = menuSlice.actions
export default menuSlice.reducer