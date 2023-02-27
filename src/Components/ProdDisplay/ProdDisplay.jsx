import React, { useState } from 'react'
import { BaseUrl } from '../../server/services/BaseUrl'
import styles from "./styles.module.css"

const ProdDisplay = (props) => {
    const [mainImg,setMainImg] = useState("")
  return (
    <div className={styles.prodDisplay}>
        <div className={styles.siderow}>
            {props.data.imageUrl.map(image=> <img src={BaseUrl+image.replace(/ /g, '%20')} alt='product' onClick={(e)=>setMainImg(e.target.currentSrc)} className={(BaseUrl+image.replace(/ /g, '%20')===mainImg)?`${styles.active}`:""}></img>)}
        </div>
        <div className={styles.prodImg}>
            <img src={mainImg!==""?mainImg:(BaseUrl+props.data.imageUrl[0])} alt='product'></img>
        </div>
    </div>
  )
}

export default ProdDisplay