import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/home'
import AboutPages from './pages/AboutPages/AboutPages'
import ContectPage from './pages/ContectPage/ContectPage'
import Menu from './pages/Menu/Menu'
import Cart from './pages/Cart/Cart'
import SignUp from './components/SignUp/SignUp'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import VerifyPaymentPage from './pages/VerifyPaymentPage/VerifyPaymentPage'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import MyOrderPage from './pages/MyOrderPage/MyOrderPage'




const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<AboutPages />} />
      <Route path='/contact' element={<ContectPage />} />
      <Route path='/menu' element={<Menu />} />
      
      <Route path='/login' element={<SignUp />} />
      <Route path='/signup' element={<SignUp />} />

      {/* PAYMENT VERIFICATION */}
      <Route path='/myorder/verify' element={<VerifyPaymentPage />} />

      <Route path='/cart' element={
        <PrivateRoute>
          <Cart />
        </PrivateRoute>
      } />
      
      <Route path='/checkout' element={
        <PrivateRoute>
          <CheckoutPage />
        </PrivateRoute>
      } />
      <Route path='/myorder' element={
        <PrivateRoute>
          <MyOrderPage />
        </PrivateRoute>
      } />


    </Routes>
  )
}

export default App
