import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './pages/home/home'
import Login from './pages/register/login'
import ForgetPassword from './pages/register/forgepass'
import SignIn from './pages/register/signin'
import Notfound from './pages/404/404'
import Item from './pages/product/item'
import Cart from './pages/user/cart'
import {Profil} from './pages/user/profile'
import ResetPassword from './pages/register/resetPassword'
import SuccessPage from './pages/register/succesPage'
import ProductPage from './pages/product/allProducts'
import HomePage from './pages/home/homepage'
import CategoryPage from './pages/product/category'
import EditUserPage from './pages/user/editUser'
import ChangePasswordPage from './pages/user/changePassword'
import OrderStepper from './pages/user/completOrder'
import Dashboard from './pages/dashboard/dashboard'
import OrderDetailsPage from './pages/dashboard/orderPage'
import DashboardPage from './pages/dashboard/dashbordPage'
import AllCustomersPage from './pages/dashboard/allCostumers'
import AllProductsPage from './pages/dashboard/allProductsDashboard'
import AddProductForm from './pages/dashboard/addProductPage'
import EditProductForm from './pages/dashboard/editProductPage'

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
