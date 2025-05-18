export default function Card({ title, children, className = "" }) {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 ${className}`}>
            {title && <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>}
            {children}
        </div>
    )
}