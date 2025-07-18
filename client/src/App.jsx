import {Routes, Route, Navigate} from 'react-router-dom'
import { useState } from 'react'

import Login from './components/Login'
import Signup from './components/Signup'
import MyPosts from './pages/MyPosts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='*' element={<Navigate to="/" />} />
      <Route path='/myposts' element={<MyPosts />} />
    </Routes>
  )
}

export default App
