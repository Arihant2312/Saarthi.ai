import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, useClerk } from "@clerk/clerk-react";
import { assets } from '../assets/assets'
import RotatingText from '../blocks/TextAnimations/RotatingText/RotatingText'

const Hero = () => {
  const navigate = useNavigate()
  const { isSignedIn } = useAuth()
  const { openSignIn } = useClerk()

  const handleStart = () => {
    if (isSignedIn) {
      navigate('/ai')
    } else {
      openSignIn({ redirectUrl: "/ai" })
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center px-5 sm:px-20 xl:px-30">

      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at top, #1c1c1c, #000000)",
        }}
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

        {/* Rotating Text */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold 
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

        {/* NEW — Social Proof + Badges (Upgraded) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-10 text-center z-10 animate-fadeIn">

          {/* Social Proof */}
          <div className="flex items-center gap-3 backdrop-blur-md px-3 py-2 rounded-xl border border-purple-500/20 
                          shadow-lg shadow-purple-600/20 bg-white/5">
            <img
              src={assets.user_group}
              alt="Users"
              className="h-10 rounded-full shadow-md shadow-purple-500/40"
            />
            <p className="text-gray-200 text-sm sm:text-base font-medium tracking-wide">
              Trusted by{' '}
              <span className="text-purple-400 font-semibold animate-glowX">
                50+ creators
              </span>
            </p>
          </div>

          {/* Feature Badges */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="px-4 py-1.5 rounded-xl text-sm font-semibold tracking-wide
                             bg-white/10 text-purple-300 border border-purple-400/30
                             shadow-[0_0_10px_rgba(168,85,247,0.3)]
                             hover:scale-105 transition-all duration-300 hover:shadow-purple-500/50 animate-glowSoft">
              ⚡ Lightning Fast
            </span>

            <span className="px-4 py-1.5 rounded-xl text-sm font-semibold tracking-wide
                             bg-white/10 text-fuchsia-300 border border-fuchsia-400/30
                             shadow-[0_0_10px_rgba(236,72,153,0.3)]
                             hover:scale-105 transition-all duration-300 hover:shadow-fuchsia-500/50 animate-glowSoft">
              🤖 AI-Powered
            </span>

            <span className="px-4 py-1.5 rounded-xl text-sm font-semibold tracking-wide
                             bg-white/10 text-cyan-300 border border-cyan-400/30
                             shadow-[0_0_10px_rgba(34,211,238,0.3)]
                             hover:scale-105 transition-all duration-300 hover:shadow-cyan-500/50 animate-glowSoft">
              🎨 Customizable
            </span>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes glowSoft {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(236,72,153,0.4)); }
          50% { filter: drop-shadow(0 0 12px rgba(236,72,153,0.8)); }
        }
        .animate-glowSoft { animation: glowSoft 3s ease-in-out infinite; }

        @keyframes glowX {
          0%, 100% { text-shadow: 0 0 8px rgba(168,85,247,0.7); }
          50% { text-shadow: 0 0 16px rgba(168,85,247,0.9); }
        }
        .animate-glowX { animation: glowX 2.8s ease-in-out infinite; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease forwards; }
      `}</style>
    </div>
  )
}

export default Hero
