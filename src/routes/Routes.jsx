import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Authentication/Login/Login'
import Otp from '../Pages/Authentication/Otp/Otp'
import Register from '../Pages/Authentication/Register/Register'
import Home from '../Pages/Home/Home'
import ProductPage from '../Pages/ProductPage/ProductPage'

const Router = () => {
  return (
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/product" element={<ProductPage/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<Register/>}/>
        <Route exact path="/otp" element={<Otp/>}/>
    </Routes>
  )
}

export default Router