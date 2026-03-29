import { getFoodImage, getHalalLabel } from '../utils/helpers'

export default function RestaurantCard({ restaurant, index, isSelected, onViewDetail, onLocateOnMap, distance }) {
  const halalLabel = getHalalLabel(restaurant.halal_status)

  return (
    <div
      onClick={onViewDetail}
      className={`rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? 'ring-2 ring-green-600 shadow-lg' : 'shadow-sm'
      } bg-white`}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={getFoodImage(restaurant.cuisine, index)}
          alt={restaurant.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="halal-badge">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {halalLabel.toUpperCase()}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-gray-900 text-sm">{restaurant.name}</h3>
          <span className="bg-green-800 text-white text-xs px-2 py-0.5 rounded-md font-medium ml-2 whitespace-nowrap">
            ★ {(4 + Math.random()).toFixed(1)}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {restaurant.cuisine || 'International Cuisine'}
          {distance != null && ` • ${distance.toFixed(1)}km away`}
        </p>

        {/* Tags + Locate button */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-2">
            {restaurant.cuisine && (
              <span className="bg-green-100 text-green-800 text-[10px] font-semibold px-2 py-0.5 rounded uppercase">
                {restaurant.cuisine.split(',')[0].trim()}
              </span>
            )}
            <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-0.5 rounded uppercase">
              Dining
            </span>
          </div>

          {/* Locate on Map button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onLocateOnMap()
            }}
            className="flex items-center gap-1 text-[11px] font-medium text-green-700 bg-green-50 hover:bg-green-100 px-2.5 py-1 rounded-full transition-colors"
            title="Show on map"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Locate
          </button>
        </div>
      </div>
    </div>
  )
}
