import { useState, useEffect } from 'react'
import Card from '../UI/Card'
import WaterCups from './WaterCups'
import WaterProgress from './WaterProgress'
import { getToday } from '../../utils/dateUtils'
import { getData, updateDateData } from '../../utils/storage'

export default function WaterTracker() {
    // Default daily goal: 8 cups
    const DEFAULT_GOAL = 8

    const [cups, setCups] = useState(() => {
        // Load today's cups from localStorage
        const today = getToday()
        const savedData = getData('waterTracker', {})
        return savedData[today] || 0
    })

    const [goal, setGoal] = useState(() => {
        // Load goal from localStorage
        return getData('waterGoal', DEFAULT_GOAL)
    })

    const [showConfetti, setShowConfetti] = useState(false)

    // Save data to localStorage when cups or goal changes
    useEffect(() => {
        const today = getToday()
        updateDateData('waterTracker', today, cups)
        localStorage.setItem('waterGoal', goal.toString())

        // Show confetti when goal is reached
        if (cups === goal && cups > 0) {
            setShowConfetti(true)
            setTimeout(() => setShowConfetti(false), 3000)
        }
    }, [cups, goal])

    const addCup = () => {
        if (cups < goal) {
            setCups(cups + 1)
        }
    }

    const removeCup = () => {
        if (cups > 0) {
            setCups(cups - 1)
        }
    }

    const resetCups = () => {
        setCups(0)
    }

    const updateGoal = (newGoal) => {
        if (newGoal >= 1 && newGoal <= 20) {
            setGoal(newGoal)
        }
    }

    return (
        <div className="space-y-6">
            {/* Show confetti animation when goal is reached */}
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(50)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute animate-confetti"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `-10%`,
                                    background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                                    width: `${8 + Math.random() * 10}px`,
                                    height: `${10 + Math.random() * 15}px`,
                                    borderRadius: '1px',
                                    animationDelay: `${Math.random() * 3}s`,
                                    animationDuration: `${3 + Math.random() * 5}s`
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
            )}

            <Card title="Water Intake">
                {/* Goal setting */}
                <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Daily Goal</span>
                    <div className="flex items-center space-x-2">
                        <button
                            className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center"
                            onClick={() => updateGoal(goal - 1)}
                        >-</button>
                        <span className="text-lg font-medium">{goal} cups</span>
                        <button
                            className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center"
                            onClick={() => updateGoal(goal + 1)}
                        >+</button>
                    </div>
                </div>

                <WaterProgress cups={cups} goal={goal} />

                <WaterCups cups={cups} goal={goal} setCups={setCups} />

                {/* Action buttons */}
                <div className="flex space-x-2">
                    <button
                        className="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
                        onClick={addCup}
                    >
                        Add Cup
                    </button>
                    <button
                        className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-md"
                        onClick={removeCup}
                    >
                        Remove Cup
                    </button>
                    <button
                        className="py-2 px-4 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-600 dark:text-red-300 font-medium rounded-md"
                        onClick={resetCups}
                    >
                        Reset
                    </button>
                </div>
            </Card>
        </div>
    )
}