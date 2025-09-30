'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-yellow-200 shadow-md w-full z-50 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="text-2xl font-bold text-blue-600">
          <Link href="/">LOGO</Link>
        </div>
       
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/login" className="hover:text-blue-600 transition">Login</Link>
          <Link href="/registration" className="hover:text-blue-600 transition">Registration</Link>
          <Link href="/chat" className="block hover:text-blue-600 transition">Chat</Link>
        </nav>
      
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="flex flex-col justify-between w-6 h-6 focus:outline-none"
          >
            <span
              className={`block h-0.5 w-full bg-black transform transition duration-300 ${
                isOpen ? "rotate-45 translate-y-3" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-black transition duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-black transform transition duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>
     
      {isOpen && (
        <nav className="md:hidden bg-yellow-200 shadow-md px-4 pt-4 pb-6 space-y-2">
          <Link href="/" className="block hover:text-blue-600 transition">Home</Link>
          <Link href="/login" className="block hover:text-blue-600 transition">Login</Link>
          <Link href="/registration" className="block hover:text-blue-600 transition">Registration</Link>
          <Link href="/chat" className="block hover:text-blue-600 transition">Chat</Link>
          
        </nav>
      )}
    </header>
  );
}