import { useState, useEffect, createContext, useContext } from 'react'

// Create Theme Context
const ThemeContext = createContext(null)

// Theme Provider Component
export function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check local storage first
        const savedMode = localStorage.getItem('darkMode')
        if (savedMode !== null) {
            return savedMode === 'true'
        }
        // Otherwise check system preference
        if (window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        return false
    })

    // Update document when theme changes
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        // Save to localStorage
        localStorage.setItem('darkMode', isDarkMode)
    }, [isDarkMode])

    // Listen for system preference changes
    useEffect(() => {
        if (!window.matchMedia) return

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleChange = (e) => {
            setIsDarkMode(e.matches)
        }

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange)
            return () => mediaQuery.removeEventListener('change', handleChange)
        } else if (mediaQuery.addListener) {
            // Fallback for Safari
            mediaQuery.addListener(handleChange)
            return () => mediaQuery.removeListener(handleChange)
        }
    }, [])

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev)
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

// Hook to use theme
export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}