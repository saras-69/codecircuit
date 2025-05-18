export default function WaterCups({ cups, goal, setCups }) {
    return (
        <div className="grid grid-cols-4 gap-4 mb-6">
            {[...Array(goal)].map((_, i) => (
                <div
                    key={i}
                    className={`relative flex items-end justify-center p-1 h-20 rounded-b-lg border-2 ${i < cups ? 'border-blue-500 bg-blue-500 bg-opacity-30' : 'border-gray-300 dark:border-gray-600'
                        }`}
                    onClick={() => i < cups ? setCups(i) : setCups(i + 1)}
                >
                    <div
                        className={`absolute bottom-0 w-full rounded-b-lg transition-all duration-300 ease-in-out bg-blue-500 ${i < cups ? 'h-full' : 'h-0'
                            }`}
                    ></div>
                    <span className="relative text-sm font-medium z-10 mb-1">
                        {i + 1}
                    </span>
                </div>
            ))}
        </div>
    )
}