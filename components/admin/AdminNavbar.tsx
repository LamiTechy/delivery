'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

interface AdminNavbarProps {
  user: any;
}

export default function AdminNavbar({ user }: AdminNavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <nav className="navbar-custom">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/admin/dashboard" className="text-white text-2xl font-heading font-bold tracking-wider flex items-center gap-2">
            <span className="text-primary text-xl">▶</span>
            DELIVERTRACK ADMIN
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/admin/dashboard"
              className={`font-heading font-semibold tracking-wider uppercase transition-colors ${
                isActive('/admin/dashboard') ? 'text-white' : 'text-white/85 hover:text-white'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/deliveries"
              className={`font-heading font-semibold tracking-wider uppercase transition-colors ${
                isActive('/admin/deliveries') ? 'text-white' : 'text-white/85 hover:text-white'
              }`}
            >
              Deliveries
            </Link>
            <Link
              href="/admin/customers"
              className={`font-heading font-semibold tracking-wider uppercase transition-colors ${
                isActive('/admin/customers') ? 'text-white' : 'text-white/85 hover:text-white'
              }`}
            >
              Customers
            </Link>
            <span className="text-white/85">Welcome, {user?.name}</span>
            <button
              onClick={handleSignOut}
              className="text-white/85 hover:text-white font-heading font-semibold tracking-wider uppercase transition-colors"
            >
              Logout
            </button>
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
              href="/admin/dashboard"
              className="block text-white/85 hover:text-white font-heading font-semibold tracking-wider uppercase"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/deliveries"
              className="block text-white/85 hover:text-white font-heading font-semibold tracking-wider uppercase"
              onClick={() => setIsOpen(false)}
            >
              Deliveries
            </Link>
            <Link
              href="/admin/customers"
              className="block text-white/85 hover:text-white font-heading font-semibold tracking-wider uppercase"
              onClick={() => setIsOpen(false)}
            >
              Customers
            </Link>
            <span className="block text-white/85">Welcome, {user?.name}</span>
            <button
              onClick={handleSignOut}
              className="block text-white/85 hover:text-white font-heading font-semibold tracking-wider uppercase"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
