import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './home/home'
import Login from './login/login'
import ForgetPassword from './forgetPass/forgepass'


function App() {
    return (
    <BrowserRouter>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path='/forgot-password' element={<ForgetPassword/>}/>

        </Routes>
    </BrowserRouter>
  );
}

export default App;
