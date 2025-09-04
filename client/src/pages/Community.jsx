//import { UserRoundSearch } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {useUser} from '@clerk/clerk-react'
import { dummyPublishedCreationData } from '../assets/assets';
import { Heart } from 'lucide-react';

function Community() {
  const [creations,setcreations]=useState([])
  const {user}= useUser();
  const fetchcreations=async()=>{
    setcreations(dummyPublishedCreationData)
  }
  useEffect(()=>{
    if(user){
      fetchcreations();
    }

  },[user])
  return (
   
      <div class="flex-1 h-full flex flex-col gap-4 p-6 font-bold text-xl">
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
        <Heart  className={`miin-w-5 h-5 hover:scale-110 cursor-pointer ${creations.likes.includes(user?.id)?'fill-red-500 text-red-600':'text-white'}`} />
      </div>
    </div>
  </div>
  
))}
        </div>
      </div>
 
  )
}

export default Community