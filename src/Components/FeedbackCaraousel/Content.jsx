import React from 'react'
import styles from "./styles.module.css"
import img from "../../Assets/user.png"
const Content = (props) => {
  return (
    <div className={styles.content}>
        <img src={props.img} alt="user"></img>
        <p> {props.review}
        </p>
    </div>
  )
}

export default Content