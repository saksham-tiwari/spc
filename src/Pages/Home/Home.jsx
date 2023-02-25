import React, { useEffect, useState } from 'react'
import Aim from '../../Components/Aim/Aim'
import Caraousel from '../../Components/FeedbackCaraousel/Caraousel'
import Products from '../../Components/Products/Products'
import ProsSection from '../../Components/ProsSection/ProsSection'
import TopBlock from '../../Components/TopBlock/TopBlock'
import { getAllProducts } from '../../server/services/product/product.service'

const Home = () => {
  const [products,setProducts] = useState([]);
  useEffect(()=>{
    getAllProducts()
    .then((res)=>{
      console.log(res.data);
      setProducts(res.data);
    })
    .catch((err)=>{console.log(err);})
  },[])
  return (
  <>
    <TopBlock/>
    <Products products={products}/>
    <ProsSection/>
    <Aim/>
    <Caraousel/>
  </>
  )
}

export default Home