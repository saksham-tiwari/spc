import React, { useState } from 'react'
import { BaseUrl } from '../../../server/services/BaseUrl'
import styles from "./styles.module.css"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addToCart, removeFromCart } from '../../../server/services/user/user.service';
import { useDispatch } from 'react-redux';
import { removeCart } from '../../../server/redux/actions/cart';
import { useNavigate } from 'react-router-dom';

const Card3 = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [load,setLoad] = useState(false);
    const add = async()=>{
        props.setShimmer(true)
        setLoad(true)
        await addToCart(props.item.product._id)
        .then((res)=>{
            props.setChange(prev=>(prev+1)%10)
            console.log(res);})
        .catch((err)=>{console.log(err);})
        setQuantity(quantity+1)
        props.setShimmer(false)
        setLoad(false)
    }
    const remove = async ()=>{
        props.setShimmer(true)
        setLoad(true)
        if(quantity<=1){
            console.log(props.item._id);
            await dispatch(removeCart(props.item._id,props.item.product._id))
            .then((res)=>{
                props.setChange(prev=>(prev+1)%10)
                props.removeProduct(props.index)
                console.log(res);})
            .catch((err)=>{console.log(err);})
        }
        else{
            await addToCart(props.item.product._id,true)
            .then((res)=>{
                props.setChange(prev=>(prev+1)%10)
                console.log(res);})
            .catch((err)=>{console.log(err);})
        }
        setQuantity(quantity-1)
        props.setShimmer(false)
        setLoad(false)
    }
    const toProd = ()=>{
        navigate(`/product/${props.item.product._id}`)
    }

    const [quantity,setQuantity] = useState(props.quantity);
  return (
    <div className={styles.card}>
        <img onClick={toProd} src={BaseUrl+props.item.product.imageUrl[0]} alt="product"></img>
        <div className={styles.two}>
            <h3 onClick={toProd}>{props.item.product.name}</h3>
            <div className={styles.plusMinus}>
                <button onClick={remove} disabled={load}><RemoveIcon/></button>
                <span>{load?<div className="spinner-border spinner-border-sm" role="status"></div>:quantity}</span>
                <button onClick={add} disabled={load}><AddIcon/></button>
            </div>
        </div>
        <div>
            <p>Rs. {props.item.product.price}</p>
        </div>
    </div>
  )
}

export default Card3