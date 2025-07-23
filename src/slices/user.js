import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CryptoJS from "crypto-js";


export const forgetPassword = createAsyncThunk(
    "user/forgetPassword",
    async ({email},thunkAPI)=>{
        try {
            const response = await axios.post("http://localhost:3001/api/password/reset",{
                email : email
            })
            return response
        }catch(error){
            const errorMsg = error.response.data.error || 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)
        }
})

export const checkAuth = createAsyncThunk(
    "user/checkAuth",
    async (_,thunkAPI)=>{
        try{
            const response = await axios.get("http://localhost:3001/login/check-auth",{
                withCredentials: true
            })
            return response.data
        }catch(err){
            return thunkAPI.rejectWithValue(err)
        }
    }
)


export const logoutUser = createAsyncThunk(
    "user/logoutUser",async (thunkAPI)=>{
        try {
            const response =  await axios.post('http://localhost:3001/login/logout',{}, {
                withCredentials: true
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
            const response = await axios.put(`http://localhost:3001/api/password/reset-password/${user}/${token}`, {
                    password:password
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
        return response

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
      return response.data;
    } catch (error) {
      const errorMsg =
        error?.response?.data?.error || error?.message || "Registration failed";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);
export const changeUser = createAsyncThunk(
    "user/changeUser",
    async({name,email,phone,user},thunkAPI)=>{
        phone = String(phone)
        try{
            const userinfo = await axios.put(`http://localhost:3001/api/users/${user}`,{
                name,
                email,
                phone
            }, {
                withCredentials: true,
            })
            return userinfo.data
        }catch(error){
            const errorMsg =  error?.response?.data?.error || error?.message||error.response.error || 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)

        }
    }
)

export const profileuser = createAsyncThunk(
    "user/profileInfo",
    async({user},thunkAPI)=>{
        try{
            const userinfo = await axios.get(`http://localhost:3001/api/users/${user}`, {
                    withCredentials: true,
            })
            return userinfo.data
        }catch(error){
            const errorMsg =  error?.response?.data?.error || error?.message||error.response.error || 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)

        }
    }
)

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async({user},thunkAPI)=>{
        try{
            const userinfo = await axios.delete(`http://localhost:3001/api/users/${user}`, {
                    withCredentials: true,
            })
            return userinfo.data
        }catch(error){
            const errorMsg =  error?.response?.data?.error || error?.message||error.response.error || 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)

        }
    }
)
export const changePassword = createAsyncThunk(
    "user/changepassword",
    async({user,oldPassword,password},thunkAPI)=>{
        try{
            const userinfo = await axios.put(`http://localhost:3001/api/users/change-password/${user}`,{
                oldPassword,
                password
            }, {
                    withCredentials: true,
            })
            return userinfo.data
        }catch(error){
            const errorMsg =  error?.response?.data?.error || error?.message||error.response.error || 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)

        }
    }
)

export const getUsers = createAsyncThunk(
    "user/getUsers",
    async(_,thunkAPI)=>{
        try{
            const userinfo = await axios.get(`http://localhost:3001/api/users`, {
                    withCredentials: true,
            })
            return userinfo.data
        }catch(error){
            const errorMsg =  error?.response?.data?.error || error?.message||error.response.error || 'Something went wrong. Please try again.';
            return thunkAPI.rejectWithValue(errorMsg)

        }
    }
)


const  UserSlice = createSlice({
    name :"user",
    initialState : {
        allUsers : [],
        data :null,
        error: null,
    },
    reducers :{
        logout: (state) => {
            state.data = null
            state.error = null;
            localStorage.removeItem("username")
        }
    },extraReducers:(builder)=>{
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                const  data  = action.payload;
                state.data = data;
                state.error = null;
                const secretKey = process.env.REACT_APP_SECRET_KEY
                const encryptedName = CryptoJS.AES.encrypt(data.user, secretKey).toString();
                localStorage.setItem("username", encryptedName)

            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const info  = action.payload.data
                state.data = info;
                state.error = null;
                const secretKey = process.env.REACT_APP_SECRET_KEY
                const encryptedName = CryptoJS.AES.encrypt(info.user, secretKey).toString();
                localStorage.setItem("username", encryptedName)
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
            .addCase(logoutUser.rejected,(state,action )=>{
                state.error = action.payload
            })
            .addCase(profileuser.fulfilled,(state,action)=>{
                const data  = action.payload
                state.error = null
                state.data  = data
                state.error = null;
            })
            .addCase(profileuser.rejected,(state,action )=>{
                state.error = action.payload
            })
            .addCase(checkAuth.fulfilled,(state,action)=>{
                state.error = null
            })
            .addCase(getUsers.fulfilled ,(state , action)=>{
                state.allUsers = action.payload
            })
            // .addCase(checkAuth.rejected,(state,action )=>{
            //     state.error= action.payload
            // })
        }
})

export const {logout,checkcookie} = UserSlice.actions

export default UserSlice.reducer