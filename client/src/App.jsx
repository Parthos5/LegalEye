import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import Home from './Pages/Home/Home.jsx';
import Govtlogin from './Pages/Govtlogin/Login.jsx';
import SignIn from './Pages/SignIn/Signin.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<Govtlogin />} />  
      <Route path="/signin" element={<SignIn />} />  
    </Routes>
  </BrowserRouter>
  )
}

export default App
