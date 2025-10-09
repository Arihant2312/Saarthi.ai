import React from 'react'
import { useState } from 'react'
import { Sparkles, Hash, Edit } from 'lucide-react'
import { useAuth } from '@clerk/clerk-react';
import { Image } from 'lucide-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import axios from 'axios';
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;

function GenrateImages() {
  const imagestyle = [
    "Realistic", "Ghibli", "Retro", "Anime", "3D Render", "Pixel Art", "Potrait"]

  const [selimg, setselimg] = useState('Realistic')
  const [input, setinput] = useState('')
  const [publish, setpublish] = useState(false);
  const [content,setcontent]=useState('')
  const [loading, setloading] = useState(false)
  const {getToken}= useAuth();
  const onsubmithandler = async (e) => {
    e.preventDefault();
    try{
      setloading(true)
      const token=await getToken();
      const prompt=`Generate an image of ${input} in the style of ${selimg}.`
      const {data}=await axios.post('/api/ai/generate-image',{prompt,publish},{
        headers:{Authorization:`Bearer ${token}`},
      })
      if(data.success){
        setcontent(data.content)
        toast.success('Image generated successfully')
        
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
    }

setloading(false);
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      <form onSubmit={onsubmithandler} action='' className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className="flex items-center gap-3">
          <Sparkles className='w-6 text-[#50e962]' />
          <h1 className='text-xl font-semibold'>AI IMage Generator</h1>
        </div>
        <p className='mt-6 text-base font-medium'>Describe Your image</p>
        <textarea onChange={(e) => setinput(e.target.value)} rows={4} value={input} type="text" className='w-full p-2 px-4 mt-2 outline-none text-base rounded-md border border-gray-400' placeholder='Describe what you want to see in image...' required />
        <p className='mt-4 text-base font-medium'>Style</p>
        <div className=" mt-3 flex gap-4 flex-wrap sm:max-w-9/11  ">
          {imagestyle.map((item) => (
            <span onClick={() => setselimg(item)} className={`text-sm px-4 py-1 border rounded-full cursor-pointer ${selimg === item ? 'bg-green-100 text-green-700' : 'text-gray-500 border-gray-300'} `} key={item}>{item}</span>

          ))}
        </div>
        <div className="my-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => setpublish(e.target.checked)} // ✅ correct!
              checked={publish}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition" />
            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4" />
          </label>
          <p className="text-sm">Make this Image public</p>
        </div>

        <br />
        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#52b158] to-[#3dad41] text-white px-4 py-3 mt-5 text-base  rounded-lg cursor-pointer'>
          {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> : <Hash className='w-5 ' />}
          <Image className='w-5 ' />
          Generate Image
        </button>
      </form>
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 ">
        <div className="flex items-center gap-3">
          <Image className='w-6 h-6 text-[#50e962]' />
          <h1 className='text-xl font-semibold'>Generated Image </h1>
        </div>
        {!content ?( <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5  text-gray-500">
            <Image className='w-9 h-9 ' />
            <p>Enter a Topic and click <span className='text-primary'>"Generate Image"</span> to get started</p>
          </div>
        </div>):(
          <div className='mt-3 h-full '>
            <img src={content} alt="imaage"/> </div>
            )
        }
        

      </div>
    </div>
  )

}

export default GenrateImages