import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { resetApp } from "../../global";
import AuthContext from "../../security/AuthContext";
import "./Header.css";

const Header = () => {
  const auth = useContext(AuthContext);

  function handleLogIn(e) {
    e.preventDefault();
    auth.login();
  }

  function handleLogOut(e) {
    e.preventDefault();
    auth.logout();
  }

  return (
    <nav className="navbar navbar-expand-xl navbar-light bg-light sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand" onClick={resetApp}>
          <h3>Song Library</h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="menu">
          <ul className="navbar-nav mr-auto pr-4">
            {auth.isAuthenticated() && auth.isAdmin() && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="menuAdmin"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon="edit" />
                  <span className="px-1">Admin</span>
                </a>
                <div className="dropdown-menu m-0" aria-labelledby="menuUser">
                  <a className="dropdown-item" rel="nofollow">
                    Manage Authors
                  </a>
                  <a className="dropdown-item" rel="nofollow">
                    Manage Poets
                  </a>
                  <a className="dropdown-item" rel="nofollow">
                    Manage Artists
                  </a>
                </div>
              </li>
            )}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="menuUser"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon="user" />
                <span className="px-1">
                  {auth.isAuthenticated() && auth.getName()}
                </span>
              </a>
              <div className="dropdown-menu m-0" aria-labelledby="menuUser">
                {auth.isAuthenticated() == false && (
                  <a
                    className="dropdown-item"
                    rel="nofollow"
                    onClick={(e) => handleLogIn(e)}
                  >
                    Log in
                  </a>
                )}
                {auth.isAuthenticated() && (
                  <a
                    className="dropdown-item"
                    to="#"
                    rel="nofollow"
                    onClick={(e) => handleLogOut(e)}
                  >
                    Log out
                  </a>
                )}
              </div>
            </li>
          </ul>
        </div>
        <form className="d-inline my-auto float-left w-50" method="get">
          <div className="input-group m-0">
            <input
              type="search"
              className="form-control biginput"
              placeholder="Search"
            ></input>
            <span className="input-group-append">
              <button
                className="btn btn-primary border border-left-0"
                type="submit"
              >
                <FontAwesomeIcon icon="search" />
              </button>
            </span>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Header;
