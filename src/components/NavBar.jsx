import { Link } from "react-router-dom"
import * as usersService from "../utilities/users-service"
import { useRef, useState } from "react"

export default function NavBar({ user, setUser, categories, cart, handleSearch }) {
  const collapseRef = useRef(null);
  const [ searchTerm, setSearchTerm ] = useState("");

  function handleLogOut() {
    // Delegate to the users-service:
    usersService.logOut();
    setUser(null);
    handleCollapse();
  }

  function handleCollapse() {
    // Only collapse if the element is visible (i.e., in mobile view)
    if (collapseRef.current && window.getComputedStyle(collapseRef.current).display !== "none") {
      // Bootstrap 5 uses Collapse class on the element
      const collapse = window.bootstrap?.Collapse 
        ? new window.bootstrap.Collapse(collapseRef.current, { toggle: false }) 
        : null;
      collapse?.hide();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleSearch(searchTerm);
  }

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" onClick={handleCollapse}>
          <img src="/favicon.ico" alt="Logo" width="24" height="24" className="d-inline-block align-text-top" />
          &nbsp;
          Velvet Vista
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={collapseRef}>
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={handleCollapse}>Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Clothing
              </a>
              <ul className="dropdown-menu">
                {categories.map((cat, index) => 
                  <li key={index}>
                    <Link to={`/category/${cat}`} className="dropdown-item" onClick={handleCollapse}>{cat}</Link>
                  </li>
                )}
              </ul>
            </li>
            { (user) ? 
              <>
                <li className="nav-item">
                  <Link to="/orders" className="nav-link" onClick={handleCollapse}>Order History</Link>
                </li>
                <li className="nav-item">
                  <Link to="/orders/cart" className="nav-link" onClick={handleCollapse}>
                    Cart
                    &nbsp;
                    { cart && <span className="badge text-bg-secondary"> {cart.totalQuantity}</span>}
                  </Link>
                </li>
                <li className="nav-item d-flex">
                  <Link to="/" className="nav-link" onClick={handleLogOut}>Log Out</Link>
                </li>
              </>
              :
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={handleCollapse}>Login</Link>
              </li>
            }
          </ul>
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              name="searchTerm"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit" onClick={handleCollapse}>Search</button>
          </form>
        </div>
      </div>
    </nav>
  )
}