import React, { useState } from 'react'
import { BaseUrl } from '../../../server/services/BaseUrl'
import styles from "./styles.module.css"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addToCart } from '../../../server/services/user/user.service';

const Card3 = (props) => {
    const add = ()=>{
        addToCart(props.item.product._id)
        .then((res)=>{console.log(res);})
        .catch((err)=>{console.log(err);})
        setQuantity(quantity+1)
    }
    const remove = ()=>{
        addToCart(props.item.product._id,true)
        .then((res)=>{console.log(res);})
        .catch((err)=>{console.log(err);})   
        setQuantity(quantity-1)

    }

    const [quantity,setQuantity] = useState(props.item.quantity);
  return (
    <div className={styles.card}>
        <img src={BaseUrl+props.item.product.imageUrl[0]} alt="product"></img>
        <div className={styles.two}>
            <h3>{props.item.product.name}</h3>
            <div className={styles.plusMinus}>
                <button onClick={remove}><RemoveIcon/></button>
                <span>{quantity}</span>
                <button onClick={add}><AddIcon/></button>
            </div>
        </div>
        <div>
            <p>Rs. {props.item.product.price}</p>
        </div>
    </div>
  )
}

export default Card3