import React from 'react'

const Services = () => {
  return (
    <div className=''>
        <h1 className=' text-center text-5xl p-6'>Services</h1>
        <div className=' flex flex-row'>
            <div className=' px-10 py-20 w-4/5 flex flex-col justify-center bg-yellow-400 text-black'>
                <h3 className=' text-center text-2xl mb-4'>User</h3>
                <p className='p-4'>We will we offering a wide vareiety of solutions to our users incude route optimization and all the facilities like booking and oute optimizaton. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nihil aliquam maxime cupiditate aut. Laborum laboriosam libero corrupti suscipit, ratione fugit nostrum asperiores officia tempore hic a pariatur! Eos, est?</p>
                <div className="flex justify-center p-4">
                    <button className="bg-white text-black px-5 py-2 border-2 rounded-lg border-black">
                        Contact Us
                    </button>
                </div>
                
            </div>
            <div className=' px-10 py-20 w-4/5 flex flex-col justify-center bg-white text-black'>
                <h3 className=' text-center text-2xl mb-4'>Driver</h3>
                <p className='p-4'>We will we offering a wide vareiety of solutions to our users incude route optimization and all the facilities like booking and oute optimizaton. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nihil aliquam maxime cupiditate aut. Laborum laboriosam libero corrupti suscipit, ratione fugit nostrum asperiores officia tempore hic a pariatur! Eos, est?</p>
                <div className="flex justify-center p-4">
                    <button className="bg-yellow-400 text-black px-5 py-2 border-2 rounded-lg border-black">
                        Contact Us
                    </button>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Services