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

const  UserSlice = createSlice({
    name :"user",
    initialState : {
        cart :[],
        error:null
    },
    reducers :{
    },extraReducers:(builder)=>{
        builder
            .addCase(userCart.fulfilled, (state, action) => {
                const cart = action.payload;
                state.cart = cart
                state.error = null
            })
            .addCase(userCart.rejected, (state, action) => {
                state.error = action.payload;
            })

        }
})

export const {logout} = UserSlice.actions

export default UserSlice.reducer