import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { viewOrder } from '../../server/services/user/user.service'
import styles from "./styles.module.css"
import {useDispatch} from "react-redux"
import { setLoading } from '../../server/redux/actions/loading'
import SideMenu from '../../Components/SideMenu/SideMenu'
import OrderView from '../../Components/OrderView/OrderView'

const ViewOrder = () => {
    const location = useLocation()
    const dispatch = useDispatch() 
    const [data,setData] = useState({
        "razorpay": {
            "id": "order_0123456789",
            "entity": "order",
            "amount": 10000,
            "amount_due": 10000,
            "amount_paid": 0,
            "receipt": "rcp1",
            "status": "created",
            "attempts": 0,
            "notes": [],
            "paymentId": "pay_KoD41l0GYpNVf8",
            "singature": "e44d88b43d22539921c358b32e6915405c69e32f7d2935f01ce099db5671784d"
        },
        "_id": "638dd3b09a371c5c8533d9a5",
        "currency": "INR",
        "amount": 10000,
        "paid": true,
        "status": "Completed",
        "Item": [
            {
                "quantity": 1,
                "product": "6383bbbae95fc6b72f8416d5",
                "_id": "638c9cffcec7762f58b107d4"
            }
        ],
        "createdBy": "6385176bd7b9e9bfd29ec74e",
        "createdAt": "2022-12-05T11:19:12.310Z",
        "updatedAt": "2022-12-05T11:19:12.781Z",
        "__v": 0
    })
    useEffect(()=>{
        let id = location.pathname.split("/")[2]
        console.log(id);
        dispatch(setLoading(true))
        viewOrder(id)
        .then((res)=>{
            dispatch(setLoading(false))
            console.log(res);
            setData(res.data)
        })
        .catch((err)=>{
            console.log(err);
            dispatch(setLoading(false))

        })
    },[])
  return (
    <div className={styles.viewOrder}>
     <SideMenu/>
     <OrderView data={data}/>
     </div>
  )
}

export default ViewOrder