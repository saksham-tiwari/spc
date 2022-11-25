import React, { useEffect } from 'react'
import Card2 from '../Cards/Card2/Card2'
import styles from "./styles.module.css"
import SearchIcon from '@mui/icons-material/Search';


const Products = (props) => {
  useEffect(()=>{
    const slider = document.querySelector('#products-slide');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);
});
  },[])
  return (
    <div className={styles.products}>
        <h1>Our products,<span className='empText'> Purely handmade.</span></h1>
        {props.products.length===0 && <div className={styles.empty}> <SearchIcon/> Listing products soon...</div>}
        <div className='d-flex align-items-center justify-content-between' id="products-slide">
        {props.products.map((product,i)=>{
          return <Card2 product={product}/>
        })}
            {/* <Card2/>
            <Card2/>
            <Card2/> */}
        </div>
    </div>
  )
}

export default Products