import { useState, useEffect } from 'react'

export default function StatCard({
    icon,
    title,
    value,
    subtext,
    color = "text-blue-500",
    bgColor = "bg-blue-100",
    isAnimated = false,
    pulse = false
}) {
    const [prevValue, setPrevValue] = useState(value)
    const [animateValue, setAnimateValue] = useState(false)

    // Detect changes to value prop
    useEffect(() => {
        if (isAnimated && value !== prevValue) {
            setAnimateValue(true)
            const timer = setTimeout(() => {
                setAnimateValue(false)
                setPrevValue(value)
            }, 1000)

            return () => clearTimeout(timer)
        }
    }, [value, prevValue, isAnimated])

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 relative overflow-hidden">
            {/* Shimmer effect on value change */}
            {animateValue && (
                <div className="absolute inset-0 animate-shimmer"></div>
            )}

            <div className="flex items-center space-x-3">
                <div className={`text-3xl ${color} relative ${animateValue ? 'animate-bounce' : ''}`}>
                    {icon}
                    {pulse && (
                        <span className={`absolute inset-0 rounded-full ${bgColor} animate-pulse-ring`}></span>
                    )}
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</h3>
                    <p className={`text-lg font-bold ${color} transition-all duration-300 ${animateValue ? 'scale-110' : ''}`}>
                        {value}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {subtext}
                    </p>
                </div>
            </div>
        </div>
    )
}