import React, { useEffect } from 'react'
import styles from "./styles.module.css"
import soap from "../../../Assets/soap.png"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../../server/services/BaseUrl';
import { addToCart } from '../../../server/services/user/user.service';



const Card2 = (props) => {
  useEffect(()=>{
    console.log(props.product);
  })
  const navigate = useNavigate();

  const add = ()=>{
    addToCart(props.product._id)
    .then((res)=>{console.log(res);})
    .catch((err)=>{console.log(err);})
  }
  
  return (
    <div className={styles.card}>
      <img src={BaseUrl + props.product.imageUrl[0]} alt="product" onClick={()=>navigate(`/product/${props.product._id}`)} style={{cursor:"pointer"}}></img>
      <h3 onClick={()=>navigate(`/product/${props.product._id}`)} style={{cursor:"pointer"}}>{props.product.name}</h3>
      <p>Rs.{props.product.price}</p>
      <div className='d-flex align-items-center justify-content-between' style={{gap:"0.5rem"}}>
        <button className="sec-btn"><FavoriteBorderOutlinedIcon/></button>
        <button className="prim-btn" onClick={add}>Add to Cart</button>
      </div>
    </div>
  )
}

export default Card2