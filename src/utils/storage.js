// Save data to localStorage
export const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}

// Get data from localStorage
export const getData = (key, defaultValue = null) => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : defaultValue
}

// Update a specific date in a date-keyed dataset
export const updateDateData = (storageKey, date, data) => {
    const existingData = getData(storageKey, {})
    const newData = {
        ...existingData,
        [date]: data
    }
    saveData(storageKey, newData)
    return newData
}