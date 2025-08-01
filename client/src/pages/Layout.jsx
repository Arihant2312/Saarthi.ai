import React, { use } from 'react'
import { Outlet } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import { SignIn } from '@clerk/clerk-react'
import { useUser } from '@clerk/clerk-react'  

//Import Menu from 'lucide-react'

function Layout() {
  const navigate = useNavigate()
  const [sidebar, setsidebar] = React.useState(false)
  const {user}=useUser()

  return user?(
    <div className='flex flex-col items-start justify-start h-screen'>
      <nav className='w-full  px-7 min-h-14  flex items-center justify-between border-b  border-gray-200'>
        <img src={assets.logo} alt="" className='cursor-pointer w-32 sm:w-44' onClick={() => navigate("/")} />
        {
          sidebar ? < X onClick={() => setsidebar(false)} className="w-6 h-6 text-gray-600 sm:hidden" /> :
            <Menu onClick={() => setsidebar(true)} className='w-6 h-6 text-gray-600 sm:hidden ' />

        }

      </nav>
      <div className=" flex flex-1 w-full flex-h-[calc(100vh-64px)] border-0.4 ">
        <Sidebar sidebar={sidebar} setsidebar={setsidebar} />
        <div className="flex-1 bg-[#eff1f3]">
           <Outlet />
        </div>
        
      </div>

     
    </div>
  ):(<div className='flex items-center justify-center h-screen'> 
    <SignIn/>
  </div>)
  
}

export default Layout