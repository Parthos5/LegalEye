import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import Home from './Pages/Home/Home.jsx';
import Govtlogin from './Pages/Govtlogin/Login.jsx';
import Signin from './Pages/SignIn/Signin.jsx';
import GFirst from './Pages/GFirst/GFirst.jsx';
import SFirst from './Pages/SFirst/SFirst.jsx';
import AddCase from './Pages/AddCase/AddCase.jsx';
import UpdateCase from './Pages/UpdateCase/UpdateCase.jsx';
import SingleCase from './Pages/SingleCase/SingleCase.jsx';
import Profile from './Pages/Profile/Profile.jsx';

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
      <Route path="/AddCase" element={<AddCase />} />
      <Route path="/UpdateCase" element={<UpdateCase />} />
      <Route path="/SingleCase/:caseId" element={<SingleCase />} />
      <Route path="/Profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
