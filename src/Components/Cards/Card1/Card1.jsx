import React from 'react'
import styles from "./styles.module.css"

const Card = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.circle}> <img src={props.img} alt="svg"/> </div>
      <h4>{props.heading}</h4>
      <p>{props.about}</p>
    </div>
  )
}

export default Card