import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Rating } from 'react-simple-star-rating'
import { setLoading } from '../../../server/redux/actions/loading'
import { ratingReview } from '../../../server/services/user/user.service'
import styles from "../styles.module.css"
import { message } from 'antd'
import RatingList from './RatingList'
import StarIcon from '@mui/icons-material/Star';


const Ratings = (props) => {
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")
    const dispatch = useDispatch()


  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate)

    // other logic
  }
  // Optinal callback functions
//   const onPointerEnter = () => console.log('Enter')
//   const onPointerLeave = () => console.log('Leave')
//   const onPointerMove = (value, index) => console.log(value, index)

  const submit = (e)=>{
    e.preventDefault()
    if(rating===0)message.error("Rating Required")
    else if(review==="") message.error("Must have a review")
    else{
      dispatch(setLoading(true))
      ratingReview(props.data._id,rating,review)
      .then((res)=>{
          console.log(res);
          dispatch(setLoading(false))
          message.success("Review submitted!")
          setRating(0)
          setReview("")
      })
      .catch((err)=>{
          console.log(err);
          setRating(0)
          setReview("")
          dispatch(setLoading(false))
      })
    }
    
  }

  return (
    <>
    <form className={styles.formRating} onSubmit={submit}>
        <h3>Rate and Review the product:</h3>
        <Rating
            onClick={handleRating}
            // onPointerEnter={onPointerEnter}
            // onPointerLeave={onPointerLeave}
            // onPointerMove={onPointerMove}
            initialValue={0}
            /* Available Props */
        />
        <br/>
        <textarea placeholder='Your thoughts...' rows="4" cols="50" value={review} onChange={e=>setReview(e.target.value)}/>
        <br/>

        <button type="submit" className='prim-btn'>Submit</button>
    </form>
    <br/>
    <div>
      <h1 className={styles.avg}><StarIcon fontSize="large"/>{props.data.avgrating} </h1>
      <p className='empText'>&emsp;&emsp;Average User Ratings</p>
      <div className={styles.reviews}>
        {props.data.eachrating.map(rate=><RatingList review={rate}/>)}
      </div>
    </div>
    </>

  )
}

export default Ratings