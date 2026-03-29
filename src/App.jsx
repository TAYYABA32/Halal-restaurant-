import { useState, useMemo, useCallback } from 'react'
import { useRestaurants } from './hooks/useRestaurants'
import { getDistance } from './utils/helpers'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import FilterButtons from './components/FilterButtons'
import RestaurantCard from './components/RestaurantCard'
import MapView from './components/MapView'
import SelectedPopup from './components/SelectedPopup'
import RestaurantDetailPage from './components/RestaurantDetailPage'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const { restaurants, loading, error } = useRestaurants()

  const [searchQuery, setSearchQuery] = useState('')
  const [activeCuisine, setActiveCuisine] = useState('')
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [currentPage, setCurrentPage] = useState('list') // 'list' or 'detail'
  const [userLocation, setUserLocation] = useState(null)
  const [nearMeLoading, setNearMeLoading] = useState(false)

  // Extract unique cuisine types
  const cuisines = useMemo(() => {
    const set = new Set()
    restaurants.forEach((r) => {
      if (r.cuisine) {
        r.cuisine.split(',').forEach((c) => {
          const trimmed = c.trim()
          if (trimmed) set.add(trimmed)
        })
      }
    })
    return Array.from(set).sort()
  }, [restaurants])

  // Filter restaurants by search and cuisine
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      const matchesSearch =
        !searchQuery ||
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.city.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCuisine =
        !activeCuisine ||
        (r.cuisine && r.cuisine.toLowerCase().includes(activeCuisine.toLowerCase()))

      return matchesSearch && matchesCuisine
    })
  }, [restaurants, searchQuery, activeCuisine])

  // Calculate distances if user location available
  const restaurantsWithDistance = useMemo(() => {
    if (!userLocation) return filteredRestaurants
    return filteredRestaurants
      .map((r) => ({
        ...r,
        _distance: getDistance(userLocation.lat, userLocation.lng, r.latitude, r.longitude),
      }))
      .sort((a, b) => a._distance - b._distance)
  }, [filteredRestaurants, userLocation])

  // Locate restaurant on map (highlight pin, fly to it)
  const handleLocateOnMap = useCallback((restaurant, idx) => {
    setSelectedRestaurant(restaurant)
    setSelectedIndex(idx)
  }, [])

  // Open restaurant detail page
  const handleViewDetail = useCallback((restaurant, idx) => {
    setSelectedRestaurant(restaurant)
    setSelectedIndex(idx)
    setCurrentPage('detail')
  }, [])

  // Go back to list page
  const handleBackToList = useCallback(() => {
    setCurrentPage('list')
  }, [])

  const handleNearMe = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }
    setNearMeLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setNearMeLoading(false)
      },
      () => {
        alert('Unable to get your location')
        setNearMeLoading(false)
      }
    )
  }, [])

  if (loading) {
    return (
      <div className="h-screen bg-white">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center p-8">
          <p className="text-red-500 text-lg font-medium mb-2">Failed to load restaurants</p>
          <p className="text-gray-500 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-green-800 text-white px-6 py-2 rounded-lg text-sm hover:bg-green-900"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNearMe={handleNearMe}
        nearMeLoading={nearMeLoading}
      />

      {/* Detail Page */}
      {currentPage === 'detail' && selectedRestaurant ? (
        <RestaurantDetailPage
          restaurant={selectedRestaurant}
          index={selectedIndex}
          onBack={handleBackToList}
        />
      ) : (
        /* List Page */
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar Nav */}
          <Sidebar />

          {/* Restaurant List Panel */}
          <div className="w-full md:w-96 lg:w-[420px] flex-shrink-0 border-r border-gray-200 bg-white flex flex-col overflow-hidden">
            <div className="p-4 pb-0">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Top Halal Restaurants
              </h2>
              <FilterButtons
                cuisines={cuisines}
                activeCuisine={activeCuisine}
                onCuisineChange={setActiveCuisine}
              />
            </div>

            {/* Scrollable card list */}
            <div className="flex-1 overflow-y-auto sidebar-scroll p-4 pt-2 space-y-4">
              {restaurantsWithDistance.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">
                  No restaurants found matching your search.
                </div>
              ) : (
                restaurantsWithDistance.map((restaurant, idx) => (
                  <RestaurantCard
                    key={idx}
                    restaurant={restaurant}
                    index={idx}
                    isSelected={selectedRestaurant === restaurant}
                    onViewDetail={() => handleViewDetail(restaurant, idx)}
                    onLocateOnMap={() => handleLocateOnMap(restaurant, idx)}
                    distance={restaurant._distance}
                  />
                ))
              )}
            </div>
          </div>

          {/* Map area */}
          <div className="hidden md:block flex-1 relative">
            <MapView
              restaurants={restaurantsWithDistance}
              selectedRestaurant={selectedRestaurant}
              onSelectRestaurant={handleLocateOnMap}
              userLocation={userLocation}
            />

            {/* Selected restaurant popup on map */}
            <SelectedPopup
              restaurant={selectedRestaurant}
              distance={selectedRestaurant?._distance}
              onViewDetails={() => handleViewDetail(selectedRestaurant, selectedIndex)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
