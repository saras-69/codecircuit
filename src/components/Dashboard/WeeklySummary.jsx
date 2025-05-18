export default function WeeklySummary() {
    // This could be expanded to calculate real weekly metrics
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Weekly Summary</h3>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Average sleep:</span>
                    <span className="font-medium">6.8 hours</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Water intake completion:</span>
                    <span className="font-medium">85%</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Most common mood:</span>
                    <span className="font-medium">😊 Happy</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Average daily steps:</span>
                    <span className="font-medium">6,541</span>
                </div>
            </div>
        </div>
    )
}