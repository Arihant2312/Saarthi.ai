import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Footer = () => {
  const handleSubscribe = () => {
    // Show success toast
    toast.success('Email submitted successfully!', {
      style: {
        background: '#1c1c1c',
        color: '#fff',
        boxShadow: '0 0 10px rgba(147,51,234,0.6)',
      },
      iconTheme: {
        primary: '#8b5cf6', // purple
        secondary: '#000',
      },
      duration: 3000,
    });
  };

  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-12 w-full bg-gradient-to-t from-black via-[#1c1c1c] to-[#121212] text-gray-400 relative">
      {/* Toaster Component */}
      <Toaster position="top-center" />

      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-t border-gray-700/50 pt-6 pb-8">
        {/* Logo and Description */}
        <div className="md:max-w-xs">
          <img className="h-10 mb-4" src="/image.png" alt="Saarthi Logo" />
          <p className="text-sm text-gray-300">
            Experience the future of content creation with{' '}
            <span className="text-purple-400 font-semibold">Saarthi</span>.<br />
            AI-powered tools to help you generate, enhance, and optimize your content effortlessly.
          </p>
        </div>

        {/* Links and Newsletter */}
        <div className="flex-1 flex flex-col md:flex-row items-start md:justify-end gap-10 md:gap-20">
          {/* Company Links */}
          <div>
            <h2 className="font-semibold mb-4 text-gray-200">Company</h2>
            <ul className="text-sm space-y-2">
              <li><a className="hover:text-purple-400 transition-colors" href="#">Home</a></li>
              <li><a className="hover:text-purple-400 transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-purple-400 transition-colors" href="#">Contact Us</a></li>
              <li><a className="hover:text-purple-400 transition-colors" href="#">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="font-semibold mb-4 text-gray-200">Subscribe to our newsletter</h2>
            <p className="text-sm text-gray-400 mb-2 max-w-xs">
              Stay updated with the latest AI tools, tips, and articles delivered weekly.
            </p>
            <div className="flex gap-2 mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full max-w-[220px] h-10 rounded px-3 bg-[#2c2c2c] border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              />
              <button
                onClick={handleSubscribe}
                className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 text-black font-semibold rounded px-4 transition shadow-md hover:shadow-purple-500/50 hover:scale-105"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <p className="pt-6 text-center text-xs md:text-sm text-gray-500">
        Copyright 2025 © <span className="text-purple-400 font-bold">Saarthi</span>. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
