import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../slices/user";
import cartSlice  from "../slices/cart";
import productSlice from "../slices/product"

const loggerMiddleware = store => next => action => {
  console.log("🔥 Dispatching action:", action);
  return next(action);
};
export default configureStore({
    reducer :{
        user  : UserSlice,
        cart  : cartSlice,
        product : productSlice

    },middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),

})

