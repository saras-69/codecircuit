import ProgressBar from '../UI/ProgressBar'

export default function WaterProgress({ cups, goal }) {
    const calculateProgress = () => {
        return (cups / goal) * 100
    }

    return (
        <div className="space-y-2">
            <ProgressBar progress={calculateProgress()} />

            <div className="text-center">
                <span className="text-2xl font-bold text-blue-500">{cups} / {goal}</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">cups of water</p>
            </div>
        </div>
    )
}