import { useState, useEffect } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

function App() {
  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem('sidebar-collapsed')
    return stored === null ? false : stored === 'true'
  })

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', collapsed)
  }, [collapsed])

  return (
    <div className='flex'>
      <div>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <div className="bg-orange-300 h-screen" style={{ width: `calc(100% - ${collapsed ? '64px' : '192px'})` }}>
        <Header />
      </div>
    </div>
  )
}

export default App
