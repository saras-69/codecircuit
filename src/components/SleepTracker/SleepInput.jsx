export default function SleepInput({ hoursSlept, setHoursSlept }) {
    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Hours slept last night
            </label>
            <div className="flex items-center space-x-4">
                <input
                    type="range"
                    min="0"
                    max="12"
                    step="0.5"
                    value={hoursSlept}
                    onChange={(e) => setHoursSlept(parseFloat(e.target.value))}
                    className="flex-1"
                />
                <span className="w-12 text-lg font-bold text-blue-600 dark:text-blue-400">
                    {hoursSlept}h
                </span>
            </div>
        </div>
    )
}