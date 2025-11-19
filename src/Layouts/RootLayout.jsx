import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router';

const HomeLayouts = () => {
  return (
    <div className='font-inter overflow-x-hidden'>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default HomeLayouts