import React from 'react'
import styles from "./styles.module.css"
import img from "../../Assets/topblock.svg"

const TopBlock = () => {
  return (
    <div className={styles.topblock} style={{background:`url(${img})`, backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
        <div className={styles.textDiv}>
            <h1>One stop shop for natural and herbal soaps</h1>
            <button className='prim-btn'>Buy Products {'->'}</button>
        </div>
    </div>
  )
}

export default TopBlock