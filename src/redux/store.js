import { configureStore } from "@reduxjs/toolkit";
import HomeSlice from "./slices/HomeSlice";

export const store = configureStore({
    reducer:{
        home:HomeSlice
    },
})