import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import runChat from './config/api'
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { Main } from './components/Main'

function App() {

  return (
    <>
        <Sidebar />
        <Main />
    </>
  )
}

export default App
