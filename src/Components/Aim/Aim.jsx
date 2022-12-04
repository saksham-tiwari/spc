import React from 'react'
import styles from "./styles.module.css"
import aim from "../../Assets/aim.svg"
const Aim = () => {
  return (
    <div className={styles.Aim}>
        <h1>Providing employment <span className='empText'>is the aim of the centre.</span></h1>
        <div className={`${styles.card} d-flex align-items-center justify-content-between`}>
            <img src={aim} alt="aim"/>
            <p className='empText'>
            Sustainable Production Center (SPC) is a startup initiated by Value Education (VE) Cell, AKGEC (Ajay Kumar Garg Engineering College). The center is situated at AKGEC campus, the backside of the boy's hostel. The total area of the center is 27 ft x 18 ft approximately. The center was conceptualized in Jan 2022 and finally registered with partnership deeds on 1 July 2022 with a holistic approach. <br/>
To start with, the Center is preparing handmade soaps using Alovera and Neem grown in the campus. The team collect fresh Alovera and Neem and use them as a soap ingredient without processing them chemically. <br/> <br/>

<b>The centre aims to give employment to the people, that’s why we are not using any machine</b> <br/> <br/>

The center trains people and give them job to prepare soaps. In future also, we are committed to prepare product by giving employment to local people rather than shifting towards big/giant machines.

            </p>
        </div>
    </div>
  )
}

export default Aim