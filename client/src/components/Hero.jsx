import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import RotatingText from '../blocks/TextAnimations/RotatingText/RotatingText'

const Hero = () => {
    const navigate = useNavigate()

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

<div className="flex items-center justify-center gap-3 sm:gap-4 mt-4">
  {/* Static text */}
  <h2
    className="text-3xl sm:text-4xl md:text-5xl font-bold 
               text-transparent bg-clip-text 
               bg-gradient-to-r from-sky-400 via-purple-400 to-fuchsia-500
               drop-shadow-[0_0_6px_rgba(147,51,234,0.5)]
               animate-glow-soft">
    Generate
  </h2>

  {/* Rotating text */}
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
                        onClick={() => navigate('/ai')}
                        className="px-6 py-3 rounded-xl bg-gradient from-pink-500 via-purple-500 to-indigo-500 border-purple-500/20
             text-white font-bold  shadow-xl shadow-purple-500/50  hover:scale-105 transition-transform duration-300"
                    >
                        Start Creating Now
                    </button>
                    <button
                        onClick={() => window.location.href = 'https://github.com/Arihant2312'}
                        className="px-6 py-3 rounded-xl bg-gradient from-pink-500 via-purple-500 to-indigo-500 border-purple-500/20
             text-white font-bold  shadow-xl shadow-purple-500/50  hover:scale-105 transition-transform duration-300"
                    >
                        Watch Demo
                    </button>
                </div>

                  {/* Social Proof + Badges + Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-center z-10 animate-fadeIn">
          
          {/* Social Proof */}
          <div className="flex items-center gap-2">
            <img src={assets.user_group} alt="Users" className="h-10 w-30 rounded-full shadow-lg shadow-purple-600/50" />
            <p className="text-gray-300 text-sm sm:text-base">
              Trusted by <span className="text-purple-400 text-base font-semibold animate-pulseGlow">50+ creators</span>
            </p>
          </div>

          {/* Feature Badges */}
          <div className="flex  items-center gap-3">
            <span className="px-3 py-1 bg-purple-700/30 text-purple-400 rounded-full text-base font-semibold shadow-sm animate-pulseGlow">
              Lightning Fast ⚡
            </span>
            <span className="px-3 py-1 bg-fuchsia-700/30 text-fuchsia-400 rounded-full text-base font-semibold shadow-sm animate-pulseGlow">
              AI-Powered 🤖
            </span>
            <span className="px-3 py-1 bg-cyan-700/30 text-cyan-400 rounded-full text-base  font-semibold shadow-sm animate-pulseGlow">
              Fully Customizable 🎨
            </span>
          </div>

          {/* Stats */}
         
        </div>
      </div>

      {/* Glow Animations */}
      <style>{`
        @keyframes pulseGlow {
          0%,100% { text-shadow: 0 0 6px rgba(236,72,153,0.5), 0 0 10px rgba(147,51,234,0.4); }
          50% { text-shadow: 0 0 12px rgba(236,72,153,0.8), 0 0 20px rgba(147,51,234,0.6); }
        }
        .animate-pulseGlow { animation: pulseGlow 2.5s ease-in-out infinite; }

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
