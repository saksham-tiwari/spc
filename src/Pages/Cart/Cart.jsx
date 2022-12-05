import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card3 from '../../Components/Cards/Card3/Card3';
import CartRate from '../../Components/CartRate/CartRate';
import { getCart } from '../../server/services/user/user.service';
import styles from "./styles.module.css"
import empty from "../../Assets/empty.svg"
import { useDispatch } from "react-redux";
import { setLoading } from '../../server/redux/actions/loading';

const Cart = (props) => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [data,setData] = useState([])
    const [change,setChange] = useState(1)
    useEffect(()=>{
        if(!props.isUser) navigate("/login")
        else {
          dispatch(setLoading(true))
          getCart()
          .then(res=>{
            setData(res.data.cart)
            dispatch(setLoading(false))
            console.log(res.data);
          })
          .catch(err=>{
            dispatch(setLoading(false))
            console.log(err);})
        }
    },[])

    useEffect(()=>{
      if(data.length===0){

      }
    },[data])

    const removeProduct = (index)=>{
      let x= [...data]
      x.splice(index,1)
      setData(x)
    }
  return (
    <div>
      {data.length?<h1 className={styles.head}>Cart</h1>:
      <div className={styles.empty}>
        <h1>Your cart is empty</h1>
        <p>Kindly add items to your cart to proceed further</p>
        <button className='prim-btn' onClick={()=>{navigate("/")}}>Explore items</button>
        <div>
        <img src={empty} alt="emptyCart"></img>
        </div>
      </div>}
      {data.length!==0&&<CartRate data={data} change={change}/>}
      {data.map((item,i)=><Card3 item={item} quantity={item.quantity} index={i} removeProduct={removeProduct} setChange={setChange}/>)}
    </div>
  )
}

export default Cart