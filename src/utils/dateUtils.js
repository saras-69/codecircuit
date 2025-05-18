// Format date as YYYY-MM-DD
export const formatDate = (date) => {
    return date.toISOString().split('T')[0]
}

// Get today's date formatted
export const getToday = () => formatDate(new Date())

// Get the last n days as an array of date strings
export const getLastNDays = (n) => {
    const days = []
    for (let i = n - 1; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        days.push(formatDate(date))
    }
    return days
}

// Get day of week abbreviation
export const getDayAbbr = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { weekday: 'short' })
} 