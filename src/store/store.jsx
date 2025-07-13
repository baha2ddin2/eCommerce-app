import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../slices/user";

export default configureStore({
    reducer :{
        user  : UserSlice
    }
})

