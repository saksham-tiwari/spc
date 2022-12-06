import StarBorderIcon from '@mui/icons-material/StarBorder'
import React, { useEffect } from 'react'
import List from './List'
import styles from "./styles.module.css"
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';

const OrderView = (props) => {
    useEffect(()=>{
        console.log(props);
    },[])
  return (
    <div className={styles.orderView}>
        <h2>
            Order Id {'#'}{props.data.razorpay.id.split("_")[1]}
            <span className={styles.capsule}>Delivered</span>
            {/* <span className={styles.price}>Rs.{(props.data.amount)/100}</span> */}
        </h2>
        <h3>{props.data.Item.length} items</h3>
        <div>
            {props.data.Item.map((ele)=><List data = {ele}/>)}
            {/* <List/> */}
        </div>
        <p className={styles.rating}>Rate your experience <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/></p>
        <h3>Bill details</h3>
        <div className={styles.bill}>
            <h4 className='empText'>M.R.P. <span>Rs. {(props.data.amount)/100+10}</span></h4>
            <h4 className='empText'>Discount <span>Rs. 10</span></h4>
            <h3>Total Price <span>Rs. {(props.data.amount)/100}</span></h3>
        </div>
        <div className={styles.buttonDiv}>
        <button className="sec-btn" style={{border: "1px solid #E6E7E7"}}><FileDownloadOutlinedIcon/>Download invoice</button>
        <button className="prim-btn"><QrCode2OutlinedIcon/>Show QR</button>
        </div>
    </div>
  )
}

export default OrderView