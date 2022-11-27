import React, { useEffect } from 'react'
import styles from "./styles.module.css"
import soap from "../../../Assets/soap.png"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../../server/services/BaseUrl';



const Card2 = (props) => {
  useEffect(()=>{
    console.log(props.product);
  })
  const navigate = useNavigate();

  
  
  return (
    <div className={styles.card} onClick={()=>navigate(`/product/${props.product._id}`)}>
      <img src={BaseUrl + props.product.imageUrl[0]} alt="product"></img>
      <h3>{props.product.name}</h3>
      <p>Rs.{props.product.price}</p>
      <div className='d-flex align-items-center justify-content-between' style={{gap:"0.5rem"}}>
        <button className="sec-btn"><FavoriteBorderOutlinedIcon/></button>
        <button className="prim-btn">Add to Cart</button>
      </div>
    </div>
  )
}

export default Card2