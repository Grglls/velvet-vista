import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import * as usersService from "../utilities/users-service";

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  function handleChange(event) {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
    setError('');
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      // The promise returned by the login service method
      // will resolve to the user object included in the
      // payload of the JSON web token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
      navigate('/'); // Navigate to the home page after successful login.
    } catch {
      setError('Log In failed - try again.');
    }
  };

  return (
    <div>
      <div className="container-sm mw-100" style={{width: '400px'}}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" type="email" name="email" value={credentials.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input className="form-control" type="password" name="password" value={credentials.password} onChange={handleChange} required />
          </div>
          <button className="btn btn-primary" type="submit">Log In</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}