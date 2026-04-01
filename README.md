# Halal Restaurant Finder Finland

A modern, responsive React web application that helps users discover halal restaurants across Finland using an interactive map interface. Users can search, filter, and locate halal-certified restaurants with real-time geolocation support.

---

## Tech Stack

| Technology       | Purpose                                      |
| ---------------- | -------------------------------------------- |
| **React 19**     | Frontend UI library (component-based)        |
| **Vite 8**       | Build tool & dev server (fast HMR)           |
| **React Leaflet** | Interactive map (wrapper around Leaflet.js) |
| **Leaflet.js**   | Open-source map rendering library            |
| **Tailwind CSS 4** | Utility-first CSS framework for styling    |
| **Google Sheets** | Backend data source (published as CSV)      |
| **OpenStreetMap** | Free map tiles for the map view             |

> **No traditional backend** — the app fetches restaurant data directly from a publicly published Google Sheet as CSV, making it a fully client-side (frontend-only) application.

---

## Features

1. **Interactive Map** — Displays all halal restaurants on a Leaflet map centered on Finland
2. **Color-Coded Markers** — Each cuisine type (Turkish, Pakistani, Indian, Somali, etc.) gets a unique colored pin
3. **Search** — Search restaurants by name or city in real time
4. **Cuisine Filters** — Filter restaurants by cuisine type using buttons (Turkish, Arab, Pakistani, Indian, etc.)
5. **Restaurant Cards** — Each restaurant has a card showing image, name, cuisine, rating, and halal badge
6. **Restaurant Detail Page** — Click a card to view full details (address, phone, hours, website)
7. **"Near Me" Geolocation** — Uses the browser's Geolocation API to find the user's current position and sort restaurants by distance
8. **Distance Calculation** — Uses the **Haversine formula** to calculate distance between the user and each restaurant (in km)
9. **Halal Status Badges** — Shows "Verified Halal" or "Halal Options" based on the restaurant's halal certification
10. **Fly-To Animation** — Map smoothly animates to the selected restaurant's location
11. **Responsive Design** — Works on desktop (map + list side by side) and mobile (list only)
12. **Loading & Error States** — Shows spinner while fetching data and error message with retry button if fetch fails

---

## How It Works (Data Flow)

```
Google Sheets (CSV)
       |
       | fetch() API call
       v
useRestaurants.js (Custom React Hook)
       |
       | sheetParser.js parses CSV to JS objects
       v
App.jsx (Main Component - manages state)
       |
       +---> Header.jsx (search bar + Near Me button)
       +---> FilterButtons.jsx (cuisine filter buttons)
       +---> RestaurantCard.jsx (individual restaurant cards)
       +---> MapView.jsx (Leaflet map with markers)
       +---> SelectedPopup.jsx (popup when marker clicked)
       +---> RestaurantDetailPage.jsx (full detail view)
```

### Step-by-step:

1. When the app loads, the `useRestaurants` custom hook fetches CSV data from Google Sheets using the `fetch()` API
2. The `sheetParser` utility parses raw CSV text into an array of JavaScript objects (handles quoted fields with commas)
3. `App.jsx` receives the parsed restaurant data and manages all application state (search query, active filter, selected restaurant, user location)
4. `useMemo` hooks filter and sort restaurants based on search query and selected cuisine
5. When "Near Me" is clicked, the browser's `navigator.geolocation.getCurrentPosition()` gets the user's coordinates
6. The **Haversine formula** calculates the distance from the user to each restaurant, and restaurants are sorted by proximity
7. Clicking a restaurant card highlights the pin on the map and the map flies to that location using `map.flyTo()`

---

## Project Structure

```
halal-restaurant-finder/
├── index.html                  # Entry HTML file
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint configuration
├── public/                     # Static assets
├── dist/                       # Production build output
└── src/
    ├── main.jsx                # React entry point (renders App)
    ├── App.jsx                 # Main component (state management, layout)
    ├── index.css               # Global styles + Tailwind imports
    ├── components/
    │   ├── Header.jsx          # Top nav bar with logo, search, Near Me button
    │   ├── Sidebar.jsx         # Left sidebar navigation icons
    │   ├── MapView.jsx         # Leaflet map with colored markers
    │   ├── RestaurantCard.jsx  # Restaurant card in list panel
    │   ├── RestaurantDetail.jsx    # Restaurant detail component
    │   ├── RestaurantDetailPage.jsx # Full detail page view
    │   ├── FilterButtons.jsx   # Cuisine type filter buttons
    │   ├── SelectedPopup.jsx   # Map overlay for selected restaurant
    │   └── LoadingSpinner.jsx  # Loading spinner component
    ├── hooks/
    │   └── useRestaurants.js   # Custom hook to fetch & parse restaurant data
    └── utils/
        ├── sheetParser.js      # CSV text to JavaScript object parser
        └── helpers.js          # Utility functions (distance, colors, labels)
```

---

## Key Concepts Used

### 1. React Hooks
- **useState** — For managing search query, selected restaurant, user location, loading states
- **useEffect** — For fetching data from Google Sheets on component mount
- **useMemo** — For memoizing filtered/sorted restaurant lists (performance optimization)
- **useCallback** — For memoizing event handler functions to prevent unnecessary re-renders

### 2. Custom Hook (`useRestaurants`)
- Encapsulates data fetching logic
- Returns `{ restaurants, loading, error }` — a clean API for the component
- Handles loading and error states internally

### 3. CSV Parsing (No External Library)
- Built a custom CSV parser from scratch in `sheetParser.js`
- Handles edge cases like quoted fields containing commas
- Converts CSV rows into JavaScript objects using headers as keys

### 4. Haversine Formula (Distance Calculation)
- Mathematical formula to calculate the shortest distance between two points on a sphere (Earth)
- Used in `helpers.js` → `getDistance(lat1, lon1, lat2, lon2)`
- Returns distance in kilometers

### 5. Leaflet Map Integration
- `react-leaflet` provides React components (`MapContainer`, `TileLayer`, `Marker`, `Popup`)
- Custom colored markers created using `L.divIcon()` with inline CSS
- `useMap()` hook gives access to the map instance for `flyTo()` animations
- OpenStreetMap provides free map tiles

### 6. Geolocation API
- Browser's built-in `navigator.geolocation.getCurrentPosition()` — no API key required
- Returns user's latitude and longitude
- Used to sort restaurants by proximity

### 7. Responsive Design
- Tailwind CSS utility classes for responsive layouts
- `hidden md:block` — map is hidden on mobile, visible on medium+ screens
- `w-full md:w-96` — list panel takes full width on mobile, fixed width on desktop

---

## How to Install & Run

### Prerequisites
- **Node.js** v18 or higher
- **npm** (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd halal-restaurant-finder

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build      # Creates optimized build in /dist folder
npm run preview    # Preview the production build locally
```

---

## Dependencies

### Production Dependencies
| Package            | Version | Purpose                           |
| ------------------ | ------- | --------------------------------- |
| react              | 19.2.4  | UI component library              |
| react-dom          | 19.2.4  | React DOM renderer                |
| leaflet            | 1.9.4   | Map rendering library             |
| react-leaflet      | 5.0.0   | React wrapper for Leaflet         |
| tailwindcss        | 4.2.2   | Utility-first CSS framework       |
| @tailwindcss/vite  | 4.2.2   | Tailwind CSS Vite plugin          |

### Dev Dependencies
| Package                     | Purpose                    |
| --------------------------- | -------------------------- |
| vite                        | Build tool & dev server    |
| @vitejs/plugin-react        | React support for Vite     |
| eslint                      | Code linting               |
| eslint-plugin-react-hooks   | React Hooks linting rules  |
| eslint-plugin-react-refresh | React Refresh linting      |

---

## Deployment

This app is deployed on **Railway**:

1. Push the code to a GitHub repository
2. Connect the repository to Railway
3. Railway auto-detects the Vite build and deploys

---

## Data Source

Restaurant data is stored in a **Google Sheet** and published as CSV. The sheet contains these columns:

| Column       | Description                          |
| ------------ | ------------------------------------ |
| name         | Restaurant name                      |
| address      | Full street address                  |
| city         | City in Finland                      |
| lat          | Latitude coordinate                  |
| lng          | Longitude coordinate                 |
| cuisine      | Cuisine type (Turkish, Pakistani...) |
| halal_status | Halal certification status           |
| phone        | Contact number                       |
| website      | Restaurant website URL               |
| hours        | Opening hours                        |

The app fetches this data at runtime using the Google Sheets publish-to-web CSV URL — no backend server needed.
