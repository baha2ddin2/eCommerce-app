import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../slices/user";
import cartSlice  from "../slices/cart";
import productSlice from "../slices/product"
import orderSlice from "../slices/orders"

const loggerMiddleware = store => next => action => {
  console.log("🔥 Dispatching action:", action);
  return next(action);
};
export default configureStore({
    reducer :{
        user  : UserSlice,
        cart  : cartSlice,
        product : productSlice,
        order : orderSlice

    },middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),

})

