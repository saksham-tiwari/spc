import React, { useEffect, useState } from 'react'
import Card4 from '../../Components/Cards/Card4/Card4'
import { viewOrderHistory } from '../../server/services/user/user.service'
import styles from "./styles.module.css"
import { useDispatch } from "react-redux";
import { setLoading } from '../../server/redux/actions/loading';
import SideMenu from '../../Components/SideMenu/SideMenu';
import { setFix } from '../../server/redux/actions/footer';
import empty from "../../Assets/empty.svg"
import { useNavigate } from 'react-router-dom';


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

  useEffect(()=>{
    (data.length<3&&data.length!==0)?dispatch(setFix(true)):dispatch(setFix(false))
    return ()=>dispatch(setFix(false))
  },[data])
  const navigate = useNavigate()
  return (
    <div className={styles.myOrders}>
      {/* <h1>My Orders</h1> */}
      <SideMenu/>
      {data.length===0 && <div className={styles.empty}>
        <h1>You have no orders</h1>
        <p>Kindly buy some products.</p>
        <button className='prim-btn' onClick={()=>{navigate("/explore")}}>Explore items</button>
        <div>
        <img src={empty} alt="emptyCart"></img>
        </div>
      </div>}
      <div className={styles.cards}>
        {data.map(ele=><Card4 data={ele}/>)}
      </div>
    </div>
  )
}

export default OrderHistory