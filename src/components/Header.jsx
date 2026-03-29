import { useState } from 'react'

export default function Header({ searchQuery, onSearchChange, onNearMe, nearMeLoading }) {
  const [activeTab, setActiveTab] = useState('discover')

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between z-50 relative">
      {/* Logo */}
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-green-800 whitespace-nowrap">
          Verdant Halal
        </h1>

        {/* Nav tabs */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <button
            className={`pb-1 ${activeTab === 'discover' ? 'text-gray-900 font-semibold border-b-2 border-green-700' : 'text-green-700'}`}
            onClick={() => setActiveTab('discover')}
          >
            Discover
          </button>
          <button
            className={`pb-1 ${activeTab === 'favorites' ? 'text-gray-900 font-semibold border-b-2 border-green-700' : 'text-green-700'}`}
            onClick={() => setActiveTab('favorites')}
          >
            Favorites
          </button>
          <button
            className={`pb-1 ${activeTab === 'recent' ? 'text-gray-900 font-semibold border-b-2 border-green-700' : 'text-green-700'}`}
            onClick={() => setActiveTab('recent')}
          >
            Recent
          </button>
        </nav>
      </div>

      {/* Search + Near Me */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Helsinki..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm w-48 md:w-64 focus:outline-none focus:border-green-600"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <button
          onClick={onNearMe}
          disabled={nearMeLoading}
          className="bg-green-800 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-green-900 transition-colors disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
          </svg>
          <span className="hidden sm:inline">{nearMeLoading ? 'Locating...' : 'Near Me'}</span>
        </button>

        {/* Profile icon */}
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </div>
    </header>
  )
}
