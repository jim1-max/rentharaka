'use client';

import { useState } from 'react';
import { Search, Bot, MapPin } from 'lucide-react';
import { Property } from '@/types';
import { Map, Marker } from '@react-google-maps/api';

export default function TenantSearch() {
  const [aiQuery, setAiQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [filters, setFilters] = useState<any>(null);
  
  // Dummy data for visual
  const dummyProperties: Partial<Property>[] = [
    { propertyId: '1', title: 'Modern 2-Bed in Kilimani', price: 45000, location: { lat: -1.2921, lng: 36.8219, address: 'Kilimani, Nairobi' }, amenities: ['WiFi', 'Security'], images: [] },
    { propertyId: '2', title: 'Cozy Studio Westlands', price: 30000, location: { lat: -1.2667, lng: 36.8, address: 'Westlands, Nairobi' }, amenities: ['Gym'], images: [] }
  ];

  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery) return;
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: aiQuery })
      });
      const data = await res.json();
      setFilters(data.filters);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
      {/* Search Sidebar */}
      <div className="w-full md:w-1/3 bg-white flex flex-col border-r border-gray-200 h-full">
        <div className="p-4 border-b border-gray-200">
          <form onSubmit={handleAiSearch} className="relative">
            <div className="flex border-2 border-brand-200 rounded-lg overflow-hidden focus-within:border-brand-500 transition-colors shadow-sm">
              <div className="bg-brand-50 flex items-center px-3 border-r border-brand-200">
                <Bot className="w-5 h-5 text-brand-600" />
              </div>
              <input 
                type="text" 
                placeholder="Ask AI e.g., '2-bed near Westlands under 40k'" 
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="w-full py-3 px-3 outline-none text-sm text-gray-900"
              />
              <button 
                type="submit" 
                disabled={isAiLoading}
                className="bg-brand-600 text-white px-4 flex items-center justify-center hover:bg-brand-500 transition-colors disabled:opacity-50"
              >
                {isAiLoading ? <span className="animate-pulse">...</span> : <Search className="w-4 h-4" />}
              </button>
            </div>
          </form>

          {filters && (
            <div className="mt-4 p-3 bg-brand-50 rounded-md border border-brand-100 text-xs text-brand-800">
              <strong>AI Extracted:</strong>
              <pre className="mt-1 font-mono">{JSON.stringify(filters, null, 2)}</pre>
            </div>
          )}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {dummyProperties.map(p => (
            <div key={p.propertyId} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex">
              <div className="w-1/3 bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
              <div className="w-2/3 p-3 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">{p.title}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span className="line-clamp-1">{p.location?.address}</span>
                  </div>
                </div>
                <div className="mt-2 text-brand-700 font-bold text-sm">
                  KES {p.price} <span className="text-gray-500 text-xs font-normal">/mo</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map View */}
      <div className="hidden md:block w-2/3 h-full bg-gray-100 relative items-center justify-center">
        {/* Placeholder for Map since we can't fully render Google Maps without API key yet easily here */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
           <MapPin className="w-16 h-16 mb-4 text-brand-300" />
           <p>Google Maps Intialization Needs API Key</p>
           <p className="text-sm mt-2 text-center max-w-sm">Place your <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> in `.env.local` to enable the interactive map.</p>
        </div>
      </div>
    </div>
  );
}
