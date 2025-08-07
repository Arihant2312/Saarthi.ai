import React from 'react'
import { useState } from 'react'
import { Sparkles,Music } from 'lucide-react'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import Markdown from 'react-markdown';
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;

const MusicRecommend = () => {
  const musicstyle = [ 
    "Pop","Electronic","Jazz","Rock","Country","Hip-Hop","Folk","R&B","Reggae","Blues","Classical"]
      
  
    const [selstyle,setselstyle] = useState('Realistic')
    const [input, setinput] = useState('')
    const [loading,setloading]=useState(false)
      const [content,setcontent]=useState('')
      const {getToken}=useAuth()
    //const [publish, setpublish] = useState(false);
    const onsubmithandler = async (e) => {
      e.preventDefault();
      // try{
      //   setloading(true)
      //   const token=await getToken()
      //   const prompt=`I want a ${selstyle} music session. I'm interested in ${input}.`
      //   const {data}=await axios.post('/api/ai/')
      // }
  
  
    }
  return (
   <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      <form onSubmit={onsubmithandler} action='' className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className="flex items-center gap-3">
          <Sparkles className='w-6 text-[#751352]' />
          <h1 className='text-xl font-semibold'>AI Music Recommender</h1>
        </div>
        <p className='mt-6 text-base font-medium'>Type Of</p>
        <input onChange={(e) => setinput(e.target.value)} value={input} type="text" className='w-full p-2 px-4 mt-2 outline-none text-base rounded-md border border-gray-400' placeholder='i want a gaming session music..' required />
        <p className='mt-4 text-base font-medium'>Category</p>
        <div className=" mt-3 flex gap-4 flex-wrap sm:max-w-9/11  ">
          {musicstyle.map((item) => (
            <span onClick={() =>setselstyle(item)} className={`text-sm px-4 py-1 border rounded-full cursor-pointer ${selstyle === item ? 'bg-purple-100 text-purple-700' : 'text-gray-500 border-gray-300'} `} key={item}>{item}</span>

          ))}
        </div>
        <br />
        <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#be6bb9] to-[#9b3097] text-white px-4 py-3 mt-5 text-base rounded-lg cursor-pointer'>
          <Music className='w-5 ' />
          Generate recommendations
        </button>
      </form>
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 ">
        <div className="flex items-center gap-3">
          <Music className='w-5 h-5 text-[#751352]' />
          <h1 className='text-xl font-semibold'>Recommended Music </h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5  text-gray-500">
            <Music className='w-9 h-9 ' />
            <p className='text-xs'>Enter the type of Music you want and click <span className='text-primary'>"Generate Recommendations"</span> to get started</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MusicRecommend