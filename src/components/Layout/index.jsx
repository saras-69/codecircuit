import Header from './Header'
import Navigation from './Navigation'

export default function Layout({ children, activeTab, setActiveTab }) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header />

            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 pb-20">
                {children}
            </main>

            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    )
}