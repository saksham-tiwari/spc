import React from 'react'
import styles from "./styles.module.css"
// import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom';


const Card4 = (props) => {
    const navigate = useNavigate();
    const redirect = ()=>{
        navigate("/view-order/"+props.data._id)
    }
  return (
    <div className={styles.card}>
        <h2>
        Order Id {'#'}{props.data._id}
        <span className={styles.capsule} style={props.data.status.toLowerCase()==="delivered"?{}:{backgroundColor:"rgba(240, 195, 98,0.2)",color:"rgba(240, 195, 98)"}}>{props.data.status[0].toUpperCase()+props.data.status.slice(1)}</span>
        <span className={styles.price}>Rs.{(props.data.amount)/100}</span>
        </h2>
        <p className='empText'>No. of items : {props.data.Item.length}</p>
        {/* <p>Rate your experience <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/></p> */}
        <button className="sec-btn" onClick={redirect}>View Details</button>
    </div>
  )
}

export default Card4