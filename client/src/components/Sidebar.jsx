import React from 'react';
import { Protect, useClerk, useUser } from '@clerk/clerk-react';
import {
  House,
  SquarePen,
  Image,
  Eraser,
  Hash,
  Scissors,
  FileText,
  Users,
  Music,
  BookOpenText,
  LogOut
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/generate-image', label: 'Generate Image', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/ai/music-recommend', label: 'Music Recommend', Icon: Music },
  { to: '/ai/article-summarize', label: 'Summarise Article', Icon: BookOpenText },
  { to: '/ai/community', label: 'Community', Icon: Users },
];

const Sidebar = ({ sidebar, setsidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`
        w-60 bg-white border-r border-gray-200 flex flex-col justify-between 
        max-sm:fixed max-sm:top-14 max-sm:left-0 max-sm:h-[calc(100vh-3.5rem)] 
        max-sm:z-50 max-sm:shadow-lg max-sm:transition-transform 
        max-sm:duration-300 max-sm:ease-in-out 
        ${sidebar ? 'max-sm:translate-x-0' : 'max-sm:-translate-x-full'}
      `}
    >
      {/* Top - User and Nav */}
      <div className="my-6 px-4 w-full">
        <img
          src={user?.imageUrl}
          alt="User Avatar"
          className="w-14 h-14 rounded-full mx-auto object-cover"
        />
        <h1 className="mt-2 text-center text-sm font-medium truncate">{user?.fullName}</h1>

        {/* Navigation Links */}
        <nav className="mt-6 flex flex-col gap-1 text-gray-700 font-medium">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setsidebar(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 flex items-center gap-3 rounded-md transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white'
                    : 'hover:bg-gray-100'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom - User profile + logout */}
      <div className="w-full border-t border-gray-200 px-4 py-3 flex items-center justify-between">
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={openUserProfile}
        >
          <img
            src={user?.imageUrl}
            className="w-8 h-8 rounded-full object-cover"
            alt="user"
          />
          <div className="leading-tight">
            <h1 className="text-sm font-medium truncate">{user?.fullName}</h1>
            <p className="text-xs text-gray-500">
              <Protect plan="premium" fallback="Free">Premium</Protect>
              <span> Plan</span>
            </p>
          </div>
        </div>

        <LogOut
          onClick={signOut}
          className="w-4 h-4 text-gray-400 hover:text-gray-700 transition cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;
