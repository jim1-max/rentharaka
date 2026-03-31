'use client';

import Link from 'next/link';
import { useAuth } from './AuthProvider';
import { auth } from '@/lib/firebase/config';
import { signOut } from 'firebase/auth';
import { Home } from 'lucide-react';

export default function Navbar() {
  const { user, userProfile, loading } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) return null; // Or a skeleton

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <Home className="h-8 w-8 text-brand-600 mr-2" />
              <span className="font-bold text-xl text-gray-900 tracking-tight">Rentharaka</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link href="/login" className="text-gray-700 hover:text-brand-600 font-medium text-sm">
                  Log in
                </Link>
                <Link href="/register" className="bg-brand-600 hover:bg-brand-500 text-white rounded-md px-4 py-2 font-medium text-sm transition-colors">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <div className="text-sm font-medium text-gray-500 mr-4">
                  Welcome, <span className="text-gray-900 font-semibold">{userProfile?.name}</span>
                </div>
                {userProfile?.role === 'owner' && (
                  <Link href="/owner/dashboard" className="text-gray-700 hover:text-brand-600 font-medium text-sm">
                    Owner Dashboard
                  </Link>
                )}
                {userProfile?.role === 'tenant' && (
                  <Link href="/tenant/dashboard" className="text-gray-700 hover:text-brand-600 font-medium text-sm">
                    Tenant Dashboard
                  </Link>
                )}
                {userProfile?.role === 'admin' && (
                  <Link href="/admin/dashboard" className="text-gray-700 hover:text-brand-600 font-medium text-sm">
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md px-4 py-2 font-medium text-sm transition-colors"
                >
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
