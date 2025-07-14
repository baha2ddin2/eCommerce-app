import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userCart = createAsyncThunk(
    "cart/userCart",
    async ({user},thunkAPI)=>{
        try {
            const response = await axios.get(`http://localhost:3001/api/cart/user/${user}`,{
            withCredentials: true
        })
            return response
        }catch(error){
            const errorMsg = error.response.data.det || 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)
        }
})

const  cartSlice = createSlice({
    name :"cart",
    initialState : {
        cart :[],
        error:null,
        loading:true
    },
    reducers :{
    },extraReducers:(builder)=>{
        builder
            .addCase(userCart.fulfilled, (state, action) => {
                const cart = action.payload;
                state.cart = cart
                state.error = null
                state.loading = false
            }).addCase(userCart.pending,(state,action)=>{
                state.loanding =true
            })
            .addCase(userCart.rejected, (state, action) => {
                state.error = action.payload;
                state.loanding = false
            })

        }
})

// export const {} = cartSlice.actions

export default cartSlice.reducer