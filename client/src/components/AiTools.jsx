import React from 'react'
import { AiToolsData } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import SpotlightCard from '../blocks/SpotlightCard.jsx'
import { useClerk } from '@clerk/clerk-react'

const AiTools = () => {
    const navigate = useNavigate()
    const { user, isSignedIn } = useUser()
    const { openSignIn } = useClerk()

    const handleToolClick = (toolPath) => {
        if (!isSignedIn) {
            // If user is not authenticated, redirect to sign-in page
            openSignIn()
            return
        }
        // If user is authenticated, navigate to the tool
        navigate(toolPath)
    }

    return (
        <div className='px-4 sm:px-20 xl:px-32 py-0 bg-white'>
            <div className='text-center'>
                <h2 className='text-slate-700 text-[42px] font-semibold'>Powerful AI Tools</h2>
                <p className='text-gray-500 max-w-lg mx-auto'>
                    Everything you need to create, enhance, and optimize your content with cutting-edge AI technology
                </p>
            </div>
            
            <div className='flex flex-wrap mt-12 justify-center'>
                {AiToolsData.map((tool, index) => (
                    <div 
                        key={index} 
                        onClick={() => handleToolClick(tool.path)} 
                        className="cursor-pointer"
                    >
                        <SpotlightCard
                            spotlightColor="rgba(0, 128, 128, 0.4)"
                            className='custom-spotlight-card p-10 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition-all duration-300'
                        >
                            <tool.Icon
                                className='w-12 h-12 p-2 text-white rounded-xl'
                                style={{ background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})` }}
                            />
                            <h3 className='mt-6 mb-3 text-lg font-semibold'>{tool.title}</h3>
                            <p className='text-gray-500 text-sm max-w-[95%]'>{tool.description}</p>
                            
                            {/* Optional: Show authentication status */}
                            {!isSignedIn && (
                                <div className="mt-3 text-xs text-blue-600 font-medium">
                                  
                                </div>
                            )}
                        </SpotlightCard>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AiTools
