import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { viewOrder } from '../../server/services/user/user.service'
import styles from "./styles.module.css"
import {useDispatch} from "react-redux"
import { setLoading } from '../../server/redux/actions/loading'
import SideMenu from '../../Components/SideMenu/SideMenu'

const ViewOrder = () => {
    const location = useLocation()
    const dispatch = useDispatch() 
    const [data,setData] = useState({})
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
     <SideMenu/></div>
  )
}

export default ViewOrder