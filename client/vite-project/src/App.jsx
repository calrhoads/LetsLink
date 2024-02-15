import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './Login';
import NavBar from './Navbar';
import MainPage from './MainPage';
import Matches from './Matches';
import Header from './Header';
import MyProfile from './MyProfile';
import './App.css';
import {Cloudinary} from "@cloudinary/url-gen";

const App = () => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dg4sixjnk' } });

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/checksession").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []); 
  // console.log(user)

  function NavBarWrapper() {
    const location = useLocation();
  
    if (location.pathname === '/' || location.pathname === '/signup') {
      return null; 
    }
  
    return <NavBar user={user} setUser={setUser} />;
  }

  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Login onLogin={setUser}/>}/>
          <Route path='/main-page' element={<MainPage user={user} setUser={setUser}/>} />
          <Route path='/matches' element={<Matches />} />
          <Route path='/my_profile' element={<MyProfile user={user} setUser={setUser}/>} />
        </Routes>
        <NavBarWrapper />
    </BrowserRouter>
  )
}

// function NavBarWrapper() {
//   const location = useLocation();

//   if (location.pathname === '/' || location.pathname === '/signup') {
//     return null; 
//   }

//   return <NavBar user={user} setUser={setUser} />;
// }

export default App;



// import { useState , useEffect } from 'react'
// import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
// import Login from './Login';
// import NavBar from './Navbar';
// import MainPage from './MainPage';
// import './App.css'

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     fetch("/checksession").then((r) => {
//       if (r.ok) {
//         r.json().then((user) => setUser(user));
//       }
//     });
//   }, []); 

//   return (
//     <>
//     <div>
//       <BrowserRouter>
//       <NavBar/>
//       <h1 className="Logo">LetsLink</h1>
//         <Routes>
//           <Route path='/' element={<Login onLogin={setUser}/>}/>
//           <Route path='/main-page' element={<MainPage user={user} setUser={setUser}/>} />
//         </Routes>
//       </BrowserRouter>
//     </div>
      
//     </>
//   )
// }

// export default App
