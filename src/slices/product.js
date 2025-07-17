import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const productItem = createAsyncThunk(
    "product/getReviews",
    async ({id},thunkAPI)=>{
        try {
            const response = await axios.get(`http://localhost:3001/api/products/${id}`)
            return response.data
        }catch(error){
            const errorMsg = error.response.data || 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)
        }
})

export const review = createAsyncThunk(
    "product/getProductItem",
    async ({id},thunkAPI)=>{
        try {
            const response = await axios.get(`http://localhost:3001/api/reviews/${id}`)
            return response.data
        }catch(error){
            const errorMsg = error.response.data || 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)
        }
})

export const Allproduct = createAsyncThunk(
    "product/getAllProducts",
    async (_,thunkAPI)=>{
        try {
            const response = await axios.get(`http://localhost:3001/api/products`)
            return response.data
        }catch(error){
            const errorMsg = error.response.data || 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)
        }
})
export const addReview = createAsyncThunk(
    "product/addReview",
    async ({productId, user, rating, comment},thunkAPI)=>{
        try {
            const response = await axios.post(`http://localhost:3001/api/reviews`,{
                productId,
                user,
                rating,
                comment
            })
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
        dataItem:[],
        errorItem :null,
        dataReview :[],
        errorReview : null
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
            .addCase(review.fulfilled, (state, action) => {
                const  data  = action.payload;
                state.dataReview = data;
                state.errorReview = null;

            })
            .addCase(review.rejected, (state, action) => {
                state.errorReview = action.payload.error;
            })
            .addCase(Allproduct.fulfilled, (state, action) => {
                const  data  = action.payload;
                state.data = data;
                state.error = null;

            })
            .addCase(Allproduct.rejected, (state, action) => {
                state.errorItem = action.payload;
            })
        }
})

export default productSlice.reducer