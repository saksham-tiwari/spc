import React, { useEffect } from 'react'
import styles from "./styles.module.css"
import soap from "../../../Assets/soap.png"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';



const Card2 = (props) => {
  useEffect(()=>{
    console.log(props.product);
  })
  
  return (
    <div className={styles.card}>
      <img src={soap} alt="product"></img>
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