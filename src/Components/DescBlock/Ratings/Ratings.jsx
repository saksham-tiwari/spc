import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Rating } from 'react-simple-star-rating'
import { setLoading } from '../../../server/redux/actions/loading'
import { ratingReview } from '../../../server/services/user/user.service'
import styles from "../styles.module.css"

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
    dispatch(setLoading(true))
    ratingReview(props.data._id,rating,review)
    .then((res)=>{
        console.log(res);
        dispatch(setLoading(false))
    })
    .catch((err)=>{
        console.log(err);
        dispatch(setLoading(false))
    })
  }

  return (
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
  )
}

export default Ratings