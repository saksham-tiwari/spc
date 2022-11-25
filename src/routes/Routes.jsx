import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Authentication/Login/Login'
import Home from '../Pages/Home/Home'

const Router = () => {
  return (
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
    </Routes>
  )
}

export default Router