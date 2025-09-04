import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { Menu, X } from 'lucide-react';
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
      <nav className="w-full px-4 sm:px-7 h-12 flex items-center justify-start border-b border-gray-200 bg-[#1e1f4d]">
        <img
          src={assets.logo}
          alt="logo"
          className=" h-10 rounded-full bg-transparent object-center cursor-pointer"
          onClick={() => navigate('/')}
        />
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          />
        )}
      </nav>

      {/* Sidebar + Content */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Sidebar */}
        <div className="hidden sm:block">
          <Sidebar sidebar={true} setsidebar={setSidebar} />
        </div>

        {/* Mobile Sidebar */}
        <div className="sm:hidden absolute top-14 left-0 z-50">
          <Sidebar sidebar={sidebar} setsidebar={setSidebar} />
        </div>

        {/* Main content */}
        <main className="flex-1 bg-[#eff1f3] overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
