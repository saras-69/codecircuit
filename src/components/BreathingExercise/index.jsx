import { useState, useEffect, useRef } from 'react'
import Card from '../UI/Card'
import BreathingCircle from './BreathingCircle'
import PatternControls from './PatternControls'
import { getData, saveData } from '../../utils/storage'

export default function BreathingExercise() {
    const [isActive, setIsActive] = useState(false)
    const [breathingPhase, setBreathingPhase] = useState('ready') // 'ready', 'inhale', 'hold', 'exhale'
    const [counter, setCounter] = useState(0)
    const [timer, setTimer] = useState(0)
    const [pattern, setPattern] = useState(() => {
        return getData('breathingPattern', {
            inhale: 4, // seconds
            hold: 2,   // seconds
            exhale: 4  // seconds
        })
    })

    const timerRef = useRef(null)

    // Save breathing pattern when it changes
    useEffect(() => {
        saveData('breathingPattern', pattern)
    }, [pattern])

    // Handle breathing cycle
    useEffect(() => {
        if (!isActive) return

        // Start with inhale
        if (breathingPhase === 'ready') {
            setBreathingPhase('inhale')
            setCounter(pattern.inhale)
        }

        timerRef.current = setInterval(() => {
            setCounter(prev => {
                // When counter reaches 0, move to next phase
                if (prev <= 1) {
                    switch (breathingPhase) {
                        case 'inhale':
                            setBreathingPhase('hold')
                            return pattern.hold
                        case 'hold':
                            setBreathingPhase('exhale')
                            return pattern.exhale
                        case 'exhale':
                            setBreathingPhase('inhale')
                            setTimer(prev => prev + 1) // Increment cycle counter
                            return pattern.inhale
                        default:
                            return prev
                    }
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timerRef.current)
    }, [isActive, breathingPhase, pattern])

    const toggleExercise = () => {
        if (isActive) {
            clearInterval(timerRef.current)
            setBreathingPhase('ready')
            setCounter(0)
        } else {
            setTimer(0)
        }
        setIsActive(!isActive)
    }

    const updatePattern = (key, value) => {
        if (value >= 1 && value <= 10) {
            setPattern(prev => ({ ...prev, [key]: value }))
        }
    }

    return (
        <div className="space-y-6">
            <Card title="Breathing Exercise">
                <BreathingCircle
                    breathingPhase={breathingPhase}
                    counter={counter}
                    isActive={isActive}
                />

                {/* Breathing pattern controls */}
                {!isActive && (
                    <PatternControls
                        pattern={pattern}
                        updatePattern={updatePattern}
                    />
                )}

                {/* Exercise stats */}
                {isActive && (
                    <div className="mb-6 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            Completed cycles: <span className="font-bold">{timer}</span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                            Pattern: {pattern.inhale}-{pattern.hold}-{pattern.exhale} seconds
                        </p>
                    </div>
                )}

                {/* Start/Stop button */}
                <button
                    className={`w-full py-3 px-4 rounded-md text-white font-medium ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    onClick={toggleExercise}
                >
                    {isActive ? 'Stop Breathing Exercise' : 'Start Breathing Exercise'}
                </button>
            </Card>
        </div>
    )
}