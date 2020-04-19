import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Header = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="float-left">
              &copy; 2014 - 2020 <Link href="/">Home</Link> /{" "}
              <Link href="/about">About</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
