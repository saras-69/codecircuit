export default function Navigation({ activeTab, setActiveTab }) {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'mood', label: 'Mood', icon: '🟢' },
        { id: 'water', label: 'Water', icon: '💧' },
        { id: 'steps', label: 'Steps', icon: '👟' },
        { id: 'breathing', label: 'Breathing', icon: '🌬️' },
        { id: 'sleep', label: 'Sleep', icon: '😴' }
    ]

    return (
        <nav className="fixed bottom-0 w-full bg-white dark:bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === item.id
                                ? 'bg-blue-500 text-white scale-110'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            {item.icon} {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    )
}