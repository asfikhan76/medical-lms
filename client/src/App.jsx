import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { SidebarProvider } from './contexts/SidebarContext'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import AddSubject from './pages/AddSubject'
import Dashboard from './pages/Dashboard'
import { useSidebar } from './contexts/SidebarContext'

function AppContent() {
  const { collapsed } = useSidebar()
  return (
    <div className='flex'>
      <div>
        <Sidebar />
      </div>
      <div className="bg-[#eee] h-screen" style={{ width: `calc(100% - ${collapsed ? '64px' : '192px'})` }}>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/add-subject' element={<AddSubject />} />
        </Routes>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <SidebarProvider>
      <Router>
        <AppContent />
      </Router>
    </SidebarProvider>
  )
}