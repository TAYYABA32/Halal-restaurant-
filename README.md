# Halal Restaurant Finder Finland

A React web application that displays halal restaurants across Finland on an interactive map. Users can explore, search, and filter restaurants directly on the map.

## Tech Stack

- **React** with **Vite** as the build tool
- **React Leaflet** for the interactive map
- **Tailwind CSS** for styling
- **Google Sheets** (published as CSV) as the data source

## Features

- Interactive map centered on Finland with restaurant markers
- Color-coded pins based on cuisine type
- Search restaurants by name or city
- Filter by cuisine type
- Restaurant detail cards with address, hours, cuisine, halal status, and website links
- "Near Me" button using browser geolocation to find closest restaurants
- Halal status badges (Verified Halal / Halal Options)
- Fully responsive design

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd halal-restaurant-finder

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Top navigation bar with search and Near Me
│   ├── Sidebar.jsx         # Left sidebar navigation
│   ├── MapView.jsx         # React Leaflet map with markers
│   ├── RestaurantCard.jsx  # Restaurant card in the list panel
│   ├── RestaurantDetail.jsx # Full detail modal for a restaurant
│   ├── FilterButtons.jsx   # Cuisine type filter buttons
│   ├── SelectedPopup.jsx   # Map overlay for selected restaurant
│   └── LoadingSpinner.jsx  # Loading state component
├── hooks/
│   └── useRestaurants.js   # Custom hook to fetch & parse CSV data
├── utils/
│   ├── sheetParser.js      # CSV to JavaScript object parser
│   └── helpers.js          # Utility functions (distance, colors, etc.)
├── App.jsx                 # Main application component
├── main.jsx                # Entry point
└── index.css               # Global styles + Tailwind imports
```

## Deployment

This app is deployed on **Railway**. To deploy your own:

1. Push the code to a GitHub repository
2. Connect the repository to Railway
3. Railway will auto-detect the Vite build and deploy

## Data Source

Restaurant data is fetched directly from a public Google Sheet published as CSV. The data includes: name, address, city, latitude, longitude, cuisine, halal_status, phone, website, and hours.
