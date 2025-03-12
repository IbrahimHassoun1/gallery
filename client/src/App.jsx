import { BrowserRouter ,Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
function App() {
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
