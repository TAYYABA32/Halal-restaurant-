export default function Sidebar() {
  const menuItems = [
    { icon: '🍽️', label: 'Restaurants', active: true },
    { icon: '🕌', label: 'Mosques', active: false },
    { icon: '❤️', label: 'Favorites', active: false },
    { icon: '⚙️', label: 'Settings', active: false },
  ]

  return (
    <aside className="hidden lg:flex flex-col w-56 border-r border-gray-200 bg-white p-4">
      {/* Brand subtitle */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-green-800">Nordic Concierge</h2>
        <p className="text-xs text-gray-500">Halal Finder Finland</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${
              item.active
                ? 'bg-green-50 text-green-800 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Add Restaurant button */}
      <button className="mt-4 flex items-center justify-center gap-2 bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-green-900 transition-colors">
        <span className="text-lg">+</span>
        Add Restaurant
      </button>
    </aside>
  )
}
