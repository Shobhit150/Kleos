import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import phone from '../public/phone.png'
import Typed from 'typed.js';
import bg_img from  '../public/bus.jpg'
const HomePage = () => {
    const typedRef = useRef(null);

    useEffect(() => {
    const options = {
      strings: ['bus','track','optimise'],
      typeSpeed: 450,
      backSpeed: 450,
      loop: true,
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      // Destroy Typed instance during cleanup to prevent memory leaks
      typed.destroy();
        };
    }, []);
  return (
    <div className=' relative z-[2] flex flex-row justify-around items-center py-40 overflow-hidden'>
        <Image src={bg_img} alt="bus" className=" w-full absolute z-[-1] -top-0 md:-top-24 opacity-35"/>
        <div className=' max-w-lg'>
            <h1 className=' text-5xl pb-10 font-bold'>One mobile solution for all your <span className='text-yellow-300' ref={typedRef}></span> <br/> needs</h1>
            <p className=' text-gray-300'>A seamless journey to anywhere in your city</p>
            <button className=' my-8 bg-yellow-400 text-black px-8 py-3 rounded-md font-semibold'>Learn more</button>
        </div>
        
            <Image src={phone} width={300} height={100}/>
        
        
    </div>
  )
}

export default HomePage