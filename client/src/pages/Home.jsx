import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'
import Faq from '../components/Faq'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
    <Navbar />
    <Hero/>
    <div className='py-0'></div>
    <AiTools />
    <div className='text-center font-semibold text-3xl  p-6'>Loved by <span className='text-4xl text-primary font-extrabold '>Creators</span></div>
    <Testimonial/>
    <Plan/>
    <Faq/>
    {/* <div className='text-center font-semibold text-3xl  p-6'>Frequently Asked <span className='text-4xl text-primary font-extrabold '>Questions</span></div>
    <Faq/> */}
    <div className='py-9'></div>
    
   <div className='rounded-lg bg-gray-50 shadow-lg'>
     <Footer/>
   </div>
    </>
  )
}

export default Home