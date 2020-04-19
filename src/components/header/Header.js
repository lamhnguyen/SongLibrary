import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-xl navbar-light bg-light sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand">
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
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="#"
                id="menuUser"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon="user" />
              </Link>
              <div className="dropdown-menu m-0" aria-labelledby="menuUser">
                <Link className="dropdown-item" to="#" rel="nofollow">
                  Sign in
                </Link>
                <Link className="dropdown-item" to="#" rel="nofollow">
                  Sign up
                </Link>
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
