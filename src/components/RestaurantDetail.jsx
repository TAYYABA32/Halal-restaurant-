import { getFoodImage, getHalalLabel } from '../utils/helpers'

export default function RestaurantDetail({ restaurant, index, onClose }) {
  if (!restaurant) return null
  const halalLabel = getHalalLabel(restaurant.halal_status)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-64">
          <img
            src={getFoodImage(restaurant.cuisine, index)}
            alt={restaurant.name}
            className="w-full h-full object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 left-4 bg-white/90 rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:bg-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="bg-green-800 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {halalLabel.toUpperCase()}
            </span>
            <span className="bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
              ★ {(4 + Math.random()).toFixed(1)} (124 reviews)
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{restaurant.name}</h2>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                <span>🍽️</span>
                {restaurant.cuisine || 'International Cuisine'} · 💰 $$
              </p>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-green-800 text-white flex items-center justify-center hover:bg-green-900">
                ❤️
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200">
                ↗️
              </button>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {/* Location */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-2">Location</p>
              <p className="text-sm text-gray-800 font-medium">{restaurant.address}</p>
              <p className="text-sm text-gray-600">{restaurant.city}, Finland</p>
            </div>

            {/* Opening hours */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-2">Opening Hours</p>
              {restaurant.hours ? (
                <p className="text-sm text-gray-800">{restaurant.hours}</p>
              ) : (
                <div className="text-sm text-gray-800 space-y-1">
                  <div className="flex justify-between"><span>Mon – Thu</span><span>11:00 – 21:00</span></div>
                  <div className="flex justify-between"><span>Friday</span><span>11:00 – 23:00</span></div>
                  <div className="flex justify-between"><span>Sat – Sun</span><span>12:00 – 22:00</span></div>
                </div>
              )}
            </div>
          </div>

          {/* Contact & Actions */}
          <div className="mt-5 flex flex-wrap gap-3">
            {restaurant.phone && (
              <a
                href={`tel:${restaurant.phone}`}
                className="inline-flex items-center gap-2 text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                📞 {restaurant.phone}
              </a>
            )}
            {restaurant.website && (
              <a
                href={restaurant.website.startsWith('http') ? restaurant.website : `https://${restaurant.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-green-800 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 font-medium"
              >
                🌐 Visit Website
              </a>
            )}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white bg-green-800 px-5 py-2 rounded-lg hover:bg-green-900 font-medium"
            >
              📍 Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
