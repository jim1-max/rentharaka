'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProperties } from '@/lib/firebase/db';
import { Property } from '@/types';
import { PlusCircle, Search } from 'lucide-react';
import Link from 'next/link';

export default function OwnerDashboard() {
  const { userProfile, loading } = useAuth();
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (!loading && userProfile?.role !== 'owner') {
      router.push('/login');
    } else if (userProfile) {
      // In real scenario, filter by ownerId, for now we will just use getProperties and filter
      getProperties().then(data => {
        setProperties(data.filter(p => p.ownerId === userProfile.userId));
      });
    }
  }, [userProfile, loading, router]);

  if (loading || !userProfile) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
        <Link 
          href="/owner/properties/new" 
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          Add Property
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Your Properties</h2>
        </div>
        {properties.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            You haven&apos;t added any properties yet.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {properties.map(property => (
              <li key={property.propertyId} className="p-6 hover:bg-gray-50 flex items-center justify-between">
                <div>
                  <h3 className="text-md font-medium text-gray-900">{property.title}</h3>
                  <p className="text-sm text-gray-500">{property.location.address}</p>
                </div>
                <div className="flex space-x-4 text-sm">
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {property.status}
                  </span>
                  <span className="font-semibold text-gray-900">KES {property.price}/mo</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
