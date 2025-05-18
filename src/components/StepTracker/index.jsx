import { useState, useEffect, useRef } from 'react'
import Card from '../UI/Card'
import StepChart from './StepChart'
import StepCounter from './StepCounter'
import GpsStepTracker from './GpsStepTracker'
import Pedometer from '../../utils/pedometer'
import { getToday, getLastNDays } from '../../utils/dateUtils'
import { getData, updateDateData } from '../../utils/storage'

export default function StepTracker() {
    const [steps, setSteps] = useState(() => {
        // Load today's steps from localStorage
        const today = getToday()
        const savedData = getData('stepTracker', {})
        return savedData[today] || 0
    })

    const [goal, setGoal] = useState(() => {
        // Load goal from localStorage
        return getData('stepGoal', 10000)
    })

    const [stepHistory, setStepHistory] = useState(() => {
        return getData('stepTracker', {})
    })

    const [isTracking, setIsTracking] = useState(false)
    const [trackingMethod, setTrackingMethod] = useState('gps') // 'gps' or 'pedometer'

    const pedometerRef = useRef(null)

    // Get last 7 days
    const last7Days = getLastNDays(7)

    // Initialize and manage pedometer
    useEffect(() => {
        // Initialize pedometer with callback
        pedometerRef.current = new Pedometer((newStepCount) => {
            // This callback runs when a new step is detected
            setSteps(prev => prev + 1)
        })

        return () => {
            if (pedometerRef.current) {
                pedometerRef.current.stop()
            }
        }
    }, [])

    // Start/stop tracking based on isTracking state
    useEffect(() => {
        if (isTracking) {
            if (trackingMethod === 'pedometer' && pedometerRef.current) {
                pedometerRef.current.start()
            }
        } else {
            if (pedometerRef.current) {
                pedometerRef.current.stop()
            }
        }
    }, [isTracking, trackingMethod])

    // Save steps to localStorage
    useEffect(() => {
        const today = getToday()
        const newHistory = updateDateData('stepTracker', today, steps)
        setStepHistory(newHistory)

        console.log("Step tracker updated steps:", today, steps)
    }, [steps])

    // For testing/demo purposes - add steps manually 
    const addSteps = (amount) => {
        setSteps(prev => prev + amount)
    }

    // Handler for step count updates from GPS tracker
    const handleStepUpdate = (newSteps) => {
        setSteps(prev => prev + newSteps)
    }

    // Toggle tracking method
    const toggleTrackingMethod = () => {
        if (isTracking) return // Cannot change while tracking

        setTrackingMethod(prev => prev === 'gps' ? 'pedometer' : 'gps')
    }

    return (
        <div className="space-y-6">
            <Card title="Step Tracker">
                <StepCounter
                    steps={steps}
                    goal={goal}
                    isTracking={isTracking}
                    setIsTracking={setIsTracking}
                    addSteps={addSteps} // Pass the function to add steps manually
                />

                <div className="mt-4 flex justify-center">
                    <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-md">
                        <button
                            className={`px-3 py-1 rounded-md ${trackingMethod === 'gps'
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-700 dark:text-gray-300'
                                } ${isTracking ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={toggleTrackingMethod}
                            disabled={isTracking}
                        >
                            GPS Tracking
                        </button>
                        <button
                            className={`px-3 py-1 rounded-md ${trackingMethod === 'pedometer'
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-700 dark:text-gray-300'
                                } ${isTracking ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={toggleTrackingMethod}
                            disabled={isTracking}
                        >
                            Pedometer
                        </button>
                    </div>
                </div>
            </Card>

            {isTracking && trackingMethod === 'gps' && (
                <Card title="GPS Tracking">
                    <GpsStepTracker
                        onStepUpdate={handleStepUpdate}
                        isTracking={isTracking}
                    />
                </Card>
            )}

            {isTracking && trackingMethod === 'pedometer' && (
                <Card title="Pedometer Active">
                    <div className="p-4 text-center">
                        <div className="text-lg mb-2">Pedometer is tracking your steps</div>
                        <p className="text-gray-600 dark:text-gray-400">
                            Keep your phone in your pocket while walking for best results
                        </p>
                        <div className="animate-pulse mt-4 text-3xl">
                            👟
                        </div>
                    </div>
                </Card>
            )}

            {/* Demo buttons for testing */}
            <Card title="Demo Tools">
                <div className="flex space-x-2 p-4">
                    <button
                        className="flex-1 py-2 px-4 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 font-medium rounded-md"
                        onClick={() => addSteps(100)}
                    >
                        +100 Steps
                    </button>
                    <button
                        className="flex-1 py-2 px-4 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 font-medium rounded-md"
                        onClick={() => addSteps(500)}
                    >
                        +500 Steps
                    </button>
                    <button
                        className="flex-1 py-2 px-4 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 font-medium rounded-md"
                        onClick={() => addSteps(1000)}
                    >
                        +1000 Steps
                    </button>
                </div>
            </Card>

            <Card title="Step History">
                <StepChart
                    stepHistory={stepHistory}
                    days={last7Days}
                    goal={goal}
                />
            </Card>
        </div>
    )
}