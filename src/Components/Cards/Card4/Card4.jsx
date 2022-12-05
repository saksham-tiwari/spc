import React from 'react'
import styles from "./styles.module.css"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom';


const Card4 = (props) => {
    const navigate = useNavigate();
    const redirect = ()=>{
        navigate("/view-order/"+props.data._id)
    }
  return (
    <div className={styles.card}>
        <h2>
        Order Id {'#'}{props.data.razorpay.id.split("_")[1]}
        <span className={styles.capsule}>Delivered</span>
        <span className={styles.price}>Rs.50</span>
        </h2>
        <p className='empText'>No. of items : {props.data.Item.length}</p>
        <p>Rate your experience <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/></p>
        <button className="sec-btn" onClick={redirect}>View Details</button>
    </div>
  )
}

export default Card4