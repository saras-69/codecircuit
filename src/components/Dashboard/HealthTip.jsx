export default function HealthTip() {
    // Array of health tips
    const tips = [
        "Taking short breaks from screen time every 20 minutes can help reduce eye strain and improve focus. Try the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.",
        "Staying hydrated can improve your energy levels and brain function. Aim for at least 8 cups of water daily.",
        "Regular deep breathing exercises can help reduce stress and improve focus. Try taking 5 deep breaths when you feel overwhelmed.",
        "Getting 7-9 hours of sleep each night supports better immunity, mood, and cognitive function.",
        "A short 10-minute walk can boost your energy, mood, and creativity. Try to incorporate short walks throughout your day."
    ];

    // Select a random tip
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Daily Health Tip</h3>
            <div className="flex items-start space-x-4">
                <div className="text-2xl">💡</div>
                <div>
                    <p className="text-gray-700 dark:text-gray-300">
                        {randomTip}
                    </p>
                </div>
            </div>
        </div>
    )
}