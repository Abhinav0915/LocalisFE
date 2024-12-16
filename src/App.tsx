import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import TranslateJsonPage from './components/TranslateJson'

function AppRoutes (){
  // const navigate = useNavigate()
  return(
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/translate-json" element={<TranslateJsonPage/>}/>

    </Routes>
  )
  
}

function App() {

  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App
