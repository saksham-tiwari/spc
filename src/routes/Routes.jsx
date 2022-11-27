import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../Pages/Authentication/Login/Login'
import Otp from '../Pages/Authentication/Otp/Otp'
import Register from '../Pages/Authentication/Register/Register'
import Home from '../Pages/Home/Home'
import ProductPage from '../Pages/ProductPage/ProductPage'

const Router = () => {
  const [isUser,setUser] = useState(localStorage.getItem("token")!==null)
  const checkUser = ()=>{
    if(localStorage.getItem("token")!==null) return true
    return false
  }
  useEffect(()=>{
    if(checkUser()) setUser(true)
    else setUser(false)
    console.log(isUser);
  },[isUser])
  return (
    <Routes>

        {/* Routes accessible without login */}
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/product/:id" element={<ProductPage/>}/>

        {/* Auth section, accessible only when not already logged in */}
        {(!isUser)&&
        <>
          <Route exact path="/login" element={<Login setUser={setUser}/>}/>
          <Route exact path="/signup" element={<Register/>}/>
          <Route exact path="/otp" element={<Otp setUser={setUser}/>}/>
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