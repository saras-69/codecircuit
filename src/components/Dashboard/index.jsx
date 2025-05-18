import { useState, useEffect } from 'react'
import WelcomeCard from './WelcomeCard'
import StatCard from './StatCard'
import HealthTip from './HealthTip'
import WeeklySummary from './WeeklySummary'
import { getToday, getLastNDays } from '../../utils/dateUtils'
import { getData } from '../../utils/storage'
import ActivityGraph from './ActivityGraph'

export default function Dashboard() {
    const [healthData, setHealthData] = useState({
        mood: {},
        water: {},
        sleep: {},
        steps: {}
    })

    const [currentSteps, setCurrentSteps] = useState(0)

    // Load data from localStorage on component mount and refresh periodically
    useEffect(() => {
        const loadData = () => {
            // Load health data
            const moodHistory = getData('moodHistory', {})
            const waterTracker = getData('waterTracker', {})
            const sleepHistory = getData('sleepHistory', {})
            const stepTracker = getData('stepTracker', {})

            setHealthData({
                mood: moodHistory,
                water: waterTracker,
                sleep: sleepHistory,
                steps: stepTracker
            })

            // Set current steps
            const today = getToday()
            const todaySteps = stepTracker[today] || 0
            setCurrentSteps(todaySteps)

            console.log("Dashboard loaded step data:", today, todaySteps)
        }

        // Load data immediately
        loadData()

        // Refresh data every 5 seconds to capture updates
        const interval = setInterval(loadData, 5000)
        return () => clearInterval(interval)
    }, [])

    // Today's date
    const today = getToday()
    const last7Days = getLastNDays(7)

    // Get the latest mood
    const getLatestMood = () => {
        const todayMood = healthData.mood[today]
        if (todayMood) {
            const moods = ["😊", "😐", "😢", "😡"]
            return moods[todayMood.mood]
        }
        return null
    }

    // Calculate water progress
    const getWaterProgress = () => {
        const todayWater = healthData.water[today] || 0
        const waterGoal = getData('waterGoal', 8)
        return Math.round((todayWater / waterGoal) * 100)
    }

    // Get sleep data
    const getSleepData = () => {
        const todaySleep = healthData.sleep[today]
        return todaySleep ? todaySleep.hours : null
    }

    // Calculate step progress
    const getStepProgress = () => {
        const stepGoal = getData('stepGoal', 10000)
        return Math.round((currentSteps / stepGoal) * 100)
    }

    return (
        <div className="space-y-6">
            {/* Welcome section with floating animation */}
            <div className="animate-float">
                <WelcomeCard moodEmoji={getLatestMood()} />
            </div>

            {/* Health summary cards */}
            <div className="grid grid-cols-2 gap-4">
                {/* Water intake card */}
                <div className="dashboard-item">
                    <StatCard
                        icon="💧"
                        title="Water Intake"
                        value={`${getWaterProgress()}% of goal`}
                        subtext={getWaterProgress() > 75 ? "Doing great!" : "Keep drinking!"}
                        color="text-blue-500"
                    />
                </div>

                {/* Sleep card */}
                <div className="dashboard-item">
                    <StatCard
                        icon="😴"
                        title="Sleep"
                        value={getSleepData() ? `${getSleepData()}h` : 'Not logged yet'}
                        subtext={getSleepData() ? (getSleepData() >= 7 ? 'Well rested' : 'Could use more sleep') : 'Log your sleep'}
                        color="text-indigo-600"
                    />
                </div>

                {/* Steps card with real-time animation */}
                <div className="dashboard-item">
                    <StatCard
                        icon="👟"
                        title="Steps"
                        value={currentSteps.toLocaleString()}
                        subtext={getStepProgress() > 50 ? 'On track!' : 'Keep moving!'}
                        color="text-green-600"
                        isAnimated={true}
                    />
                </div>

                {/* Heart rate card */}
                <div className="dashboard-item">
                    <StatCard
                        icon="❤️"
                        title="Heart Rate"
                        value={`${70 + Math.floor(Math.random() * 10)} BPM`}
                        subtext="Resting"
                        color="text-red-600"
                        pulse={true}
                    />
                </div>
            </div>

            {/* Activity graph */}
            <div className="dashboard-item">
                <ActivityGraph
                    stepData={healthData.steps}
                    sleepData={healthData.sleep}
                    days={last7Days}
                />
            </div>

            {/* Health tips */}
            <div className="dashboard-item">
                <HealthTip />
            </div>

            {/* Weekly summary */}
            <div className="dashboard-item">
                <WeeklySummary />
            </div>
        </div>
    )
}