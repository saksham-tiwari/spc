// import StarBorderIcon from '@mui/icons-material/StarBorder'
import React, { useEffect, useState } from 'react'
import List from './List'
import styles from "./styles.module.css"
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import { generateQr } from '../../server/services/user/user.service';
import Qrcode from './Qrcode';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../server/redux/actions/loading';
import { setFix } from '../../server/redux/actions/footer';

const OrderView = (props) => {
    const [qrValue,setQrValue] = useState("")
    const [discount,setDiscount] = useState(15)
    const loading = useSelector((state)=>state.loading).loading
    useEffect(()=>{
        console.log(props,props.data===undefined);
        if(props.data!==undefined){
            let y=0
            props.data.Item.forEach(x=>{
                y+=x.quantity
            })
            setDiscount(y*15)
        }        
    },[props])
    useEffect(()=>{
        dispatch(setFix(false))
        return ()=>dispatch(setFix(false))
      },[])

    const dispatch = useDispatch()
    // const generate = (print=false)=>{
    //     dispatch(setLoading(true))
    //     generateQr(props.data.razorpay.paymentId)
    //     .then((res)=>{
    //         console.log(res.data);
    //         dispatch(setLoading(false))
    //         setQrValue(res.data)
    //         console.log(print);
    //         if(print) printBill()
    //     })
    //     .catch((err)=>{
    //         dispatch(setLoading(false))
    //         console.log(err);
    //     })
    // }
    const printBill = ()=>{
        // generate
        console.log("printing");
        window.print();
    }
  return (
    <div className={styles.orderView} id="section-to-print">
        {props.data?<><h2>
            Order Id {'#'}{props.data._id}
            <span className={styles.capsule} style={props.data.status.toLowerCase()==="delivered"?{}:{backgroundColor:"rgba(240, 195, 98,0.2)",color:"rgba(240, 195, 98)"}}>{props.data.status[0].toUpperCase()+props.data.status.slice(1)}</span>
            {/* <span className={styles.price}>Rs.{(props.data.amount)/100}</span> */}
        </h2>
        <h3>{props.data.Item.length} items</h3>
        <div>
            {props.data.Item.map((ele)=><List data = {ele}/>)}
            {/* <List/> */}
        </div>
        {/* <p className={styles.rating}>Rate your experience <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/></p> */}
        <h3>Bill details</h3>
        <div className={styles.bill}>
            <h4 className='empText'>M.R.P. <span>Rs. {(props.data.amount)/100+discount}</span></h4>
            <h4 className='empText'>Discount <span>Rs. {discount}</span></h4>
            <h3>Total Price <span>Rs. {(props.data.amount)/100}</span></h3>
        </div>
        {qrValue.length>0&&<Qrcode value={qrValue}/>}
        <div className={styles.buttonDiv} id="dont-print">
        <button className="sec-btn" onClick={()=>printBill()} style={{border: "1px solid #E6E7E7", width:"100%"}}><FileDownloadOutlinedIcon/>Download invoice</button>
        {/* <button className="prim-btn" onClick={()=>generate(false)} disabled={qrValue.length>0}><QrCode2OutlinedIcon/>Show QR</button> */}
        </div></>:<div style={{height:"200px"}}></div>}

    </div>
  )
}

export default OrderView