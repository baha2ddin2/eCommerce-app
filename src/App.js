import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './home/home'
import Login from './login/login'
import ForgetPassword from './forgetPass/forgepass'
import SignIn from './signin/signin'
import Notfound from './404/404'
import Item from './home/item/item'
import Cart from './home/cart/cart'
import Profil from './home/profile/profile'


function App() {

    return (
    <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>} >
            <Route path='/home/item/:id' element={<Item/>}/>
            <Route path='/home/cart' element={<Cart/>}/>
            <Route path='/home/profil' element={<Profil/>}/>

          </Route>
          <Route path="/login" element={<Login/>} />
          <Route path='/forgot-password' element={<ForgetPassword/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path="*" element={<Notfound/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
