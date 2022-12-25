import React from 'react'
import styles from "../styles.module.css"
import StarBorderIcon from '@mui/icons-material/StarBorder';

const RatingList = (props) => {
  return (
    <div className={styles.ratings}>
        <h3 className='empText'> <StarBorderIcon/>{props.review.rate}</h3>
        <p className='empText'>{props.review.name} | DD Month YYYY</p>
        <h2>{props.review.userreview}</h2>
    </div>
  )
}

export default RatingList