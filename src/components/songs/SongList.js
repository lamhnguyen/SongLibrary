import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SongList = ({ songs }) => (
  <>
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th style={{ width: "50%" }}>
              Name <FontAwesomeIcon icon="sort" />
            </th>
            <th style={{ width: "15%" }}>
              Authors <FontAwesomeIcon icon="sort" />
            </th>
            <th style={{ width: "15%" }}>
              Artists <FontAwesomeIcon icon="sort" />
            </th>
            <th style={{ width: "7%" }}>
              <FontAwesomeIcon icon="thumbs-up" />{" "}
              <FontAwesomeIcon icon="sort" />
            </th>
            <th style={{ width: "7%" }}>
              <FontAwesomeIcon icon="eye" /> <FontAwesomeIcon icon="sort" />
            </th>
            <th style={{ width: "7%" }} />
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => {
            return (
              <tr key={song.id}>
                <td>
                  <Link to="#">
                    <strong>{song.name}</strong>
                  </Link>
                  <br />
                  <em>{song.preview}...</em>
                </td>
                <td>
                  {song.authors.map((author, index) => {
                    return (
                      <Link key={author.id} to={"/song?author=" + author.slug}>
                        {(index ? ", " : "") + author.name}
                      </Link>
                    );
                  })}
                  {song.poets.length > 0
                    ? (song.authors.length > 0 ? ", " : "") + "poets: "
                    : ""}
                  {song.poets.map((poet, index) => {
                    return (
                      <Link key={poet.id} to={"/song?poet=" + poet.slug}>
                        {(index ? ", " : "") + poet.name}
                      </Link>
                    );
                  })}
                </td>
                <td>
                  {song.artists.map((artist, index) => {
                    return (
                      <Link key={artist.id} to={"/song?artist=" + artist.slug}>
                        {(index ? ", " : "") + artist.name}
                      </Link>
                    );
                  })}
                </td>
                <td>{song.likes}</td>
                <td>{song.views}</td>
                <td>
                  <a className="edit" title="Edit" data-toggle="tooltip">
                    <FontAwesomeIcon icon="edit" color="#5cb85c" />
                  </a>{" "}
                  <a className="delete" title="Delete" data-toggle="tooltip">
                    <FontAwesomeIcon icon="trash" color="#d9534f" />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </>
);

SongList.propTypes = {
  songs: PropTypes.array.isRequired,
};

export default SongList;
