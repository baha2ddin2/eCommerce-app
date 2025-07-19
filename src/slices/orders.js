import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fullorder = createAsyncThunk(
    "order/fullOrder",
    async ({user},thunkAPI)=>{
        try {
            const response = await axios.get(`http://localhost:3001/api/orders/fullorder/user/${user}`,{
            withCredentials: true
        })
            return response.data
        }catch(error){
            const errorMsg = error.response.data.error|| 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)
        }
})

const  orderSlice = createSlice({
    name :"cart",
    initialState : {
        orderUser :[],
        error:null,
        loading:true
    },
    reducers :{
    },extraReducers:(builder)=>{
        builder
           .addCase(fullorder.fulfilled, (state, action) => {
                state.orderUser = action.payload;
                state.loading = false
            }).addCase(fullorder.rejected, (state, action) => {
                state.error = action.payload;
                state.loading =false
            }).addCase(fullorder.pending, (state, action) => {
                state.loading = true
            })
        }
})

// export const {} = cartSlice.actions

export default orderSlice.reducer