import { useState, useEffect } from 'react'
import { getDayAbbr } from '../../utils/dateUtils'

export default function StepChart({ stepHistory, days, goal }) {
    const [animated, setAnimated] = useState(false)

    // Debugging
    useEffect(() => {
        console.log("StepChart received data:", {
            stepHistory,
            days,
            historyEntries: Object.keys(stepHistory).length
        });
    }, [stepHistory, days]);

    // Animate bars on component mount
    useEffect(() => {
        // Short delay before animating to ensure DOM is ready
        const timer = setTimeout(() => {
            setAnimated(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    // Get max steps for chart scaling
    const getMaxSteps = () => {
        const allSteps = days.map(day => stepHistory[day] || 0);
        return Math.max(...allSteps, goal) || goal; // Fallback to goal if all values are 0
    }

    // Calculate average steps
    const getAverageSteps = () => {
        const stepsData = days
            .map(day => stepHistory[day] || 0)
            .filter(steps => steps > 0);

        if (stepsData.length === 0) return 0;

        const total = stepsData.reduce((sum, steps) => sum + steps, 0);
        return Math.round(total / stepsData.length);
    }

    // Make sure we have valid data to render
    if (!stepHistory || !days || days.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500">
                No step data available
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Step History</h3>
                <div className="text-sm font-medium">
                    <span className="text-gray-600 dark:text-gray-400">Average: </span>
                    <span className="text-green-600 dark:text-green-400">{getAverageSteps().toLocaleString()} steps</span>
                </div>
            </div>

            {/* Bar chart */}
            <div className="flex items-end h-48 space-x-2">
                {days.map((day, index) => {
                    const steps = stepHistory[day] || 0;
                    const maxSteps = getMaxSteps();
                    const heightPercentage = maxSteps > 0 ? (steps / maxSteps) * 100 : 0;
                    const isGoalReached = steps >= goal;

                    return (
                        <div key={day} className="flex-1 flex flex-col items-center">
                            <div className="w-full flex justify-center mb-1">
                                <div
                                    className={`w-full ${isGoalReached ? 'bg-green-500' : 'bg-blue-400'} rounded-t-sm transition-all duration-1000 ease-out`}
                                    style={{
                                        height: animated ? `${heightPercentage}%` : '0%',
                                        transitionDelay: `${index * 100}ms`
                                    }}
                                ></div>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                {getDayAbbr(day)}
                            </div>
                            <div className="text-xs font-medium">
                                {steps > 0 ? `${(steps / 1000).toFixed(1)}k` : '-'}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Goal line */}
            <div className="relative mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-xs text-gray-500">
                    <div>0</div>
                    <div>Goal: {(goal / 1000).toFixed(1)}k</div>
                </div>
            </div>
        </div>
    );
}