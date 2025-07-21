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
export const allOrders = createAsyncThunk(
    "order/allOrders",
    async (_,thunkAPI)=>{
        try {
            const response = await axios.get(`http://localhost:3001/api/orders`,{
            withCredentials: true
        })
            return response.data
        }catch(error){
            const errorMsg = error.response.data.error|| 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)
        }
})
export const creatOrder = createAsyncThunk(
    "order/creatOrder",
    async ({user,adress},thunkAPI)=>{
        const cartItems =JSON.parse(localStorage.getItem("cart"))
        const total = cartItems.reduce((sum, item) => sum + parseFloat(item.total_line_price), 0);

        try {
            const response = await axios.post(`http://localhost:3001/api/orders`,{
                user ,
                total ,
                adress
            },{
            withCredentials: true
        })
            return response.data
        }catch(error){
            const errorMsg = error.response.data.error|| 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)
        }
})

export const creatItems = createAsyncThunk(
  "order/creatItems",
  async (_, thunkAPI) => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    const orderid = Number(localStorage.getItem("idOrder"));

    try {
      const promises = cartItems.map((item) => {
        const { product_id, quantity, price } = item;
        return axios.post(
          `http://localhost:3001/api/orderItem`,
          {
            orderid, // make sure the key matches your API
            productId: product_id,
            quantity,
            price,
          },
          { withCredentials: true }
        );
      });

      const responses = await Promise.all(promises);
      const responseData = responses.map((res) => res.data);
      return responseData; // returns array of inserted items
    } catch (error) {
      const msg =
        (error.response && error.response.data?.error) ||
        "Something went wrong.";
      return thunkAPI.rejectWithValue(msg);
    }
  }
);


const  orderSlice = createSlice({
    name :"order",
    initialState : {
        allOrders :[],
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
            }).addCase(creatOrder.fulfilled,(state,action)=>{
                localStorage.setItem("idOrder",action.payload.id)
            }).addCase(creatItems.fulfilled,(state,action)=>{
                localStorage.removeItem("idOrder")
                localStorage.removeItem("cart")
            }).addCase(allOrders.fulfilled ,(state,action)=>{
              state.allOrders =action.payload

            })
        }
})

// export const {} = cartSlice.actions

export default orderSlice.reducer