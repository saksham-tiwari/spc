import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card3 from '../../Components/Cards/Card3/Card3';
import CartRate from '../../Components/CartRate/CartRate';
import { getCart } from '../../server/services/user/user.service';
import styles from "./styles.module.css"
import empty from "../../Assets/empty.svg"
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from '../../server/redux/actions/loading';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Cart = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [data,setData] = useState([])
    const [change,setChange] = useState(1)
    const [shimmer,setShimmer] = useState(true)
    const isUser = useSelector((state)=>state.user).isUser


    useEffect(()=>{
      console.log(isUser);
        // if(!isUser) navigate("/login")
        // else {
          setShimmer(true)
          dispatch(setLoading(true))
          getCart()
          .then(res=>{
            setData(res.data.cart)
            setShimmer(false)
            dispatch(setLoading(false))
            console.log(res.data);
          })
          .catch(err=>{
            dispatch(setLoading(false))
            setShimmer(false)
            console.log(err);})
        // }
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
      {data.length?<h1 className={styles.head}>
      <Link to="/"><ArrowBackIcon fontSize='large'/></Link>Cart</h1>:
      <div className={styles.empty}>
        <h1>Your cart is empty</h1>
        <p>Kindly add items to your cart to proceed further</p>
        <button className='prim-btn' onClick={()=>{navigate("/explore")}}>Explore items</button>
        <div>
        <img src={empty} alt="emptyCart"></img>
        </div>
      </div>}
      {data.length!==0&&<CartRate shimmer={shimmer} setShimmer={setShimmer} data={data} change={change}/>}
      {data.map((item,i)=><Card3 shimmer={shimmer} setShimmer={setShimmer} item={item} quantity={item.quantity} index={i} removeProduct={removeProduct} setChange={setChange}/>)}
    </div>
  )
}

export default Cart