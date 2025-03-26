import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "../redux/slices/userDataSlice";
import tasksReducer from "../redux/slices/tasksSlice";


const store = configureStore({
    reducer:{
        userData: userDataReducer,
        tasks: tasksReducer
    }
})

export default store;