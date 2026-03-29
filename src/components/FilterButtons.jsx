export default function FilterButtons({ cuisines, activeCuisine, onCuisineChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={() => onCuisineChange('')}
        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
          activeCuisine === ''
            ? 'bg-green-800 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {cuisines.map((cuisine) => (
        <button
          key={cuisine}
          onClick={() => onCuisineChange(cuisine)}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors capitalize ${
            activeCuisine === cuisine
              ? 'bg-green-800 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {cuisine}
        </button>
      ))}
    </div>
  )
}
