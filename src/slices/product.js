import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const productItem = createAsyncThunk(
    "product/getProductItem",
    async ({id},thunkAPI)=>{
        try {
            const response = await axios.get(`http://localhost:3001/api/products/${id}`)
            return response.data
        }catch(error){
            const errorMsg = error.response.data || 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)
        }
})

const  productSlice = createSlice({
    name :"product",
    initialState : {
        data :null,
        error: null,
        dataItem:null,
        errorItem :null
    },
    reducers :{
    },extraReducers:(builder)=>{
        builder
            .addCase(productItem.fulfilled, (state, action) => {
                const  data  = action.payload;
                state.dataItem = data;
                state.errorItem = null;

            })
            .addCase(productItem.rejected, (state, action) => {
                state.errorItem = action.payload;
            })
        }
})

export default productSlice.reducer