import { Link } from "react-router-dom"
import * as usersService from "../../utilities/users-service"

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    // Delegate to the users-service:
    usersService.logOut();
    setUser(null);
  } 
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Welcome, {user.name}</span>
        <Link className="nav-link" to="/orders">Order History</Link>
        &nbsp; | &nbsp;
        <Link className="nav-link" to="/orders/new">New Order</Link>
        &nbsp; | &nbsp;
        {/* 'Log Out' could be a Link or a button depending on desired look. */}
        <Link className="nav-link" to="" onClick={handleLogOut}>Log Out</Link>
      </div>
    </nav>
  )
}