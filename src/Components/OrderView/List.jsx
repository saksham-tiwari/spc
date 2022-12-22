import React, { useEffect, useState } from 'react'
import { getProdById } from '../../server/services/product/product.service'
import styles from "./styles.module.css"
import { useDispatch } from "react-redux";  
import { setLoading } from '../../server/redux/actions/loading';
import { useNavigate } from 'react-router-dom';

const List = (props) => {
    const navigate = useNavigate()
    const [data,setData] = useState([])

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setLoading(true))
        getProdById(props.data.product)
        .then((res)=>{
            // console.log(res);
            dispatch(setLoading(false))
            console.warn(res)
            setData(res.data)
        })
        .catch((err)=>{
            dispatch(setLoading(false))
            console.log(err);})
    },[])
  return (
    <div className={styles.list} onClick={()=>{navigate(`/product/${data._id}`)}}>
        {data.length!==0?<><div style={{flex:"1"}}>
            <img className={styles.prodImg} src={data.imageUrl[0]} alt="product"></img>
        </div>
        <div style={{flex:"7"}}>
            <h2>{data.name} <span>Rs. {data.price}</span></h2>
            <p className='empText'>Quantity : {props.data.quantity}</p>
        </div></>:<div></div>}
    </div>
  )
}

export default List