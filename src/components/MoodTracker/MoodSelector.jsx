import { useState } from 'react'

export default function MoodSelector({ selectedMood, setSelectedMood, onSave }) {
    const [moodNote, setMoodNote] = useState('')

    // Moods configuration with emoji, color and label
    const moods = [
        { emoji: "😊", color: "bg-green-500", label: "Happy" },
        { emoji: "😐", color: "bg-yellow-500", label: "Neutral" },
        { emoji: "😢", color: "bg-blue-500", label: "Sad" },
        { emoji: "😡", color: "bg-red-500", label: "Angry" }
    ]

    const handleSave = () => {
        if (selectedMood !== null) {
            onSave(selectedMood, moodNote)
            setMoodNote('')
        }
    }

    return (
        <div className="space-y-4">
            {/* Mood Selection */}
            <div className="flex space-x-4 mb-4">
                {moods.map((mood, index) => (
                    <button
                        key={index}
                        className={`w-12 h-12 flex items-center justify-center text-2xl rounded-full transition-transform ${selectedMood === index ? `${mood.color} scale-110 ring-2 ring-blue-500` : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                        onClick={() => setSelectedMood(index)}
                        aria-label={mood.label}
                    >
                        {mood.emoji}
                    </button>
                ))}
            </div>

            {/* Note input */}
            <div>
                <label htmlFor="moodNote" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Add a note (optional)
                </label>
                <textarea
                    id="moodNote"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    rows="2"
                    value={moodNote}
                    onChange={(e) => setMoodNote(e.target.value)}
                    placeholder="How was your day?"
                ></textarea>
            </div>

            {/* Save button */}
            <button
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${selectedMood !== null ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                onClick={handleSave}
                disabled={selectedMood === null}
            >
                Save Today's Mood
            </button>
        </div>
    )
}