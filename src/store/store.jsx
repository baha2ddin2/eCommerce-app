import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../slices/user";
import cartSlice  from "../slices/cart";

const loggerMiddleware = store => next => action => {
  console.log("🔥 Dispatching action:", action);
  return next(action);
};
export default configureStore({
    reducer :{
        user  : UserSlice,
        cart  : cartSlice

    },middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),

})

