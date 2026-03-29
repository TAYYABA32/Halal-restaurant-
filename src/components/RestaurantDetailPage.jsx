import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { getFoodImage, getHalalLabel, getCuisineColor } from '../utils/helpers'

function createColoredIcon(color) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 28px; height: 28px;
      background: ${color};
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  })
}

export default function RestaurantDetailPage({ restaurant, index, onBack }) {
  if (!restaurant) return null
  const halalLabel = getHalalLabel(restaurant.halal_status)
  const markerColor = getCuisineColor(restaurant.cuisine)

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left side — Restaurant details (scrollable) */}
      <div className="w-full md:w-1/2 overflow-y-auto sidebar-scroll">
        {/* Hero image */}
        <div className="relative h-72 md:h-80">
          <img
            src={getFoodImage(restaurant.cuisine, index)}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          {/* Back button */}
          <button
            onClick={onBack}
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {/* Badges */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="bg-green-800 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              {halalLabel.toUpperCase()}
            </span>
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full">
              ★ {(4 + Math.random()).toFixed(1)} (124 reviews)
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Title row */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{restaurant.name}</h1>
              <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                <span>🍽️</span>
                {restaurant.cuisine || 'International Cuisine'}
                <span className="text-gray-300">·</span>
                <span>💰 $$</span>
              </p>
            </div>
            <div className="flex gap-2 ml-4">
              <button className="w-10 h-10 rounded-full bg-green-800 text-white flex items-center justify-center hover:bg-green-900 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {/* Location */}
            <div className="bg-stone-50 rounded-xl p-5">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-3">Location</p>
              <p className="text-sm text-gray-900 font-medium">{restaurant.address}</p>
              <p className="text-sm text-gray-500 mt-1">{restaurant.city}, Finland</p>
            </div>

            {/* Opening hours */}
            <div className="bg-stone-50 rounded-xl p-5">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-3">Opening Hours</p>
              {restaurant.hours ? (
                <p className="text-sm text-gray-900">{restaurant.hours}</p>
              ) : (
                <div className="text-sm text-gray-900 space-y-1.5">
                  <div className="flex justify-between"><span className="text-gray-600">Mon – Thu</span><span>11:00 – 21:00</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Friday</span><span>11:00 – 23:00</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Sat – Sun</span><span>12:00 – 22:00</span></div>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white bg-green-800 px-5 py-2.5 rounded-lg hover:bg-green-900 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Open in Maps
            </a>
            {restaurant.phone && (
              <a
                href={`tel:${restaurant.phone}`}
                className="inline-flex items-center gap-2 text-sm text-gray-700 bg-gray-100 px-5 py-2.5 rounded-lg hover:bg-gray-200 font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {restaurant.phone}
              </a>
            )}
            {restaurant.website && (
              <a
                href={restaurant.website.startsWith('http') ? restaurant.website : `https://${restaurant.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-green-800 bg-green-50 px-5 py-2.5 rounded-lg hover:bg-green-100 font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
                Visit Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Right side — Map showing restaurant location */}
      <div className="hidden md:block w-1/2 relative">
        <MapContainer
          center={[restaurant.latitude, restaurant.longitude]}
          zoom={15}
          className="w-full h-full"
          zoomControl={true}
          key={`${restaurant.latitude}-${restaurant.longitude}`}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[restaurant.latitude, restaurant.longitude]}
            icon={createColoredIcon(markerColor)}
          >
            <Popup>
              <div className="text-center min-w-[120px]">
                <strong className="text-sm">{restaurant.name}</strong>
                <p className="text-xs text-gray-500 m-0">{restaurant.city}</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>

        {/* Floating label on map */}
        <div className="absolute bottom-6 left-6 z-[1000] bg-green-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          {restaurant.name}
        </div>
      </div>
    </div>
  )
}
