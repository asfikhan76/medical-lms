import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import AddQuestion from './pages/AddQuestion'

function App() {
  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem('sidebar-collapsed')
    return stored === null ? false : stored === 'true'
  })

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', collapsed)
  }, [collapsed])

  return (
    <Router>
      <div className='flex'>
        <div>
          <Sidebar collapsed={collapsed} />
        </div>
        <div className="bg-[#eee] h-screen" style={{ width: `calc(100% - ${collapsed ? '64px' : '192px'})` }}>
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
          <Routes>
            <Route path='/add-question' element={<AddQuestion />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
