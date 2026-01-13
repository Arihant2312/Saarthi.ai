import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, useClerk } from "@clerk/clerk-react"
import RotatingText from '../blocks/TextAnimations/RotatingText/RotatingText'
import { assets } from '../assets/assets'

const Hero = () => {
  const navigate = useNavigate()
  const { isSignedIn } = useAuth()
  const { openSignIn } = useClerk()

  const handleStart = () => {
    if (isSignedIn) {
      navigate("/ai")
    } else {
      openSignIn({ redirectUrl: "/ai" })
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center px-5 sm:px-20 xl:px-30">
      
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: "radial-gradient(circle at top, #1c1c1c, #000000)" }}
      />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          Create Amazing Content <br />
          with{' '}
          <span className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
            AI Tools
          </span>
        </h1>

        {/* Rotating Text Section */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold 
                        text-transparent bg-clip-text 
                        bg-gradient-to-r from-sky-400 via-purple-400 to-fuchsia-500
                        drop-shadow-[0_0_6px_rgba(147,51,234,0.5)]
                        animate-glow-soft">
            Generate
          </h2>

          <RotatingText
            texts={[
              'Articles ✍️',
              'Images 🎨',
              'Workflow ⚙️',
              'Resumes 🧠',
              'Music 🎵',
              'Blog Titles 📰'
            ]}
            mainClassName="px-4 py-1 sm:px-6 sm:py-2 rounded-lg bg-transparent"
            className="text-3xl sm:text-4xl font-extrabold text-white 
                       drop-shadow-[0_0_6px_rgba(236,72,153,0.5)]
                       animate-glow-soft text-center tracking-tight"
            rotationInterval={2000}
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={handleStart}
            className="px-6 py-3 rounded-xl bg-gradient from-pink-500 via-purple-500 to-indigo-500 border-purple-500/20
                      text-white font-bold shadow-xl shadow-purple-500/50 hover:scale-105 transition-transform duration-300"
          >
            Start Creating Now
          </button>

          <button
            onClick={() => window.location.href = 'https://github.com/Arihant2312'}
            className="px-6 py-3 rounded-xl bg-gradient from-pink-500 via-purple-500 to-indigo-500 border-purple-500/20
                      text-white font-bold shadow-xl shadow-purple-500/50 hover:scale-105 transition-transform duration-300"
          >
            Watch Demo
          </button>
        </div>

      </div>
    </div>
  )
}

export default Hero
