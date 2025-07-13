import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:3001/login', {
                email: email,
                password: password
              })
        return response.data

    } catch (error) {
        const errorMsg =  error?.response?.data?.error || error?.message || 'Something went wrong. Please try again.';
        return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export


const  UserSlice = createSlice({
    name :"user",
    initialState : {
        user : null,
        name : "",
        email : "",
        phone : "",
        error: null
    },
    reducers :{
        logout: (state) => {
            state.user = null;
            state.name = "";
            state.email = "";
            state.phone = "";
            state.error = null;
        },
    },extraReducers:(builder)=>{
         builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const { info } = action.payload;
        state.user = info.id;
        state.name = info.name;
        state.email = info.email;
        state.phone = info.phone;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      });
    }
})

export const {logout} = UserSlice.actions

export default UserSlice.reducer