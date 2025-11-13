import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Footer from '../Components/Footer'
import Services from '../Components/Services';
import Featured from '../Components/Featured';
import { Outlet } from 'react-router';

const HomeLayouts = () => {
  return (
    <div className='font-inter'>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default HomeLayouts