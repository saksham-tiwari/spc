import React from 'react'
import Aim from '../../Components/Aim/Aim'
import Products from '../../Components/Products/Products'
import ProsSection from '../../Components/ProsSection/ProsSection'
import TopBlock from '../../Components/TopBlock/TopBlock'

const Home = () => {
  return (
  <>
    <TopBlock/>
    <ProsSection/>
    <Products/>
    <Aim/>
  </>
  )
}

export default Home