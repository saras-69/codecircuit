import { getToday } from '../../utils/dateUtils'

export default function WelcomeCard({ moodEmoji }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Welcome back!</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>
                {moodEmoji && (
                    <div className="text-4xl">
                        {moodEmoji}
                    </div>
                )}
            </div>
        </div>
    )
}