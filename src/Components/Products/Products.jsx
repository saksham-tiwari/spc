import React from 'react'
import Card2 from '../Cards/Card2/Card2'
import styles from "./styles.module.css"


const Products = () => {
  return (
    <div className={styles.products}>
        <h1>Our products,<span className='empText'> Purely handmade.</span></h1>
        <div className='d-flex align-items-center justify-content-between' style={{}}>
            <Card2/>
            <Card2/>
            <Card2/>
        </div>
    </div>
  )
}

export default Products