export default function BreathingCircle({ breathingPhase, counter, isActive }) {
    return (
        <div className="flex items-center justify-center my-10">
            <div className={`relative transform transition-all duration-1000 ease-in-out ${breathingPhase === 'inhale' ? 'scale-150' :
                    breathingPhase === 'hold' ? 'scale-150' :
                        breathingPhase === 'exhale' ? 'scale-100' : 'scale-100'
                }`}>
                <div className="w-32 h-32 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-blue-300 dark:bg-blue-700 flex items-center justify-center">
                            {isActive && (
                                <span className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                                    {counter}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Instruction text */}
                {isActive && (
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-lg font-medium text-blue-600 dark:text-blue-400">
                        {breathingPhase === 'inhale' && "Inhale..."}
                        {breathingPhase === 'hold' && "Hold..."}
                        {breathingPhase === 'exhale' && "Exhale..."}
                    </div>
                )}
            </div>
        </div>
    )
}