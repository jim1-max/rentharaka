import Link from 'next/link';
import { Search, Home, MapPin, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 lg:px-8 bg-white border-b">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Find the perfect rental <br className="hidden sm:block" />
            <span className="text-brand-600">powered by AI</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Experience the future of property hunting. Tell our smart assistant what you need, and let Rentharaka find your ideal home in seconds.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/search"
              className="rounded-full bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 transition-all flex items-center gap-2"
            >
              <Search className="w-5 h-5" /> Start Exploring
            </Link>
            <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-2 hover:text-brand-600 transition-all">
              Owner Sign in <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Search Bar Prototype */}
      <div className="max-w-4xl mx-auto -mt-8 relative z-10 px-4 w-full">
        <div className="bg-white rounded-full shadow-lg p-2 flex items-center border border-gray-100">
          <div className="flex-1 flex px-6 items-center border-r border-gray-200">
            <MapPin className="text-gray-400 w-5 h-5 mr-3" />
            <input type="text" placeholder="Where do you want to live?" className="w-full text-sm outline-none font-medium text-gray-900 py-3" />
          </div>
          <button className="bg-brand-600 hover:bg-brand-500 text-white rounded-full p-4 ml-2 transition-all">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-brand-600">Faster housing</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to rent</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                  <Sparkles className="h-6 w-6 text-brand-600" aria-hidden="true" />
                  AI Property Assistant
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Just type &quot;I want a 2-bed near a school under $500&quot; and our AI will find exactly that.</p>
                </dd>
              </div>
              <div className="flex flex-col bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                  <MapPin className="h-6 w-6 text-brand-600" aria-hidden="true" />
                  Smart Location Metrics
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Calculate travel time, distance to work, and explore nearby amenities directly on the map.</p>
                </dd>
              </div>
              <div className="flex flex-col bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                  <Home className="h-6 w-6 text-brand-600" aria-hidden="true" />
                  Seamless Management
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Property owners get a dedicated dashboard to handle listings, images, and booking requests effortlessly.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
