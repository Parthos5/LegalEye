import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import Home from './Pages/Home/Home.jsx';
import Govtlogin from './Pages/Govtlogin/Login.jsx';
import Signin from './Pages/SignIn/Signin.jsx';
import GFirst from './Pages/GFirst/GFirst.jsx';
import SFirst from './Pages/SFirst/SFirst.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<Govtlogin />} />  
      <Route path="/Signin" element={<Signin />} />  
      <Route path="/GFirst" element={<GFirst />} />
      <Route path="/SFirst" element={<SFirst />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
