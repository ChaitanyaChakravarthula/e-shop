import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { LoginPage } from './pages/registration/Login';
import { SignupPage } from './pages/registration/SignupPage';
import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/data/myState';
import ProductInfo from './pages/productinfo/ProductInfo'
import Dashboard from './pages/admin/dashboard/Dashboard';
import DashboardTab from './pages/admin/dashboard/DashboardTab';

import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import AllProducts from './pages/allproducts/AllProducts';
import Contact from './pages/contact/Contact';
import About from './pages/about/About';

function App() {

  return (
    <>
      <Router>
        <MyState>
          <Routes>
        
            <Route path="/" element={<Home />} />
            <Route path="/productinfo/:id" element={<ProductInfo />} />
        
            <Route path="/order" element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            } />
           <Route path="/cart" element={<Cart />} />
           <Route path="/admin" element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
            } />
          <Route path="/*" element={<NoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/updateproduct" element={<UpdateProduct />} />
          <Route path="/admin/products" element={<DashboardTab />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/about" element={<About />} />





        </Routes>
      </MyState>
    </Router>
    </>
  )
}

export default App

// user 

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user')
  if (user) {
    return children
  } else {
    return <Navigate to={'/login'} />
  }
}

// admin 

const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('user'))

  if (admin.user.email === 'admin123@gmail.com') {
    return children
  }
  else {
    return <Navigate to={'/login'} />
  }

}
