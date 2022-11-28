import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Cart = (props) => {
    let navigate = useNavigate();
    useEffect(()=>{
        if(!props.isUser) navigate("/login")
    },[])
  return (
    <div>Cart</div>
  )
}

export default Cart