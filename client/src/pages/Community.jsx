//import { UserRoundSearch } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {useAuth, useUser} from '@clerk/clerk-react'

import { Heart } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;


function Community() {
  const [creations,setcreations]=useState([])
  const {user}= useUser();
  const [loading,setloading]=useState(true)
 const {getToken}= useAuth();
  const fetchcreations=async()=>{
    try{
      const {data}=await axios.get('/api/user/get-published-creations',{headers:{
        Authorization:`Bearer ${await getToken()}`
      }})
if(data.success){
  setcreations(data.creations)
  console.log(data.creations)
}
else{
  toast.error(data.message)

}
    }
    catch(error){
      toast.error(error.message)
    }
    setloading(false)
    
  }
  useEffect(()=>{
    if(user){
      fetchcreations();
    }

  },[user])

  const Imagelike=async(id)=>{
    
  try{
    
    const { data } = await axios.post('/api/user/toggle-like', { id }, {
      headers: {
        Authorization: `Bearer ${await getToken()}`
      }
    })
    if(data.success){
      toast.success(data.message)
      await fetchcreations();
    }
    else{
      toast.error(data.message)
    }

  }
  catch(error){
    toast.error(error.message)
  }


}
  return !loading ?((
   
      <div class="flex-1 h-full flex flex-col gap-3 p-2 font-bold text-xl text-primary">
        Creations
        <div class="bg-white h-full w-full rounded-xl overflow-y-scroll">
{creations.map((creations,index)=>(
  <div key={index} class="relative group inline-block pl-3 pt-3 w-full sm:max-1/2 lg:max-w-1/3 ">
    <img src={creations.content} className='w-full h-full rounded-lg object-cover' alt="cretioncontent"/>
    <div class="absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg">
      <p className='text-sm hidden group-hover:block'>{creations.prompt}</p>
      <div class="flex gap-1 items-center">
        <p>{creations.likes.length}</p>
        {/* onlcick option pending */}
        <Heart onClick={()=>Imagelike(creations.id)}  className={`min-w-4 h-4 hover:scale-110 cursor-pointer ${creations.likes.includes(user?.id)?'fill-red-500 text-red-600':'text-white'}`} />
      </div>
    </div>
  </div>
  
))}
        </div>
      </div>
 
  )):(
    <div className="flex justify-center items-center h-full "
    >
      <span className='w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin'>

      </span>
    </div>
  ) 
}

export default Community