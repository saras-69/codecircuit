export default function QualityRating({ sleepQuality, setSleepQuality }) {
    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sleep quality
            </label>
            <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                        key={rating}
                        className={`w-10 h-10 flex items-center justify-center rounded-full ${sleepQuality === rating
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                            }`}
                        onClick={() => setSleepQuality(rating)}
                    >
                        {rating}
                    </button>
                ))}
            </div>
            <div className="flex justify-between px-1 mt-1 text-xs text-gray-500">
                <span>Poor</span>
                <span>Excellent</span>
            </div>
        </div>
    )
}