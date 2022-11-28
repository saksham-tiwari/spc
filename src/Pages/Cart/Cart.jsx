import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card3 from '../../Components/Cards/Card3/Card3';
import { getCart } from '../../server/services/user/user.service';
import styles from "./styles.module.css"

const Cart = (props) => {
    let navigate = useNavigate();
    const [data,setData] = useState([])
    useEffect(()=>{
        if(!props.isUser) navigate("/login")
        else {
          getCart()
          .then(res=>{
            setData(res.data.cart)
            console.log(res.data);
          })
          .catch(err=>{console.log(err);})
        }
    },[])
  return (
    <div>
      <h1 className={styles.head}>Cart</h1>
      {data.map((item,i)=><Card3 item={item}/>)}

    </div>
  )
}

export default Cart