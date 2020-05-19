import React, { useContext, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { resetApp } from "../../global";
import AuthContext from "../../security/AuthContext";
import { changeSongSearch, createSong } from "../../actions/songActions";
import "./Header.css";

export const Header = ({ search, changeSongSearch, createSong }) => {
  const { auth, isAuthenticated, isAdmin, name } = useContext(AuthContext);

  const [searchKeyword, setSearchKeyword] = useState(search || "");

  useEffect(() => {
    setSearchKeyword(search);
  }, [search]);

  function handleLogIn(e) {
    e.preventDefault();
    auth.login();
  }

  function handleLogOut(e) {
    e.preventDefault();
    auth.logout();
  }

  function handleChange(e) {
    setSearchKeyword(e.target.value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    changeSongSearch(searchKeyword);
  }

  return (
    <nav className="navbar navbar-expand-xl navbar-light bg-light sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand" onClick={resetApp}>
          <h3>Song Library</h3>
        </Link>
        <div className="navbar-collapse" id="navBarMenu">
          <ul className="navbar-nav mr-auto pr-4">
            {isAuthenticated && isAdmin && (
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
                <div className="dropdown-menu m-0" aria-labelledby="menuAdmin">
                  <Link
                    to="/Song"
                    className="dropdown-item"
                    rel="nofollow"
                    onClick={createSong}
                  >
                    Add Song
                  </Link>
                  <Link to="/Author" className="dropdown-item" rel="nofollow">
                    Manage Authors
                  </Link>
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
                <span className="px-1">{isAuthenticated && name}</span>
              </a>
              <div className="dropdown-menu m-0" aria-labelledby="menuUser">
                {isAuthenticated === false && (
                  <a
                    className="dropdown-item"
                    rel="nofollow"
                    onClick={(e) => handleLogIn(e)}
                  >
                    Log in
                  </a>
                )}
                {isAuthenticated && (
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
          <form
            className="d-inline my-auto float-left w-50"
            onSubmit={handleSearchSubmit}
          >
            <div className="input-group m-0">
              <input
                type="search"
                className="form-control biginput"
                placeholder="Search"
                value={searchKeyword}
                onChange={handleChange}
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
      </div>
    </nav>
  );
};

Header.propTypes = {
  search: PropTypes.string,
  changeSongSearch: PropTypes.func.isRequired,
  createSong: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    search: state.songFilter.search,
  };
}

const mapDispatchToProps = {
  changeSongSearch,
  createSong,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
