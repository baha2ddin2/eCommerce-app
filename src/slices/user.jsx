import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const forgetPassword = createAsyncThunk(
    "user/forgetPassword",
    async ({email},thunkAPI)=>{
        try {
            const response = await axios.post("http://localhost:3001/api/password/reset",{
                email : email
            })
            return response
        }catch(error){
            const errorMsg = error.response.data.det || 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)
        }
})
export const logoutUser = createAsyncThunk(
    "user/logoutUser",async (thunkAPI)=>{
        try {
            const response =  await axios.post('http://localhost:3001/login', {
                withCredentials: true  // this is required for cookies!
            })
            return response
        } catch (error) {
            const errorMsg = error?.response?.data?.error || 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)
        }

    }
)

export const resetPassword =createAsyncThunk(
    "user/resetPassword",async({user,token,password},thunkAPI)=>{
        try{
            const response = await axios(`http://localhost:3001/api/password/reset-password/${user}/${token}`, {
                    password:password,
                })
            return response
        }catch(error){
            const errorMsg = error?.response?.data?.error || 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)
        }
})


export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:3001/login', {
                email: email,
                password: password
            }, {
                withCredentials: true
            })
        return response.data

    } catch (error) {
        const errorMsg =  error?.response?.data?.error || error?.message || 'Something went wrong. Please try again.';
        return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async ({ user, name, email, password, phone }, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:3001/api/users", {
        user,
        name,
        email,
        password,
        phone,
    }, {
        withCredentials: true
    });

      return response.data.info;
    } catch (error) {
      const errorMsg =
        error?.response?.data?.error || error?.message || "Registration failed";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);


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
            .addCase(registerUser.fulfilled, (state, action) => {
                const { id, name, email, phone } = action.payload;
                state.user = id;
                state.name = name;
                state.email = email;
                state.phone = phone;

            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload;
            })

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
            })

            .addCase(forgetPassword.fulfilled,(state,action)=>{
                state.error = null

            })
            .addCase(forgetPassword.rejected,(state,action )=>{
                state.error= action.payload
            })
            .addCase(resetPassword.fulfilled,(state,action)=>{
                state.error = null

            })
            .addCase(resetPassword.rejected,(state,action )=>{
                state.error = action.payload
            })
            .addCase(logoutUser.fulfilled,(state,action)=>{
                state.error = null

            })
            .addCase(logout.rejected,(state,action )=>{
                state.error = action.payload
            })
        }
})

export const {logout} = UserSlice.actions

export default UserSlice.reducer