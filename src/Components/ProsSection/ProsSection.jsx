import React from 'react'
import Card1 from '../Cards/Card1/Card1'
import styles from "./styles.module.css"
import truck from "../../Assets/truck.svg"
import packageImg from "../../Assets/package.svg"
import dollar from "../../Assets/dollar.svg"


const ProsSection = () => {
  return (
    <div className={styles.prosSec}>
        <h1>Delivering Quality product <span className='empText'>at Nominal price.</span></h1>
        <div className={`${styles.cardDiv} d-flex align-items-center justify-content-between`} style={{gap:"1.25rem"}}>
        <Card1 
          img={truck} 
          heading="No Transportation Cost"
          about="We use the ingredients like Alovera and Neem grown within the campus, therefore there is no cost of transportation of these ingredients which keep cost of the soaps low."
        />
        <Card1 
          img={packageImg}
          heading="No Advertisement Cost"
          about="Since we are making products locally by local resources for local people, therefore, there is no need to advertise the product. People are using it and it is in demand because of mouth publicity. "
        />
        <Card1 
          img={dollar}
          heading="No Packaging Cost"
          about="Since the product is being used by local people, there is no need to pack the product. It also reduces the cost of the product"
        />
        </div>
    </div>
  )
}

export default ProsSection