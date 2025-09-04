import React, { useState } from 'react'
import {Edit, Sparkles} from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;


function WriteArticle() {

  const articlelength=[
    {length:800,text:'Short(500-800 words)'},
    {length:1000,text:'Medium (up to 1000 words)'},
    {length:1600,text:'Long(1200+ words)'},
    
    
    

  ]
  const [selectedlength,setselectedlength]=useState(articlelength[0])
  const [input,setinput]= useState('')
  const [loading,setloading]=useState(false)
  const [content,setcontent]=useState('')
  const {getToken}=useAuth()


  const onsubmithandler= async(e)=>{
    e.preventDefault();
    try{
      setloading(true)
      const token=await getToken()
      const prompt=`Write an article about ${input} that is ${selectedlength.text} in length.`;
      const {data}=await axios.post('/api/ai/generate-article',{prompt,length:selectedlength.length},{
        headers:{Authorization:`Bearer ${token}`},
      })
      if(data.success){
        setcontent(data.content)
        toast.success('Article Generated Successfully')
      }
      else{
        toast.error(data.message)
        console.log()

      }


    }catch(error){
      toast.error(error.message)
    }
    setloading(false)
  }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      <form onSubmit={onsubmithandler} action='' className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className="flex items-center gap-3">
          <Sparkles className='w-6 text-[#4A7AFF]'/>
          <h1 className='text-xl font-semibold'>Article Configuration</h1>
        </div>
        <p className='mt-6 text-base font-medium'>Article Topic</p>
        <input onChange={(e)=>setinput(e.target.value)} value={input} type="text" className='w-full p-2 px-4 mt-2 outline-none text-base rounded-md border border-gray-400' placeholder='the future of artificial intelligence is...' required/>
<p className='mt-4 text-base font-medium'>Article length</p>
<div className=" mt-3 flex gap-4 flex-wrap sm:max-w-9/11  ">
  {articlelength.map((item,index)=>(
    <span onClick={()=>setselectedlength(item)} className={`text-sm px-4 py-1 border rounded-full cursor-pointer ${selectedlength.text===item.text?'bg-blue-50 text-blue-700':'text-gray-500 border-gray-300'} `} key={index}>{item.text}</span>

  ))}
</div>
<br />
<button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-3 mt-5 text-base rounded-lg cursor-pointer'>
  {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>:

  <Edit className='w-5 '/> }
  Generate Article
</button>
      </form>
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Edit className='w-5 h-5 text-[#4A7Aff]'/>
          <h1 className='text-xl font-semibold'>Generated Article </h1>
        </div>
        {!content ? ( <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5  text-gray-500">
            <Edit className='w-9 h-9 '/>
            <p>Enter a Topic and click <span className='text-primary'>"Generate Article"</span> to get started</p>
          </div>
        </div>):(
          <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
            <div className='reset-tw'><Markdown>{content}</Markdown></div>

          </div>
        ) }
       

      </div>
    </div>
  )
}

export default WriteArticle