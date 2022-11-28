import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../server/services/BaseUrl'
import styles from "./styles.module.css"

const ProdDisplay = (props) => {
    const [mainImg,setMainImg] = useState("")
    useEffect(()=>{
      console.log(props.data.imageUrl); 
    },[])
  return (
    <div className={styles.prodDisplay}>
        <div className={styles.siderow}>
            {props.data.imageUrl.map(image=><img src={BaseUrl+image} alt='product' onClick={(e)=>setMainImg(e.target.currentSrc)}></img>)}
        </div>
        <div className={styles.prodImg}>
            <img src={mainImg!==""?mainImg:(BaseUrl+props.data.imageUrl[0])} alt='product'></img>
        </div>
    </div>
  )
}

export default ProdDisplay