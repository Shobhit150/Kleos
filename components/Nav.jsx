import React, { useState, useEffect } from 'react' 
import Image from "next/image";
import logo from '../public/logo.png'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { motion } from 'framer-motion';
const Nav = () => {
  const slideInVariants = {
    hidden: { y: '-100%' },
    visible: { y: '0' }
};
  const [toggle, setToggle] = useState(false)
  const [scroll, setScroll] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <nav className={`flex items-center justify-between py-4 fixed top-0 right-0 left-0 z-20 transition-colors duration-300 ${scroll ? 'bg-white shadow-md text-black' : 'bg-transparent'}`} >
      <div className='flex items-center h-full px-10'>
        <Image src={logo} alt='logo' width={50} height={50} className='h-full' />
      </div>
      <ul className=' flex-row hidden md:flex gap-8 mr-10'>
      <li className=''><a href='#'>Contact Us</a></li>
      <li className=''><a href='#'>About Us</a></li>
      <li className=''><a href='#'>User</a></li>  
      <li className=''><a href='#'>Drivers</a></li>
      </ul>
      
      <RxHamburgerMenu size={28} className={` cursor-pointer mx-10 md:hidden`} onClick={() => setToggle(!toggle)} />
      
      {toggle && (
        
         
                        <motion.ul
                        initial="hidden"
                        animate={toggle ? "visible" : "hidden"}
                        variants={slideInVariants}
                        className={`absolute top-0 flex flex-col gap-2 text-center w-full bg-black shadow-md pb-4 md:hidden`}
                        >
                          <div className='w-full flex justify-end px-8 py-5'>
                            <IoMdClose onClick={() => setToggle(!toggle)} size={32} className='cursor-pointer' />
                          </div>
                          <li className='hover:text-blue-500'><a href='#'>Contact Us</a></li>
                          <li className='hover:text-blue-500'><a href='#'>About Us</a></li>
                          <li className='hover:text-blue-500'><a href='#'>User</a></li>
                          <li className='hover:text-blue-500'><a href='#'>Drivers</a></li>
                        </motion.ul>
      )}
    </nav>
  )
}

export default Nav