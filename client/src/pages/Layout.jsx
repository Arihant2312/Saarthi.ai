import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, X, Home } from 'lucide-react';
import Sidebar from '../components/Sidebar.jsx';
import { SignIn, useUser } from '@clerk/clerk-react';

function Layout() {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SignIn />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">

      {/* Top Navbar */}
      <nav className="w-full px-4 sm:px-7 h-12 flex items-center justify-between border-b border-gray-700 bg-[#050625]">

        {/* Left: Logo + Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <img
            src="/image.png"
            alt="logo"
            className="h-9 rounded cursor-pointer"
            onClick={() => navigate('/')}
          />

          {sidebar ? (
            <X
              onClick={() => setSidebar(false)}
              className="w-6 h-6 text-gray-300 sm:hidden cursor-pointer"
            />
          ) : (
            <Menu
              onClick={() => setSidebar(true)}
              className="w-6 h-6 text-gray-300 sm:hidden cursor-pointer"
            />
          )}
        </div>

        {/* Right: Go Home Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 text-white text-sm sm:text-base px-3 py-1 
                       rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 
                       hover:scale-105 transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
        </div>

      </nav>

      {/* Sidebar + Content */}
      <div className="flex flex-1 w-full overflow-hidden">

        {/* Desktop Sidebar */}
        <div className="hidden sm:block">
          <Sidebar sidebar={true} setsidebar={setSidebar} />
        </div>

        {/* Mobile Sidebar */}
        {sidebar && (
          <div className="sm:hidden absolute top-12 left-0 z-50">
            <Sidebar sidebar={sidebar} setsidebar={setSidebar} />
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 bg-[#eff1f3] overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
