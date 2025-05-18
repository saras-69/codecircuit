import { useState } from 'react'
import Card from '../UI/Card'
import SleepInput from './SleepInput'
import QualityRating from './QualityRating'
import SleepChart from './SleepChart'
import { getToday, getLastNDays } from '../../utils/dateUtils'
import { getData, updateDateData } from '../../utils/storage'

export default function SleepTracker() {
    const [hoursSlept, setHoursSlept] = useState(7)
    const [sleepQuality, setSleepQuality] = useState(3)
    const [sleepHistory, setSleepHistory] = useState(() => {
        return getData('sleepHistory', {})
    })

    // Get last 7 days
    const last7Days = getLastNDays(7)

    // Record sleep data
    const recordSleep = () => {
        const today = getToday()
        const newHistory = updateDateData('sleepHistory', today, {
            hours: hoursSlept,
            quality: sleepQuality
        })

        setSleepHistory(newHistory)
    }

    return (
        <div className="space-y-6">
            <Card title="Sleep Tracker">
                <SleepInput
                    hoursSlept={hoursSlept}
                    setHoursSlept={setHoursSlept}
                />

                <QualityRating
                    sleepQuality={sleepQuality}
                    setSleepQuality={setSleepQuality}
                />

                {/* Save button */}
                <button
                    className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
                    onClick={recordSleep}
                >
                    Save Sleep Data
                </button>
            </Card>

            {/* Sleep chart */}
            <Card>
                <SleepChart
                    sleepHistory={sleepHistory}
                    days={last7Days}
                />
            </Card>
        </div>
    )
}