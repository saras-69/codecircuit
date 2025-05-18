import { useState, useEffect, useRef } from 'react'
import MapDisplay from './MapDisplay'

export default function GpsStepTracker({ onStepUpdate, isTracking }) {
    const [location, setLocation] = useState(null)
    const [distance, setDistance] = useState(0)
    const [speed, setSpeed] = useState(0)
    const [error, setError] = useState(null)
    const [path, setPath] = useState([])

    const watchIdRef = useRef(null)
    const lastLocationRef = useRef(null)
    const lastStepCountRef = useRef(0)

    // Start GPS tracking
    useEffect(() => {
        if (!isTracking) {
            // Clean up tracker when not tracking
            if (watchIdRef.current) {
                navigator.geolocation.clearWatch(watchIdRef.current)
                watchIdRef.current = null
            }
            return
        }

        // Check if geolocation is available
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser')
            return
        }

        // Start watching position
        const watchId = navigator.geolocation.watchPosition(
            handlePositionUpdate,
            handleError,
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000
            }
        )

        watchIdRef.current = watchId

        // Clean up on unmount
        return () => {
            if (watchIdRef.current) {
                navigator.geolocation.clearWatch(watchIdRef.current)
            }
        }
    }, [isTracking])

    // Handle errors
    const handleError = (error) => {
        setError(`Error: ${error.message}`)
    }

    // Handle position updates
    const handlePositionUpdate = (position) => {
        const { latitude, longitude, accuracy } = position.coords

        // Only use readings with good accuracy (less than 20 meters)
        if (accuracy > 20) {
            return
        }

        const currentLocation = { latitude, longitude }
        setLocation(currentLocation)

        // Add to path for map display
        setPath(prevPath => [...prevPath, currentLocation])

        // Calculate distance if we have a previous location
        if (lastLocationRef.current) {
            const newDistance = calculateDistance(
                lastLocationRef.current.latitude,
                lastLocationRef.current.longitude,
                latitude,
                longitude
            )

            // Only count movement if it's more than the accuracy threshold
            // to avoid counting small GPS fluctuations
            if (newDistance > accuracy / 1000) {
                setDistance(prevDistance => {
                    const updatedDistance = prevDistance + newDistance

                    // Calculate steps based on distance
                    // Average step length is about 0.76 meters
                    const stepLength = 0.00076 // in kilometers
                    const newSteps = Math.floor(newDistance / stepLength)

                    // Only update if we have new steps
                    if (newSteps > 0) {
                        onStepUpdate(newSteps)
                        lastStepCountRef.current += newSteps
                    }

                    return updatedDistance
                })

                // Calculate speed (km/h)
                // We're using the time difference between position updates
                const timeDiff = (position.timestamp - lastLocationRef.current.timestamp) / 1000 / 3600
                const currentSpeed = newDistance / timeDiff
                setSpeed(currentSpeed)
            }
        }

        // Update last location
        lastLocationRef.current = {
            latitude,
            longitude,
            timestamp: position.timestamp
        }
    }

    // Calculate distance between two points using Haversine formula
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371 // Earth's radius in km
        const dLat = deg2rad(lat2 - lat1)
        const dLon = deg2rad(lon2 - lon1)
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = R * c // Distance in km
        return distance
    }

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180)
    }

    // Reset the current tracking session
    const resetTracking = () => {
        setDistance(0)
        setSpeed(0)
        setPath([])
        lastLocationRef.current = null
        lastStepCountRef.current = 0
    }

    return (
        <div className="space-y-4">
            {error ? (
                <div className="bg-red-100 text-red-700 p-3 rounded-md">
                    {error}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-md">
                            <div className="text-sm text-blue-700 dark:text-blue-300">Distance</div>
                            <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                                {distance.toFixed(2)} km
                            </div>
                        </div>

                        <div className="bg-green-50 dark:bg-green-900 p-3 rounded-md">
                            <div className="text-sm text-green-700 dark:text-green-300">Current Speed</div>
                            <div className="text-2xl font-bold text-green-800 dark:text-green-200">
                                {speed.toFixed(1)} km/h
                            </div>
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-900 p-3 rounded-md">
                            <div className="text-sm text-purple-700 dark:text-purple-300">Steps (this session)</div>
                            <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                                {lastStepCountRef.current}
                            </div>
                        </div>

                        <div className="bg-yellow-50 dark:bg-yellow-900 p-3 rounded-md">
                            <div className="text-sm text-yellow-700 dark:text-yellow-300">Calories</div>
                            <div className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">
                                {Math.round(distance * 65)} cal
                            </div>
                        </div>
                    </div>

                    {/* Map display */}
                    {path.length > 0 && (
                        <div className="h-60 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                            <MapDisplay path={path} currentLocation={location} />
                        </div>
                    )}

                    <div className="flex justify-center">
                        <button
                            onClick={resetTracking}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md"
                        >
                            Reset Session
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}