import React from 'react'
import Card1 from '../Cards/Card1/Card1'
import styles from "./styles.module.css"


const ProsSection = () => {
  return (
    <div className={styles.prosSec}>
        <h1>Delivering Quality product <span className='empText'>at Nominal price.</span></h1>
        <div className='d-flex align-items-center justify-content-between flex-wrap' style={{gap:"1.25rem"}}>
        <Card1/>
        <Card1/>
        <Card1/>
        </div>
    </div>
  )
}

export default ProsSection