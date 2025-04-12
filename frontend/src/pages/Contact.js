import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      
      <div className='text-gray-700 text-center text-2xl pt-8 font-medium'>
        <p>CONTACT US</p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>

       <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />

       <div className='flex flex-col justify-center items-start gap-6'>
        <p className='text-lg text-gray-700 font-medium'>OUR OFFICE</p>
        <p className='text-gray-400'>00000 Muzaffarnagar <br /> 00000, U.P, (IND)</p>
        <p className='text-gray-400'>Tel: (+91) 123-4567890 <br /> Email: Prescripto@gmail.com</p>
        <p className='text-lg text-gray-700 font-medium'>CAREERS AT PRESCRIPTO</p>
        <p className='text-gray-400'>Learn more about our teams and job openings.</p>
        <button className='rounded-lg border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
       </div>

      </div>

    </div>
  )
}

export default Contact
