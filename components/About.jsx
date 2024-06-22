import React from 'react'
import Image from "next/image";
import about_img from '../public/bus_about.png'
const About = () => {
    return (


        <div className=' flex flex-row items-center p-8'>
            <div className=' flex-1 px-20 '>
                <h1 className='text-center text-5xl font-semibold mb-8'>About</h1>

                <p className=' mb-8'>Welcome to Mumbai Bus Connect! Navigate Mumbai with ease using our optimized routes and seamless ticket booking. Whether for work or leisure, enjoy a hassle-free travel experience with real-time updates. Revolutionize your commute with us!"</p>

                <button className=' bg-yellow-400 text-black px-8 py-3 rounded-md font-bold'>Learn More</button>
            </div>
            <div className='w-1/2 p-8  flex justify-center'>
                <Image src={about_img} alt='about' width={400} height={200} />
            </div>
        </div>

    )
}

export default About