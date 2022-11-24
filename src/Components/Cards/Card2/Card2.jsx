import React from 'react'
import styles from "./styles.module.css"
import soap from "../../../Assets/soap.png"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';



const Card2 = () => {
  return (
    <div className={styles.card}>
      <img src={soap} alt="product"></img>
      <h3>Neem Soap that works as natural scrubber</h3>
      <p>Rs.50</p>
      <div className='d-flex align-items-center justify-content-between' style={{gap:"0.5rem"}}>
        <button className="sec-btn"><FavoriteBorderOutlinedIcon/></button>
        <button className="prim-btn">Add to Cart</button>
      </div>
    </div>
  )
}

export default Card2