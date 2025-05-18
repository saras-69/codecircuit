import { useEffect, useState } from 'react'
import ProgressBar from '../UI/ProgressBar'

export default function StepCounter({
    steps,
    goal,
    isTracking,
    setIsTracking,
    addSteps
}) {
    const [isAnimating, setIsAnimating] = useState(false)
    const [lastSteps, setLastSteps] = useState(steps)

    // Trigger animation when steps change
    useEffect(() => {
        if (steps !== lastSteps) {
            setIsAnimating(true)
            setLastSteps(steps)

            const timeout = setTimeout(() => {
                setIsAnimating(false)
            }, 1000)

            return () => clearTimeout(timeout)
        }
    }, [steps, lastSteps])

    const progress = Math.min((steps / goal) * 100, 100)

    // Check if we have permission to use motion sensors (for future step counting)
    const checkSensorPermission = async () => {
        // Check if DeviceMotionEvent and requestPermission are available (iOS 13+)
        if (typeof DeviceMotionEvent !== 'undefined' &&
            typeof DeviceMotionEvent.requestPermission === 'function') {
            try {
                const permission = await DeviceMotionEvent.requestPermission()
                return permission === 'granted'
            } catch (err) {
                console.error('Error requesting sensor permission', err)
                return false
            }
        }

        // On most devices, no explicit permission is needed
        return true
    }

    const handleStartTracking = async () => {
        const hasPermission = await checkSensorPermission()
        if (hasPermission) {
            setIsTracking(true)
        } else {
            alert('Motion sensor permission is required for step tracking')
        }
    }

    const handleStopTracking = () => {
        setIsTracking(false)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center">
                <div className={`text-4xl mr-3 transition-transform ${isAnimating ? 'animate-bounce' : ''}`}>
                    👟
                </div>
                <div className="flex-1">
                    <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Daily Progress</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{Math.round(progress)}%</span>
                    </div>
                    <ProgressBar progress={progress} color="bg-green-500" />
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {steps.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Current Steps
                    </div>
                </div>

                <div className="text-center">
                    <div className="text-3xl font-bold text-gray-600 dark:text-gray-400">
                        {goal.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Daily Goal
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-2">
                {!isTracking ? (
                    <button
                        className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
                        onClick={handleStartTracking}
                    >
                        Start Tracking
                    </button>
                ) : (
                    <button
                        className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors"
                        onClick={handleStopTracking}
                    >
                        Stop Tracking
                    </button>
                )}
            </div>
        </div>
    )
}