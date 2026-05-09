'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar-custom">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-white text-3xl font-heading font-bold tracking-wider flex items-center gap-2">
            <span className="text-primary text-2xl">▶</span>
            DELIVERTRACK
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-white/85 hover:text-white font-heading font-semibold tracking-wider uppercase transition-colors"
            >
              Track Package
            </Link>
            <Link 
              href="/admin/login" 
              className="text-white/85 hover:text-white font-heading font-semibold tracking-wider uppercase transition-colors"
            >
              Admin Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-2xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link 
              href="/" 
              className="block text-white/85 hover:text-white font-heading font-semibold tracking-wider uppercase"
              onClick={() => setIsOpen(false)}
            >
              Track Package
            </Link>
            <Link 
              href="/admin/login" 
              className="block text-white/85 hover:text-white font-heading font-semibold tracking-wider uppercase"
              onClick={() => setIsOpen(false)}
            >
              Admin Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
