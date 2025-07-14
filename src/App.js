import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './home/home'
import Login from './login/login'
import ForgetPassword from './forgetPass/forgepass'
import SignIn from './signin/signin'
import Notfound from './404/404'
import Item from './home/item/item'
import Cart from './home/cart/cart'
import {Profil} from './home/profile/profile'
import ResetPassword from './resetPassword/resetPassword'
import SuccessPage from './succes page/succesPage'
import axios from 'axios'

function App() {
  axios.defaults.headers.common['token'] = localStorage.getItem("token");

    return (
    <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>} >
              <Route path='item/:id' element={<Item/>}/>
              <Route path='cart/:user' element={<Cart/>}/>
              <Route path='profil/:user' element={<Profil/>}/>
          </Route>
          <Route path="/" index element={<Login/>} />
          <Route path='/forgot-password' element={<ForgetPassword/>}/>
          <Route path='/succes-page' element={<SuccessPage/>}/>
          <Route path='/reset-password/:user/:token' element={<ResetPassword/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path="*" element={<Notfound/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
