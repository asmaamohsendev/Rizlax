"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/stores/useAuth';
import Image from 'next/image';

const sidebarLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: '◆' },
  { name: 'Users', href: '/users', icon: '◇' },
  { name: 'Jobs', href: '/jobs', icon: '◆' },
  { name: 'Proposals', href: '/proposals', icon: '◇' },
  { name: 'Notifications', href: '/notifications', icon: '◆' },
];

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      {/* Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen z-50
        bg-black/90 backdrop-blur-md border-r border-[#C2EE71]/20
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        w-64
      `}>
        {/* Header */}
        <div className="p-6 border-b border-[#C2EE71]/20">
          <div className="flex items-center justify-between">
            <Image 
              src="/logoWhite.svg" 
              alt="Logo" 
              width={120} 
              height={40} 
              priority
              className="opacity-80" 
              style={{ width: 'auto', height: '40px' }}
            />
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-[#C2EE71] hover:text-[#C2EE71]/70 transition-colors lg:hidden"
            >
              <span className="text-xl">×</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="
                flex items-center gap-3 px-4 py-3
                text-[#C2EE71] hover:text-[#C2EE71]
                hover:bg-[#C2EE71]/15
                border border-transparent hover:border-[#C2EE71]/20
                transition-all duration-200
                font-light tracking-wide
                group
              "
            >
              <span className="text-[#C2EE71]/30 group-hover:text-[#C2EE71] transition-colors">
                {link.icon}
              </span>
              <span className="text-sm uppercase">{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* User Info */}
        {user && (
          <div className="p-6 border-t border-[#C2EE71]/20">
            <div className="flex items-center justify-between text-[#C2EE71]/70">
              <div className="flex items-center gap-2">
                <span className="text-[#C2EE71]">●</span>
                <span className="text-sm font-light">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="
                  text-xs uppercase tracking-wider
                  text-[#C2EE71]/50 hover:text-red-400
                  transition-colors
                "
              >
                Exit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Toggle Button (Mobile) */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="
            fixed top-4 left-4 z-40 lg:hidden
            p-2 bg-black/80 backdrop-blur-md
            border border-[#C2EE71]/30
            text-[#C2EE71] hover:text-[#C2EE71]
            transition-all
          "
        >
          <span className="text-xl">☰</span>
        </button>
      )}
    </>
  );
};

export default Sidebar;