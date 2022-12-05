import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import success from "../../Assets/ordersuccess.svg"
import styles from "./styles.module.css"

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!location.state) navigate('/');
    else {
      if(!location.state.redirect) navigate('/');
    }
    console.log(location);
  },[])
  return (
    <div className={styles.success}>
    <img src={success} alt="Order Success"/>
    <h2>Payment recieved!</h2>
    <p className='empText'>Your order is placed successfully. Please collect your order from SPC Center Akgec.</p>
    </div>
  )
}

export default OrderSuccess