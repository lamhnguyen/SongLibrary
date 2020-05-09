import React from "react";
import { Link } from "react-router-dom";
import { resetApp } from "../../global";
import "./Footer.css";

const Header = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="float-left">
              &copy; 2014 - 2020{" "}
              <Link to="/" onClick={resetApp}>
                Home
              </Link>{" "}
              / <Link to="/about">About</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
