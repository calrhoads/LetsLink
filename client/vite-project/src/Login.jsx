import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Login({ onLogin }) {
    const [showLogin, setShowLogin] = useState(true);
  
    return (
      <div className="Wrapper">

        {showLogin ? (
          <>
            <LoginForm onLogin={onLogin} />
            <hr className="Divider" />
            <p>
              Don't have an account? &nbsp;
              <button className="login" onClick={() => setShowLogin(false)}>
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <>
            <SignupForm onLogin={onLogin} />
            <hr className="Divider" />
            <p className="Account">
              Already have an account? &nbsp;
              <button className="login" onClick={() => {setShowLogin(true)
            }}>
                Log In
              </button>
            </p>
          </>
        )}
      </div>
    );
  }
  
  export default Login;