import React from 'react'
import {PricingTable} from '@clerk/clerk-react'
const Plan = () => {
  return (
    <div className=' max-w-2xl mx-auto z-20 my-28 '>
        <div className="text-center">
            <h2 className='text-blue-600 font-bold text-[35px]'>Choose Your Plan</h2>
            <p className='text-gray-400 max-w-lg mx-auto'>Start from free and scale as you grow.Find the perfect plan what your content needs</p>
        </div>
        <div className='mt-12 max-sm:mx-8 '>
            <PricingTable/>
        </div>

    </div>
  )
}

export default Plan