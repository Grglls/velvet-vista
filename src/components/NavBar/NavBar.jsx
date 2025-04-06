import { Link } from "react-router-dom"
import * as usersService from "../../utilities/users-service"

export default function NavBar({ user, setUser, categories, cart }) {
  function handleLogOut() {
    // Delegate to the users-service:
    usersService.logOut();
    setUser(null);
  }
  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src="/favicon.ico" alt="Logo" width="24" height="24" className="d-inline-block align-text-top" />
          &nbsp;
          Velvet Vista
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Clothing
              </a>
              <ul className="dropdown-menu">
                {categories.map((cat, index) => 
                  <li key={index}>
                    <Link to={`/category/${cat}`} className="dropdown-item" >{cat}</Link>
                  </li>
                )}
              </ul>
            </li>
            { (user) ? 
              <>
                <li className="nav-item">
                  <Link to="/orders" className="nav-link">Order History</Link>
                </li>
                <li className="nav-item">
                  <Link to="/orders/new" className="nav-link">
                    Cart
                    { cart && <span> ({cart.totalQuantity})</span>}
                  </Link>
                </li>
                <li className="nav-item d-flex">
                  <Link to="/" className="nav-link" onClick={handleLogOut}>Log Out</Link>
                </li>
              </>
              :
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}