import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Footer from '../Components/Footer'
import Services from './../Components/Services';
import Featured from './../Components/Featured';

const HomeLayouts = () => {
  return (
    <div className='font-poppins '>
        <Navbar></Navbar>
        <Hero></Hero>
        <Services></Services>
        <Featured></Featured>
        <Footer></Footer>
    </div>
  )
}

export default HomeLayouts