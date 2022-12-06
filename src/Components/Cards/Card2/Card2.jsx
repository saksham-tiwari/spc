import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import soap from "../../../Assets/soap.png"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../../server/services/BaseUrl';
import { addToCart, isInCart, isInWishlist } from '../../../server/services/user/user.service';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';

const Card2 = (props) => {
  const navigate = useNavigate();
  
  const [isCart,setIsCart] = useState(false)
  const [isWishlist,setIsWishlist] = useState(false)
  const [cartLoad,setCartLoad] = useState(false)
  
  useEffect(()=>{
    console.log(props.product);
    isInCart(props.product._id)
    .then((res)=>{setIsCart(res.data)
    console.log(res);})
    .catch((err)=>{console.log(err);})
    isInWishlist(props.product._id)
    .then((res)=>{setIsWishlist(res.data)
    console.log(res);})
    .catch((err)=>{console.log(err);})
  },[])
  const add = ()=>{
    setCartLoad(true)
    addToCart(props.product._id)
    .then((res)=>{console.log(res);
      setIsCart(true)
      setCartLoad(false)})
    .catch((err)=>{
      setCartLoad(false)
      console.log(err);})
  }
  
  return (
    <div className={styles.card}>
      <img src={BaseUrl + props.product.imageUrl[0]} alt="product" onClick={()=>navigate(`/product/${props.product._id}`)} style={{cursor:"pointer"}}></img>
      <h3 onClick={()=>navigate(`/product/${props.product._id}`)} style={{cursor:"pointer"}}>{props.product.name}</h3>
      <p>Rs.{props.product.price}</p>
      <div className='d-flex align-items-center justify-content-between' style={{gap:"0.5rem"}}>
        {/* <button className="prim-btn" onClick={add}>{!isCart?("Add to Cart"):("Go To Cart")}</button> */}
        {isCart?<button className="prim-btn" onClick={()=>navigate("/cart")}><DoneSharpIcon/> Go To Cart</button>:<button className="prim-btn" disabled={cartLoad} onClick={add}>Add To Cart</button>}
        {isWishlist?<button className={`${styles.like} sec-btn`}><FavoriteIcon/></button>:<button className={`${styles.like} sec-btn`}><FavoriteBorderOutlinedIcon/></button>}
      </div>
    </div>
  )
}

export default Card2