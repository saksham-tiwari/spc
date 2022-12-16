import StarBorderIcon from '@mui/icons-material/StarBorder'
import React, { useEffect, useState } from 'react'
import List from './List'
import styles from "./styles.module.css"
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import { generateQr } from '../../server/services/user/user.service';
import Qrcode from './Qrcode';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../server/redux/actions/loading';

const OrderView = (props) => {
    const [qrValue,setQrValue] = useState("")
    useEffect(()=>{
        console.log(props);
    },[])

    const dispatch = useDispatch()
    const generate = (print=false)=>{
        dispatch(setLoading(true))
        generateQr(props.data.razorpay.paymentId)
        .then((res)=>{
            console.log(res.data);
            dispatch(setLoading(false))
            setQrValue(res.data)
            console.log(print);
            if(print) printBill()
        })
        .catch((err)=>{
            dispatch(setLoading(false))
            console.log(err);
        })
    }
    const printBill = ()=>{
        // generate
        console.log("printing");
        window.print();
    }
  return (
    <div className={styles.orderView} id="section-to-print">
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
        {qrValue.length>0&&<Qrcode value={qrValue}/>}
        <div className={styles.buttonDiv} id="dont-print">
        <button className="sec-btn" onClick={()=>generate(true)} style={{border: "1px solid #E6E7E7"}}><FileDownloadOutlinedIcon/>Download invoice</button>
        <button className="prim-btn" onClick={()=>generate(false)} disabled={qrValue.length>0}><QrCode2OutlinedIcon/>Show QR</button>
        </div>

    </div>
  )
}

export default OrderView