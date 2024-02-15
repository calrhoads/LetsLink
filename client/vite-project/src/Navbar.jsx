import React from "react";
import { Link , useNavigate } from "react-router-dom";

function NavBar({ user, setUser }) {
    const navigate = useNavigate()
    
    function handleLogoutClick() {
        fetch("/api/logout", { method: "DELETE" }).then((r) => {
        if (r.ok) {
            setUser(null);
            navigate('/')
        }
        });
    } 
//   console.log(user)

  return (
    <nav className="Navbar">
      <div className="Navbar__left">
        <Link to="/main-page" className="mainPageButton">Main Page</Link>
        <Link to="/matches" className="matchesButton">Matches</Link> 
        <Link to="/my_profile" className="profileButton">My Profile</Link>
      </div>
      <div className="Navbar__right">
        {user ? 
          <button className="Logout" onClick={() => { handleLogoutClick() }}>
            Logout
          </button>
         : null }
      </div>
    </nav>
  );
}

export default NavBar;


// import React from "react";
// import { Link } from "react-router-dom";
// import Matches from "./Matches";

// function NavBar({ user, setUser }) {
//   function handleLogoutClick() {
//     fetch("/logout", { method: "DELETE" }).then((r) => {
//       if (r.ok) {
//         setUser(null);
//       }
//     });
//   }

//   return (
//     <nav className="Navbar">
//       <div>
//         <Link to="/">Logout</Link>
//       </div>
//       <div>
//         {user && (
//           <button className="Logout" onClick={handleLogoutClick}>
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default NavBar;