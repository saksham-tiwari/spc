import React from 'react'
import styles from "./styles.module.css"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { addToCart } from '../../server/services/user/user.service';
import { useNavigate } from 'react-router-dom';

const ProdDetails = (props) => {
  let navigate = useNavigate();
  const cart = ()=>{
    addToCart(props.data._id)
    .then((res)=>{console.log(res);})
    .catch((err)=>{
      if(err.response.status===401) navigate("/login") 
      console.log(err);
    })
  }
  return (
    <div className={styles.prodDetails}>
        <h3>{props.data.name}</h3>
        <p className={styles.stars}><StarBorderIcon /> 4.5+ (27) </p>
        <h4>Rs. {props.data.price}</h4>
        <button className='prim-btn' onClick={cart}>Add to Cart</button>
        <button className='sec-btn'>Add to Wishlist</button>
        <p className={styles.info}>
            <div style={{marginRight:"0.5rem"}}><InfoOutlinedIcon/></div>
            <div> Additional 5% off on purchase of Rs. 849 and above</div>
        </p>
    </div>
  )
}

export default ProdDetails