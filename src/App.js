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
import ProductPage from './home/all products/allProducts'
import HomePage from './home/homepage/homepage'
import CategoryPage from './home/category/category'
import EditUserPage from './home/profile/editUser'
import ChangePasswordPage from './home/profile/changePassword'
import OrderStepper from './home/cart/completOrder'
import Dashboard from './dashboard/dashboard'
import OrderDetailsPage from './dashboard/orderPage'
import DashboardPage from './dashboard/dashbordPage'
import AllCustomersPage from './dashboard/allCostumers'
import AllProductsPage from './dashboard/allProducts'
import AddProductForm from './dashboard/addProductPage'
import EditProductForm from './dashboard/editProductPage'

function App() {
    return (
    <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>} >
              <Route index element={<HomePage/>}/>
              <Route path='item/:id' element={<Item/>}/>
              <Route path='all-products' element={<ProductPage/>}/>
              <Route path='cart/:user' element={<Cart/>}/>
              <Route path='profil/:user' element={<Profil/>}/>
              <Route path='category/:category' element={<CategoryPage/>}/>
              <Route path='edit-profile/:user' element={<EditUserPage/>}/>
              <Route path='complet-order/:user' element={<OrderStepper/>}/>
              <Route path='dashboard/:user' element={<Dashboard/>}>
                <Route index element={<DashboardPage/>}/>
                <Route path='order/:id' element={<OrderDetailsPage/>}/>
                <Route path='all-Costumers' element={<AllCustomersPage/>}/>
                <Route path='all-products' element={<AllProductsPage/>}/>
                <Route path='add-product' element={<AddProductForm/>}/>
                <Route path='edit-product/:id' element={<EditProductForm/>}/>
              </Route>
          </Route>
          <Route path="/" index element={<Login/>} />
          <Route path='/forgot-password' element={<ForgetPassword/>}/>
          <Route path='/succes-page' element={<SuccessPage/>}/>
          <Route path='/reset-password/:user/:token' element={<ResetPassword/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/change-password/:user' element={<ChangePasswordPage/>}/>
          <Route path="*" element={<Notfound/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
