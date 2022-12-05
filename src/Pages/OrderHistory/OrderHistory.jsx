import React, { useEffect, useState } from 'react'
import Card4 from '../../Components/Cards/Card4/Card4'
import { viewOrderHistory } from '../../server/services/user/user.service'
import styles from "./styles.module.css"
import { useDispatch } from "react-redux";
import { setLoading } from '../../server/redux/actions/loading';
import SideMenu from '../../Components/SideMenu/SideMenu';


const OrderHistory = () => {
  const [data,setData] = useState([])
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setLoading(true));
    viewOrderHistory()
    .then((res)=>{
      console.log(res.data)
      dispatch(setLoading(false));

      setData(res.data)
    })
    .catch((err)=>{
      dispatch(setLoading(false));
      console.log(err)})
  },[])
  return (
    <div className={styles.myOrders}>
      {/* <h1>My Orders</h1> */}
      <SideMenu/>
      <div className={styles.cards}>
        {data.map(ele=><Card4 data={ele}/>)}
        {data.map(ele=><Card4 data={ele}/>)}
        {data.map(ele=><Card4 data={ele}/>)}
        {data.map(ele=><Card4 data={ele}/>)}
        {data.map(ele=><Card4 data={ele}/>)}
        {data.map(ele=><Card4 data={ele}/>)}
        {data.map(ele=><Card4 data={ele}/>)}
      </div>
    </div>
  )
}

export default OrderHistory