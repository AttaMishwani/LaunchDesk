// redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import menuReducer from "./menuSlice";
import jobApplicationReducer from './jobApplicationSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PURGE, PERSIST, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"]
};

const rootReducer = combineReducers({
    user: userReducer,
    menu: menuReducer,
    jobApplication: jobApplicationReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const loadFromLocalStorage = () => {
//     try {
//         const serializedState = localStorage.getItem("user");
//         if (serializedState === null) return undefined;
//         return {
//             user: { currentUser: JSON.parse(serializedState) }
//         }
//     } catch (error) {
//         console.error("Error loading state from localStorage", error);
//         return undefined;
//     }
// }
// const saveToLocalStorage = (state) => {
//     try {
//         const serializedState = JSON.stringify(state.user.currentUser);
//         localStorage.setItem("user", serializedState)
//     } catch (error) {
//         console.error("Error saving state to localStorage", error);
//     }
// }

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});

export const persistor = persistStore(store)

export default store;
