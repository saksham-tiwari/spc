import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import user1 from "../../Assets/user1.jpeg"
import user2 from "../../Assets/user2.jpeg"
import user3 from "../../Assets/user3.jpeg"
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";
import Content from "./Content";

export default function Caraousel() {
    const [imgArr,setImgArr] = useState([user1,user2,user3])
    const [reviews,setReviews] = useState(["I have been very pleased with all the soaps I have tried. A very high-quality product! The Mogra soap is of very high quality and smells great. Thank you so much and I will certainly be buying in the future!","I personally feel that these handcrafted soaps are way much better than the other soaps. The herbs and scents are a great combination(specially mogra). Quite a luxurious experience. Definitely worth the price.","As an extremely satisfied customer,I want to thank VE cell for your variety of homemade, natural and long lasting soaps. It was such a delightful experience to use these products."])
  return (
    <>
        <h1 style={{fontWeight: "600",fontSize: "2.5rem"}}>Exciting reviews <span className='empText' style={{fontWeight: "600",fontSize: "2.5rem"}}>from our faculties.</span></h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 200,
          modifier: 1.5,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {reviews.map((review,i)=><SwiperSlide><Content img={imgArr[i]} review={review}/></SwiperSlide>)}
        
      </Swiper>
    </>
  );
}
