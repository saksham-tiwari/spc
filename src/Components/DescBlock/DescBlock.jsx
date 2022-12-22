import React, { useState } from 'react'
import Ratings from './Ratings/Ratings'
import styles from "./styles.module.css"

const DescBlock = (props) => {
  const [active,setActive] = useState(1)
  return (
    <div className={styles.descBlock}>
        <div className={styles.head}>
          <h2 className={active===0&&`${styles.active}`} onClick={()=>setActive(0)}>Description</h2>
          <h2 className={active===1&&`${styles.active}`} onClick={()=>setActive(1)}>Reviews and Ratings</h2>
        </div>
        {active===0&&<div className={`${styles.desc} empText`}>{props.data.description}</div>}
        {active===1&&<Ratings {...props}/>}
    </div>
  )
}

export default DescBlock