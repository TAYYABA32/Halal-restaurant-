/**
 * Parses CSV text from Google Sheets into an array of restaurant objects.
 * No external libraries used — pure string parsing.
 */
export function sheetParser(csvText) {
  const lines = csvText.split('\n')
  if (lines.length < 2) return []

  const headers = parseCSVLine(lines[0])

  const restaurants = []
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const values = parseCSVLine(line)
    const restaurant = {}
    headers.forEach((header, index) => {
      restaurant[header.trim()] = values[index]?.trim() || ''
    })

    // Normalize lat/lng field names (sheet uses "lat"/"lng")
    restaurant.latitude = parseFloat(restaurant.lat || restaurant.latitude) || 0
    restaurant.longitude = parseFloat(restaurant.lng || restaurant.longitude) || 0

    // Only add if we have valid coordinates
    if (restaurant.latitude && restaurant.longitude && restaurant.name) {
      restaurants.push(restaurant)
    }
  }

  return restaurants
}

/**
 * Parses a single CSV line, handling quoted fields with commas inside.
 */
function parseCSVLine(line) {
  const result = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        current += char
      }
    } else {
      if (char === '"') {
        inQuotes = true
      } else if (char === ',') {
        result.push(current)
        current = ''
      } else {
        current += char
      }
    }
  }
  result.push(current)
  return result
}
