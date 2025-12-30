import React, { use } from "react";
import { assets } from "../assets/assets";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div
      onClick={openSignIn}
      className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 "
    >
      <img
        src="/image.png"
        alt="logo"
        className="
    w-36 sm:w-44
    rounded-xl
    cursor-pointer
    border-2 border-purple-700/50
    shadow-[0_0_15px_rgba(147,51,234,0.9)]
    hover:shadow-[0_0_25px_rgba(147,51,234,0.8)]
    transition-all
    duration-300
  "
        onClick={() => navigate("/")}
      />

      {user ? (
        <UserButton />
      ) : (
       <button
  className="flex items-center gap-2 rounded-full text-sm cursor-pointer 
bg-gradient from-pink-500 via-purple-500 to-indigo-500
             text-white font-semibold px-6 py-2.5 
             shadow-md shadow-purple-500/50
             hover:scale-105 hover:shadow-lg transition-all duration-300"
>
  Get Started <ArrowRight className="w-4 h-4" />
</button>

      )}
    </div>
  );
};

export default Navbar;
