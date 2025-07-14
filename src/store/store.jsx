import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../slices/user";
import cartSlice  from "../slices/cart";

export default configureStore({
    reducer :{
        user  : UserSlice,
        cart  : cartSlice

    }
})

