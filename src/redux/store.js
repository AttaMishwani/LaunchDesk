// redux/store.js
import { configureStore, current } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import menuReducer from "./menuSlice";
import jobApplicationReducer from './jobApplicationSlice';


const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem("user");
        if (serializedState === null) return undefined;
        return {
            user: { currentUser: JSON.parse(serializedState) }
        }
    } catch (error) {
        console.error("Error loading state from localStorage", error);
        return undefined;
    }
}

const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state.user.currentUser);
        localStorage.setItem("user", serializedState)
    } catch (error) {
        console.error("Error saving state to localStorage", error);
    }
}
const store = configureStore({
    reducer: {
        user: userReducer,
        menu: menuReducer,
        jobApplication: jobApplicationReducer,
    },
    preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => {
    saveToLocalStorage(store.getState());
})

export default store;
