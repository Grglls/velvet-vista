import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import { useState } from "react";

export default function AuthPage ({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main className="d-flex flex-column">
      <h1 className="my-3 mx-auto">Log In or Sign Up</h1>
      <div className="btn-group mb-3 container-sm mw-100" style={{width: '400px'}} role="group">
        <button 
          className={showLogin ? "btn btn-primary" : "btn btn-outline-primary"}
          onClick={() => setShowLogin(true)}
        >
          Log In
        </button>
        <button 
          className={!showLogin ? "btn btn-primary" : "btn btn-outline-primary"}
          onClick={() => setShowLogin(false)}
        >
          Sign Up
        </button>
      </div>

      { showLogin ? 
        <LoginForm setUser={setUser} />
        :
        <SignUpForm setUser={setUser} />
      }
    </main>
  );
}