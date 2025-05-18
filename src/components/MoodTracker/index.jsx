import { useState, useEffect } from 'react'
import Card from '../UI/Card'
import MoodSelector from './MoodSelector'
import MoodCalendar from './MoodCalendar'
import { getToday, getLastNDays } from '../../utils/dateUtils'
import { getData, updateDateData } from '../../utils/storage'

export default function MoodTracker() {
    const [selectedMood, setSelectedMood] = useState(null)
    const [moodHistory, setMoodHistory] = useState(() => {
        // Load mood history from localStorage on component mount
        return getData('moodHistory', {})
    })

    // Get the last 7 days for calendar
    const calendarDays = getLastNDays(7)

    // Save mood data to history and localStorage
    const saveMood = (mood, note) => {
        const today = getToday()
        const newHistory = updateDateData('moodHistory', today, {
            mood,
            note
        })

        setMoodHistory(newHistory)
        setSelectedMood(null)
    }

    return (
        <div className="space-y-6">
            <Card title="How are you feeling today?">
                <MoodSelector
                    selectedMood={selectedMood}
                    setSelectedMood={setSelectedMood}
                    onSave={saveMood}
                />
            </Card>

            <Card title="Your Recent Moods">
                <MoodCalendar
                    calendarDays={calendarDays}
                    moodHistory={moodHistory}
                />
            </Card>
        </div>
    )
}