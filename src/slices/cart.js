import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const newQuantity = createAsyncThunk(
    "cart/increase",
    async ({id , quantity,user},thunkAPI)=>{
        try {
            const response = await axios.put(`http://localhost:3001/api/cart/${id}/${user}`,{
            quantity : quantity
        },{
            withCredentials: true
        })
            return response.data
        }catch(error){
            const errorMsg = error.response.data.error|| 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)
        }
})
export const deleteCart = createAsyncThunk(
    "cart/deleteCart",
    async ({id,user},thunkAPI)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/api/cart/${id}/${user}`,{
            withCredentials: true
        })
            return response.data
        }catch(error){
            const errorMsg = error?.response?.data?.error|| 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)
        }
})
export const  addcart= createAsyncThunk(
    "cart/addCart",
    async ({productid , quantity ,user},thunkAPI)=>{
        try {
            const response = await axios.post(`http://localhost:3001/api/cart`,{
                productId : productid,
                user : user,
                quantity : quantity
            },{
            withCredentials: true
        })
            return response.data
        }catch(error){
            const errorMsg = error?.response?.data?.error|| 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)
        }
})

export const userCart = createAsyncThunk(
    "cart/userCart",
    async ({user},thunkAPI)=>{
        try {
            const response = await axios.get(`http://localhost:3001/api/cart/user/${user}`,{
            withCredentials: true
        })
            return response.data
        }catch(error){
            if (error.response && error.response.status === 404) {
                return [];
            }
            const errorMsg = error.response.message|| 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)
        }
})

const  cartSlice = createSlice({
    name :"cart",
    initialState : {
        cart :[],
        error:null,
        loading:true,
        errorCart :null,
    },
    reducers :{
    },extraReducers:(builder)=>{
        builder
            .addCase(userCart.fulfilled, (state, action) => {
                const cart = action.payload;
                localStorage.setItem('cart',JSON.stringify(cart))
                state.cart = cart
                state.error = null
                state.loading = false
            })
            .addCase(userCart.pending,(state,action)=>{
                state.loading =true
            })
            .addCase(userCart.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false
            })
           .addCase(newQuantity.fulfilled, (state, action) => {
                let updatedItem = action.payload;
                const index = state.cart.findIndex(
                    item => String(item.cart_id) === String(updatedItem.cart_id)
                );
                if (index !== -1) {
                    const originalItem = state.cart[index];
                    const price = Number(originalItem.price);
                    const quantity = Number(updatedItem.quantity);
                    const total_line_price = (price * quantity).toFixed(2);
                    state.cart[index] = {
                        ...originalItem,
                        ...updatedItem,
                        quantity,
                        total_line_price,
                    };
                }
                state.cartTotal = state.cart.reduce(
                    (sum, item) => sum + Number(item.total_line_price),
                    0
                );
            }).addCase(newQuantity.rejected, (state, action) => {
                state.error = action.payload;
            }).addCase(deleteCart.fulfilled, (state, action) => {
                const deletedCartId = action.payload.id
                state.cart = state.cart.filter(item => String(item.cart_id) !== String(deletedCartId));
                state.error = null;
                state.deleteAlert = true;
            })
            .addCase(addcart.fulfilled, (state, action) => {
                const cart = action.payload;
                state.cart = [cart,...state.cart]
                state.error = null
                state.loading = false
            })
            .addCase(addcart.pending,(state,action)=>{
                state.loading =true
            })
            .addCase(addcart.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false
            })
        }
})

// export const {} = cartSlice.actions

export default cartSlice.reducer