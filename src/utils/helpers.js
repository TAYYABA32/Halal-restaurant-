/**
 * Returns a color based on cuisine type for map markers.
 */
export function getCuisineColor(cuisine) {
  const colors = {
    turkish: '#e74c3c',
    arab: '#2ecc71',
    pakistani: '#3498db',
    indian: '#f39c12',
    somali: '#9b59b6',
    afghan: '#1abc9c',
    persian: '#e67e22',
    lebanese: '#16a085',
    moroccan: '#c0392b',
    bangladeshi: '#2980b9',
  }
  const key = (cuisine || '').toLowerCase()
  for (const [k, v] of Object.entries(colors)) {
    if (key.includes(k)) return v
  }
  return '#166534' // default green
}

/**
 * Returns a food image URL based on cuisine type.
 * Uses placeholder images from picsum.
 */
export function getFoodImage(cuisine, index = 0) {
  const images = [
    'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=250&fit=crop',
  ]
  return images[index % images.length]
}

/**
 * Calculate distance between two points using Haversine formula (in km).
 */
export function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(deg) {
  return deg * (Math.PI / 180)
}

/**
 * Get halal badge label from status string.
 */
export function getHalalLabel(status) {
  if (!status) return 'Halal'
  const lower = status.toLowerCase()
  if (lower.includes('fully') || lower.includes('full')) return 'Verified Halal'
  if (lower.includes('partial') || lower.includes('option')) return 'Halal Options'
  return 'Verified Halal'
}
