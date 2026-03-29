import { useState, useEffect } from 'react'
import { sheetParser } from '../utils/sheetParser'

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ5ewZpT_FcAuxKGMpe_MbX5oKwAvZyunvXDC6qvwAy_h5tlzVAVYAZK1Y7KvZ4S08XXZCLfp9Ssri/pub?output=csv'

/**
 * Custom hook that fetches restaurant data from Google Sheets CSV.
 * Returns { restaurants, loading, error }.
 */
export function useRestaurants() {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(SHEET_CSV_URL)
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`)
        }

        const csvText = await response.text()
        const parsed = sheetParser(csvText)

        if (parsed.length === 0) {
          throw new Error('No restaurant data found in the sheet')
        }

        setRestaurants(parsed)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { restaurants, loading, error }
}
