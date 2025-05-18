import { getDayAbbr } from '../../utils/dateUtils'

export default function SleepChart({ sleepHistory, days }) {
    // Calculate average sleep
    const calculateAverageSleep = () => {
        const sleepData = days
            .map(day => sleepHistory[day]?.hours || 0)
            .filter(hours => hours > 0)

        if (sleepData.length === 0) return 0

        const total = sleepData.reduce((sum, hours) => sum + hours, 0)
        return (total / sleepData.length).toFixed(1)
    }

    // Calculate maximum value for chart scaling
    const getMaxSleepHours = () => {
        const hours = days.map(day => sleepHistory[day]?.hours || 0)
        return Math.max(...hours, 8) // At least 8 for scaling
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sleep History</h3>
                <div className="text-sm font-medium">
                    <span className="text-gray-600 dark:text-gray-400">Average: </span>
                    <span className="text-blue-600 dark:text-blue-400">{calculateAverageSleep()}h</span>
                </div>
            </div>

            {/* Simple bar chart */}
            <div className="flex items-end h-48 space-x-2">
                {days.map((day) => {
                    const sleepData = sleepHistory[day]
                    const hours = sleepData?.hours || 0
                    const quality = sleepData?.quality || 0
                    const maxHours = getMaxSleepHours()
                    const heightPercentage = hours > 0 ? (hours / maxHours) * 100 : 0

                    // Color based on quality
                    const qualityColor = quality <= 2 ? 'bg-red-400' :
                        quality === 3 ? 'bg-yellow-400' : 'bg-green-400'

                    return (
                        <div key={day} className="flex-1 flex flex-col items-center">
                            <div className="w-full flex justify-center mb-1">
                                <div
                                    className={`w-full ${hours > 0 ? qualityColor : 'bg-gray-200 dark:bg-gray-700'}`}
                                    style={{ height: `${heightPercentage}%` }}
                                ></div>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                {getDayAbbr(day)}
                            </div>
                            <div className="text-xs font-medium">
                                {hours > 0 ? `${hours}h` : '-'}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}