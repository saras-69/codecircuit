export default function PatternControls({ pattern, updatePattern }) {
    return (
        <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Inhale (sec)
                </label>
                <div className="flex items-center">
                    <button
                        className="w-8 h-8 bg-blue-100 text-blue-700 rounded-l-md flex items-center justify-center"
                        onClick={() => updatePattern('inhale', pattern.inhale - 1)}
                    >-</button>
                    <span className="w-10 text-center">{pattern.inhale}</span>
                    <button
                        className="w-8 h-8 bg-blue-100 text-blue-700 rounded-r-md flex items-center justify-center"
                        onClick={() => updatePattern('inhale', pattern.inhale + 1)}
                    >+</button>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Hold (sec)
                </label>
                <div className="flex items-center">
                    <button
                        className="w-8 h-8 bg-blue-100 text-blue-700 rounded-l-md flex items-center justify-center"
                        onClick={() => updatePattern('hold', pattern.hold - 1)}
                    >-</button>
                    <span className="w-10 text-center">{pattern.hold}</span>
                    <button
                        className="w-8 h-8 bg-blue-100 text-blue-700 rounded-r-md flex items-center justify-center"
                        onClick={() => updatePattern('hold', pattern.hold + 1)}
                    >+</button>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Exhale (sec)
                </label>
                <div className="flex items-center">
                    <button
                        className="w-8 h-8 bg-blue-100 text-blue-700 rounded-l-md flex items-center justify-center"
                        onClick={() => updatePattern('exhale', pattern.exhale - 1)}
                    >-</button>
                    <span className="w-10 text-center">{pattern.exhale}</span>
                    <button
                        className="w-8 h-8 bg-blue-100 text-blue-700 rounded-r-md flex items-center justify-center"
                        onClick={() => updatePattern('exhale', pattern.exhale + 1)}
                    >+</button>
                </div>
            </div>
        </div>
    )
}