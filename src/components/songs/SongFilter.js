import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SongList = (view, author, poet, artist) => (
  <div>
    <button type="button" className="btn btn-outline-warning btn-sm mr-1">
      <Link to="/song?view=random">Random</Link>
    </button>
    <button type="button" className="btn btn-outline-primary btn-sm mr-1">
      <Link to="/song?view=new">New</Link>
    </button>
    <button type="button" className="btn btn-outline-secondary btn-sm mr-1">
      <Link to="/song?view=popular">Popular</Link>
    </button>
    <button type="button" className="btn btn-outline-danger btn-sm mr-1">
      <Link to="/song?view=like">Like</Link>
    </button>
  </div>
);

SongList.propTypes = {
  view: PropTypes.string,
  author: PropTypes.string,
  poet: PropTypes.string,
  artist: PropTypes.string,
};

export default SongList;
