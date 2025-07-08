import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './home/home'
import Login from './login/login'
import ForgetPassword from './forgetPass/forgepass'
import SignIn from './signin/signin'
import Store from './store/store'


function App() {
    return (
    <BrowserRouter>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path='/forgot-password' element={<ForgetPassword/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/store' element={<Store/>}/>
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
