import React from 'react'
import Aim from '../../Components/Aim/Aim'
import Products from '../../Components/Products/Products'
import ProsSection from '../../Components/ProsSection/ProsSection'
import TopBlock from '../../Components/TopBlock/TopBlock'
import Navbar from '../../Components/Navbar/Navbar'

const Home = () => {
  return (
  <>
  <div className='Home'>
    <Navbar />
    <TopBlock/>
    <ProsSection/>
    <Products/>
    <Aim/>
    </div>
  </>
  )
}

export default Home