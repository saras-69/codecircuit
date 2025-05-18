import { getDayAbbr } from '../../utils/dateUtils'

export default function MoodCalendar({ calendarDays, moodHistory }) {
    // Moods configuration with emoji, color and label
    const moods = [
        { emoji: "😊", color: "bg-green-500", label: "Happy" },
        { emoji: "😐", color: "bg-yellow-500", label: "Neutral" },
        { emoji: "😢", color: "bg-blue-500", label: "Sad" },
        { emoji: "😡", color: "bg-red-500", label: "Angry" }
    ]

    return (
        <div className="flex flex-wrap gap-2">
            {calendarDays.map((date) => {
                const dayData = moodHistory[date]
                const moodData = dayData ? moods[dayData.mood] : null

                return (
                    <div
                        key={date}
                        className={`w-12 h-12 rounded-md flex flex-col items-center justify-center text-xs ${moodData ? moodData.color + ' text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                            }`}
                        title={dayData?.note || 'No mood recorded'}
                    >
                        <span>{getDayAbbr(date)}</span>
                        <span>{new Date(date).getDate()}</span>
                        {moodData && <span className="text-lg">{moodData.emoji}</span>}
                    </div>
                )
            })}
        </div>
    )
}