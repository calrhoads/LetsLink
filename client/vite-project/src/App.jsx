import { useState , useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login';
import './App.css'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/checksession").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []); 

  return (
    <>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login onLogin={setUser}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
      
    </>
  )
}

export default App
