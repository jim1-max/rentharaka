'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function AdminDashboard() {
  const { userProfile, loading } = useAuth();
  const router = useRouter();
  
  const [stats, setStats] = useState({ users: 0, properties: 0, bookings: 0 });

  useEffect(() => {
    if (!loading && userProfile?.role !== 'admin') {
      router.push('/login');
    } else if (userProfile) {
      // Fetch stats
      const fetchStats = async () => {
        const usersSnap = await getDocs(collection(db, 'users'));
        const propsSnap = await getDocs(collection(db, 'properties'));
        const booksSnap = await getDocs(collection(db, 'bookings'));
        
        setStats({
          users: usersSnap.size,
          properties: propsSnap.size,
          bookings: booksSnap.size
        });
      };
      fetchStats();
    }
  }, [userProfile, loading, router]);

  if (loading || !userProfile) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-sm font-medium text-gray-500 uppercase">Total Users</h2>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.users}</p>
        </div>
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-sm font-medium text-gray-500 uppercase">Total Properties</h2>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.properties}</p>
        </div>
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-sm font-medium text-gray-500 uppercase">Total Bookings</h2>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.bookings}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
           <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
             <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
             <button className="text-sm text-brand-600 hover:underline">View All</button>
           </div>
           <div className="p-6 text-sm text-gray-500 text-center">
             Admin user management list goes here.
           </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
           <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
             <h2 className="text-lg font-semibold text-gray-900">Properties Pending Approval</h2>
             <button className="text-sm text-brand-600 hover:underline">View All</button>
           </div>
           <div className="p-6 text-sm text-gray-500 text-center">
             Review loop interface goes here.
           </div>
        </div>
      </div>
    </div>
  );
}
