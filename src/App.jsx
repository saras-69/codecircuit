import { useState } from 'react'
import './App.css'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import MoodTracker from './components/MoodTracker'
import WaterTracker from './components/WaterTracker'
import BreathingExercise from './components/BreathingExercise'
import SleepTracker from './components/SleepTracker'
import StepTracker from './components/StepTracker'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  // Function to render the active component
  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'mood':
        return <MoodTracker />
      case 'water':
        return <WaterTracker />
      case 'breathing':
        return <BreathingExercise />
      case 'sleep':
        return <SleepTracker />
      case 'steps':
        return <StepTracker />
      default:
        return <Dashboard />
    }
  }

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {renderActiveComponent()}
    </Layout>
  )
}

export default App