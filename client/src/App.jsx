import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { SidebarProvider } from './contexts/SidebarContext'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// subject imports
import AddSubject from './pages/Subject/create'
import EditSubject from './pages/Subject/edit'
import AllSubjects from './pages/Subject/index'

// system imports
import AddSystem from './pages/System/create'
import EditSystem from './pages/System/edit'
import AllSystems from './pages/System/index'

// Subsystem imports
import AddSubsystem from './pages/Subsystem/create'
import EditSubsystem from './pages/Subsystem/edit'
import AllSubsystems from './pages/Subsystem/index'

// topic imports
import AddTopic from './pages/Topic/create'
import EditTopic from './pages/Topic/edit'
import AllTopics from './pages/Topic/index'

// question imports
import AddQuestion from './pages/Question/create'
import AllQuestions from './pages/Question/index'


// dashboard import
import Dashboard from './pages/Dashboard'

// contexts
import { useSidebar } from './contexts/SidebarContext'

// temprary imports
import UploadForm from './pages/Uploads/UploadForm'

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
          {/* Dashboard Route */}
          <Route path='/' element={<Dashboard />} />

          {/*Subjects Routes  */}
          <Route path='/add-subject' element={<AddSubject />} />
          <Route path='/edit-subject/:id' element={<EditSubject />} />
          <Route path='/all-subjects' element={<AllSubjects />} />

          {/* Systems Routes */}
          <Route path='/add-system' element={<AddSystem />} />
          <Route path='/edit-system/:id' element={<EditSystem />} />
          <Route path='/all-systems' element={<AllSystems />} />

          {/* SubSytem Routes */}
          <Route path='/add-subsystem' element={<AddSubsystem />} />
          <Route path='/edit-subsystem/:id' element={<EditSubsystem />} />
          <Route path='/all-subsystems' element={<AllSubsystems />} />

          {/* Topics Routes */}
          <Route path='/add-topic' element={<AddTopic />} />
          <Route path='/edit-topic/:id' element={<EditTopic />} />
          <Route path='/all-topics' element={<AllTopics />} />

          {/* Question Routes */}
          <Route path='/add-question' element={<AddQuestion />} />
          <Route path='/all-questions' element={<AllQuestions />} />

          {/* temprary routes */}
          <Route path='/upload' element={<UploadForm />} />


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
        <ToastContainer position="bottom-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored" // Use the colored theme for vibrant toasts
          toastClassName="custom-toast"
          bodyClassName="custom-toast-body" />
      </Router>
    </SidebarProvider>
  )
}