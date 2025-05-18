export default function ProgressBar({ progress, height = "h-4", color = "bg-blue-500" }) {
    return (
        <div className={`w-full ${height} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
            <div
                className={`h-full ${color} transition-all duration-500 ease-in-out`}
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    )
}