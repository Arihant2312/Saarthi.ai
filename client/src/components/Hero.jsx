import React, { use } from 'react'
//import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import TextType from './ui/Texttype'
import RotatingText from '../blocks/TextAnimations/RotatingText/RotatingText'


const Hero = () => {
    const navigate = useNavigate()

    return (
        <div className='px-4  sm:20 xl:px-30 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>
            <div className=" flex text-center mb-6 justify-center items-center flex-col gap-4">
                <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto loading-[1.2]'>
                    Create Amazing Content <br /> with <span className='text-primary'>AI Tools</span></h1>

                <div className="flex justify-center items-center font-bold w-1/2 p-1  mx-auto gap-0">
                    <h1 className=' text-black  text-4xl justify-center  font-bold'>Generate</h1>
                    <RotatingText
                        texts={['Articles', ' Images', 'your workflow!', 'Resume']}
                        mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                        className="text-4xl  justify-center font-extrabold text-center font-sans text-blue-600  rounded-2xl px-2 py-1.4"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={2100}
                    />
                </div>




                {/*  */}

            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-2xl ">
                <button onClick={() => navigate('/ai')} className='bg-blue-700 text-white font-bold text-lg  px-5 py-2 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer'>Start Creating Now</button>
                <button  onClick={() => window.location.href = 'https://github.com/Arihant2312'} className='bg-white px-5 py-2 rounded-lg border text-lg border-gray-300 hover:scale-102 active:scale-95 transition cursor-pointer'>Watch demo</button>
            </div>
            <div className="flex items-center gap-2 mt-8 mx-auto text-gray-600" >
                <img className='h-12' src={assets.user_group} alt="people" /> Powered by 10k+ People
            </div>
        </div>
    )
}

export default Hero