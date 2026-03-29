import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { getCuisineColor } from '../utils/helpers'
import { useEffect } from 'react'

// Fix default Leaflet marker icon issue with bundlers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

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

// Component to fly map to selected restaurant
function FlyToSelected({ selected }) {
  const map = useMap()
  useEffect(() => {
    if (selected) {
      map.flyTo([selected.latitude, selected.longitude], 14, { duration: 1 })
    }
  }, [selected, map])
  return null
}

// Component to fly to user location
function FlyToUser({ userLocation }) {
  const map = useMap()
  useEffect(() => {
    if (userLocation) {
      map.flyTo([userLocation.lat, userLocation.lng], 13, { duration: 1 })
    }
  }, [userLocation, map])
  return null
}

export default function MapView({ restaurants, selectedRestaurant, onSelectRestaurant, userLocation }) {
  // Finland center
  const center = [64.5, 26.0]

  return (
    <MapContainer
      center={center}
      zoom={6}
      className="w-full h-full"
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FlyToSelected selected={selectedRestaurant} />
      <FlyToUser userLocation={userLocation} />

      {/* User location marker */}
      {userLocation && (
        <Marker
          position={[userLocation.lat, userLocation.lng]}
          icon={L.divIcon({
            className: '',
            html: `<div style="
              width: 16px; height: 16px;
              background: #3b82f6;
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 0 0 4px rgba(59,130,246,0.3), 0 2px 6px rgba(0,0,0,0.3);
            "></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          })}
        >
          <Popup>Your Location</Popup>
        </Marker>
      )}

      {/* Restaurant markers */}
      {restaurants.map((restaurant, idx) => (
        <Marker
          key={idx}
          position={[restaurant.latitude, restaurant.longitude]}
          icon={createColoredIcon(getCuisineColor(restaurant.cuisine))}
          eventHandlers={{
            click: () => onSelectRestaurant(restaurant, idx),
          }}
        >
          <Popup>
            <div className="text-center min-w-[140px]">
              <strong className="text-sm">{restaurant.name}</strong>
              <p className="text-xs text-gray-500 m-0">{restaurant.city}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
