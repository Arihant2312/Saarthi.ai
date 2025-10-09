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
      openSignIn()
      return
    }
    navigate(toolPath)
  }

  return (
    <div className='px-4 sm:px-20 xl:px-32 py-16 bg-gradient-to-b from-[#040415] to-[#030314] min-h-screen'>
      <div className='text-center'>
        <h2 className='text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>
          Powerful AI Tools
        </h2>
        <p className='text-gray-400 mt-3 max-w-lg mx-auto text-sm sm:text-base'>
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
              spotlightColor="rgba(56, 189, 248, 0.2)"
              className='custom-spotlight-card p-8 m-4 max-w-xs rounded-2xl 
                         bg-[#1e1e2f] border border-gray-700 
                         shadow-[0_0_15px_rgba(56,189,248,0.15)] 
                         hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] 
                         hover:-translate-y-1 transition-all duration-300'
            >
              <tool.Icon
                className='w-12 h-12 p-2 text-white rounded-xl'
                style={{
                  background: `linear-gradient(to bottom right, ${tool.bg.from}, ${tool.bg.to})`,
                }}
              />
              <h3 className='mt-6 mb-2 text-lg font-semibold text-transparent bg-clip-text 
               bg-gradient-to-r from-sky-400 via-purple-400 to-fuchsia-500'>
                {tool.title}
              </h3>
              <p className='text-gray-400 text-sm leading-relaxed'>
                {tool.description}
              </p>

              {!isSignedIn && (
                <div className="mt-3 text-xs text-cyan-400 font-medium italic">
                  Sign in to explore this tool →
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
