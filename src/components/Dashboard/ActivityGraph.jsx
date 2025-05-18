import { useState, useEffect } from 'react'
import { getDayAbbr } from '../../utils/dateUtils'

export default function ActivityGraph({ stepData, sleepData, days }) {
    const [animated, setAnimated] = useState(false)

    useEffect(() => {
        console.log("ActivityGraph received data:", {
            stepData,
            sleepData,
            days,
            stepEntries: Object.keys(stepData || {}).length
        });

        // Reset animation state first to trigger re-animation when data changes
        setAnimated(false)

        // Then set it to true after a short delay
        const timer = setTimeout(() => setAnimated(true), 300)
        return () => clearTimeout(timer)
    }, [stepData, sleepData, days])

    // Ensure we have data
    if (!stepData || !days || days.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
                    Activity Overview
                </h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                    No activity data available
                </div>
            </div>
        )
    }

    // Get maximum values for scaling
    const getMaxSteps = () => {
        const steps = days.map(day => stepData[day] || 0)
        return Math.max(...steps, 10000) || 10000
    }

    const getMaxSleep = () => {
        const sleepHours = days.map(day => {
            const sleep = sleepData && sleepData[day]
            return sleep ? sleep.hours : 0
        })
        return Math.max(...sleepHours, 8) || 8
    }

    const maxSteps = getMaxSteps()
    const maxSleep = getMaxSleep()

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Activity Overview</h3>

            <div className="h-64 relative">
                {/* Horizontal grid lines */}
                {[0, 25, 50, 75, 100].map(percent => (
                    <div
                        key={percent}
                        className="absolute w-full h-px bg-gray-200 dark:bg-gray-700"
                        style={{ bottom: `${percent}%` }}
                    >
                        <span className="absolute -left-6 -top-2 text-xs text-gray-500">
                            {percent === 0 ? '0' :
                                percent === 100 ? `${Math.round(maxSteps / 1000)}k` : ''}
                        </span>
                    </div>
                ))}

                {/* Day labels */}
                <div className="absolute bottom-0 w-full flex justify-between px-2">
                    {days.map(day => (
                        <div key={day} className="text-xs text-gray-500">
                            {getDayAbbr(day)}
                        </div>
                    ))}
                </div>

                {/* Step bars */}
                <div className="absolute bottom-6 w-full flex justify-between px-2 items-end h-[calc(100%-1.5rem)]">
                    {days.map((day, index) => {
                        const steps = stepData[day] || 0
                        const percent = maxSteps > 0 ? (steps / maxSteps) * 100 : 0

                        return (
                            <div key={`step-${day}`} className="w-8 flex justify-center">
                                <div
                                    className="w-3 bg-blue-400 dark:bg-blue-600 rounded-t transition-all duration-1000 ease-out"
                                    style={{
                                        height: animated ? `${percent}%` : '0%',
                                        transitionDelay: `${index * 100}ms`
                                    }}
                                ></div>
                            </div>
                        )
                    })}
                </div>

                {/* Sleep line chart */}
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                    {sleepData && (
                        <polyline
                            points={days.map((day, index) => {
                                const sleep = sleepData[day]
                                const hours = sleep ? sleep.hours : 0
                                const x = (index / (days.length - 1)) * 100
                                const y = 100 - (hours / maxSleep) * 100
                                return `${x},${y}`
                            }).join(' ')}
                            className="stroke-purple-500 stroke-2 fill-none"
                            strokeDasharray="500"
                            strokeDashoffset={animated ? "0" : "500"}
                            style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }}
                        />
                    )}

                    {/* Data points for sleep */}
                    {sleepData && days.map((day, index) => {
                        const sleep = sleepData[day]
                        const hours = sleep ? sleep.hours : 0
                        if (hours === 0) return null

                        const x = (index / (days.length - 1)) * 100
                        const y = 100 - (hours / maxSleep) * 100

                        return (
                            <circle
                                key={`sleep-point-${day}`}
                                cx={`${x}%`}
                                cy={`${y}%`}
                                r="3"
                                className="fill-purple-500"
                                opacity={animated ? "1" : "0"}
                                style={{
                                    transition: "opacity 0.5s ease-in-out",
                                    transitionDelay: `${800 + index * 100}ms`
                                }}
                            />
                        )
                    })}
                </svg>

                {/* Legend */}
                <div className="absolute top-0 right-0 flex items-center space-x-4 text-xs">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-400 dark:bg-blue-600 mr-1"></div>
                        <span>Steps</span>
                    </div>
                    {sleepData && (
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-purple-500 mr-1"></div>
                            <span>Sleep</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}