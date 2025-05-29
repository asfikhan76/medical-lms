import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { SidebarProvider } from './contexts/SidebarContext'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
// subject imports
import AddSubject from './pages/Subject/create'
import EditSubject from './pages/Subject/edit'
import AllSubjects from './pages/Subject/index'

// system imports
import AddSystem from './pages/System/create'

// category imports
import AddCategory from './pages/Category/create'

// topic imports
import AddTopic from './pages/Topic/create'

// dashboard import
import Dashboard from './pages/Dashboard'

// contexts
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
          {/*Subjects Routes  */}
          <Route path='/add-subject' element={<AddSubject />} />
          <Route path='/edit-subject' element={<EditSubject />} />
          <Route path='/all-subjects' element={<AllSubjects />} />
          {/* Systems Routes */}
          <Route path='/add-system' element={<AddSystem />} />
          {/* Categories Routes */}
          <Route path='/add-category' element={<AddCategory />} />
          {/* Topics Routes */}
          <Route path='/add-topic' element={<AddTopic />} />
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