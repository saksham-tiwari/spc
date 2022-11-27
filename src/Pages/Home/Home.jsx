import React, { useEffect, useState } from 'react'
import Aim from '../../Components/Aim/Aim'
import Products from '../../Components/Products/Products'
import ProsSection from '../../Components/ProsSection/ProsSection'
import TopBlock from '../../Components/TopBlock/TopBlock'
import { getAllProducts } from '../../server/services/product/product.service'

const Home = () => {
  const [products,setProducts] = useState([{
    "_id": "6383bc48e95fc6b72f8416e5",
    "name": "Charcoal Soap",
    "category": "Soap",
    "quantity": 100,
    "price": 50,
    "imageUrl": [
        "/public/1669577799993pexels-antoni-shkraba-6187540.jpg"
    ],
    "eachrating": [],
    "__v": 0
}]);
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
    <ProsSection/>
    <Products products={products}/>
    <Aim/>
  </>
  )
}

export default Home