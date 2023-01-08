import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { addToCart } from '../../server/services/user/user.service';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../server/redux/actions/cart';
import { message } from 'antd';
import { DoneSharp } from '@mui/icons-material';

const ProdDetails = (props) => {
  let navigate = useNavigate();
  let dispatch = useDispatch()
  const [isCart,setIsCart] = useState(false)
  const [cartLoad,setCartLoad] = useState(false)
  const loading = useSelector((state)=>state.loading).loading
  const cart = useSelector((state)=>state.cart)



  useEffect(()=>{
    console.log(cart,props.data._id);
    console.log(cart.filter(x=>x.product._id===props.data._id).length?1:0);
    if(cart.filter(x=>x.product._id===props.data._id).length) setIsCart(true)
  },[loading])

  const add = ()=>{
    setCartLoad(true)
    dispatch(addCart(props.data._id,false,props.data))
    .then((res)=>{console.log(res);
      setIsCart(true)
      message.success("Added to cart!")
      setCartLoad(false)})
    .catch((err)=>{
      message.error("Failed!")
      setCartLoad(false)
      if(err.response.status===401) navigate("/login") 
      console.log(err);})
    // addToCart(props.data._id)
    // .then((res)=>{console.log(res);})
    // .catch((err)=>{
    //   if(err.response.status===401) navigate("/login") 
    //   console.log(err);
    // })
  }
  return (
    <div className={styles.prodDetails}>
        <h3>{props.data.name}</h3>
        <p className={styles.stars}><StarBorderIcon /> 4.5+ (27) </p>
        <h4>Rs. {props.data.price}</h4>
        {isCart?<button className="prim-btn" onClick={()=>navigate("/cart")}><DoneSharp/> Go To Cart</button>:<button className="prim-btn" disabled={cartLoad} onClick={add}>
        {cartLoad&&<div class="spinner-border spinner-border-sm mx-1" role="status">
        </div>}
        Add To Cart</button>}        
        <button className='sec-btn'>Add to Wishlist</button>
        <p className={styles.info}>
            <div style={{marginRight:"0.5rem"}}><InfoOutlinedIcon/></div>
            <div> Additional Rs.15 off only for AKGECIANs </div>
        </p>
    </div>
  )
}

export default ProdDetails