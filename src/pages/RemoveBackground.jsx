import React from 'react'
import { useState } from 'react'
import { Eraser, Sparkles } from 'lucide-react'

import axios from 'axios'
import toast from 'react-hot-toast'
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;
import { useAuth } from '@clerk/clerk-react';
function RemoveBackground() {
  
    const [input, setinput] = useState('')
    const[loading,setloading]=useState(false)
    const [content,setcontent]=useState('')
    const {getToken}= useAuth();
    const onsubmithandler = async (e) => {
      e.preventDefault();
      try{
        setloading(true)
        const formdata=new FormData();
        formdata.append('image',input);
        const {data}=await axios.post('/api/ai/remove-image-background',formdata,{ headers:{
          Authorization:`Bearer ${await getToken()}`}})
          if(data.success){
            setcontent(data.content)
            toast.success('Background removed successfully')
          }
          else{
            toast.error(data.message)
            console.log(data.message)
          }
       
      }
      catch(error){
        toast.error(error.message)
     
      }
  setloading(false);
  
    }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      <form onSubmit={onsubmithandler} action='' className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className="flex items-center gap-3">
          <Sparkles className='w-6 text-[#FF4938]' />
          <h1 className='text-xl font-semibold'>Background Removal</h1>
        </div>
        <p className='mt-6 text-base font-medium'>Upload Image</p>
<input
  type="file"
  accept="image/*"
  required
  onChange={(e) => setinput(e.target.files[0])}
  className="w-full p-2 px-4 mt-2 outline-none text-base rounded-md border border-gray-400"
/>
       {/* // <p className='mt-4 text-base font-medium'>Category</p>
        <div className=" mt-3 flex gap-4 flex-wrap sm:max-w-9/11  ">
          {blogcategories.map((item) => (
            <span onClick={() =>setselcateg(item)} className={`text-sm px-4 py-1 border rounded-full cursor-pointer ${selcat === item ? 'bg-purple-100 text-purple-700' : 'text-gray-500 border-gray-300'} `} key={item}>{item}</span>

          ))}
        </div>
        <br /> */}
        <p className='text-sm text-gray-500 font-light mt-1'>Supports JPG,PNG, and other image Formats</p>
        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-3 mt-5 text-base rounded-lg cursor-pointer'>
         { loading? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'> </span>:<Eraser className='w-5' />
}
          
        Remove Background
        </button>
      </form>
      {/* right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-106">
        <div className="flex items-center gap-3">
          <Eraser className='w-5 h-5 text-[#FF4938]' />
          <h1 className='text-xl font-semibold'>Processed Image </h1>
        </div>
        { !content ? ( <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5  text-gray-500">
            <Eraser className='w-9 h-9 ' />
            <p>Upload an image and click <span className='text-primary'>"Remove Background"</span> to get started</p>
          </div>
        </div>):(
          <img src={content} alt="image" className='mt-5 w-full h-full '/>
        )
        }
       

      </div>
    </div>
  )
}

export default RemoveBackground