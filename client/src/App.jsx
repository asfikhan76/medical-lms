import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

function App() {

  return (
    <div className='flex'>
      <div>
        <Sidebar />
      </div>
      <div>
        {/* <Header /> */}
      </div>
    </div>
  )
}

export default App
