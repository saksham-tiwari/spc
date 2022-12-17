import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../Pages/Authentication/Login/Login'
import Otp from '../Pages/Authentication/Otp/Otp'
import Register from '../Pages/Authentication/Register/Register'
import Cart from '../Pages/Cart/Cart'
import Home from '../Pages/Home/Home'
import OrderSuccess from '../Pages/Order Succes/OrderSuccess'
import OrderHistory from '../Pages/OrderHistory/OrderHistory'
import ProductPage from '../Pages/ProductPage/ProductPage'
import SearchPage from '../Pages/SearchPage/SearchPage'
import ViewOrder from '../Pages/ViewOrder/ViewOrder'

const Router = () => {
  // const [isUser,setUser] = useState(localStorage.getItem("token")!==null)
  // const checkUser = ()=>{
  //   if(localStorage.getItem("token")!==null) return true
  //   return false
  // }
  // useEffect(()=>{
  //   if(checkUser()) setUser(true)
  //   else setUser(false)
  //   console.log(isUser);
  // },[isUser])
  const isUser = useSelector((state)=>state.user).isUser
  return (

    <Routes>

        {/* Routes accessible without login */}
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/product/:id" element={<ProductPage/>}/>
        <Route exact path="/search" element={<SearchPage/>}/>
        <Route exact path="/cart" element={<Cart isUser={isUser}/>}/>
        <Route exact path="/order-history" element={<OrderHistory/>}/>
        <Route exact path="/view-order/:id" element={<ViewOrder/>}/>
        <Route exact path="/order-success" element={<OrderSuccess/>}/>

        {/* Auth section, accessible only when not already logged in */}
        {(!isUser)&&
        <>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Register/>}/>
          <Route exact path="/otp" element={<Otp/>}/>
        </>}

        {/* Redirect to homepage if already logged in */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
    </Routes>
  )
}

export default Router