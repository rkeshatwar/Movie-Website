import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Tvshow from './components/Tvshow'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/tvshow' element={<Tvshow/>}></Route>
    <Route path='*' element={<h1>404 Error</h1>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App