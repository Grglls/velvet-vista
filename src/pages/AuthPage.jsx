import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import { useState } from "react";

export default function AuthPage ({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main className="d-flex flex-column">
      <h1 className="my-3 mx-auto">Log In or Sign Up</h1>
      <div className="mx-auto">
        <button
          onClick={() => setShowLogin(!showLogin)}
          className="btn btn-secondary mb-3"
        >
          { showLogin ? 'Sign Up' : 'Log In' }
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