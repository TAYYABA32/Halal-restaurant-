import { getHalalLabel } from '../utils/helpers'

export default function SelectedPopup({ restaurant, distance, onViewDetails }) {
  if (!restaurant) return null
  const halalLabel = getHalalLabel(restaurant.halal_status)

  return (
    <div className="absolute top-4 right-4 z-10 bg-white rounded-xl shadow-xl w-72 overflow-hidden">
      {/* Header */}
      <div className="p-4">
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Selected Result</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-green-700">🍽️</span>
          <h3 className="font-bold text-gray-900">{restaurant.name}</h3>
        </div>
      </div>

      {/* Details */}
      <div className="px-4 pb-4 space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">🕐</span>
          {restaurant.hours || 'Open until 22:00'}
        </div>
        {restaurant.phone && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400">📞</span>
            {restaurant.phone}
          </div>
        )}
        {distance != null && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400">🚗</span>
            {Math.ceil(distance / 0.5)} min · {distance.toFixed(1)}km
          </div>
        )}
      </div>

      {/* Action */}
      <div className="px-4 pb-4">
        <button
          onClick={onViewDetails}
          className="w-full bg-green-800 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-green-900 transition-colors flex items-center justify-center gap-2"
        >
          📍 Get Directions
        </button>
      </div>
    </div>
  )
}
