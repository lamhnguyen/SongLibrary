import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../../security/AuthContext";
import * as constants from "../../constants";

const renderTableHeader = (
  header,
  width,
  name,
  sort,
  order,
  onChangeSortOrder
) => {
  const isSortable = name ? true : false;
  const isSorted = name === sort;

  const icon =
    name == sort
      ? order == constants.ORDER_ASC
        ? "sort-down"
        : "sort-up"
      : "sort";
  const color = isSorted ? "black" : "gray";

  return (
    <th style={{ width }}>
      {header}
      {isSortable && (
        <span
          title="Sort"
          style={{ float: "right", cursor: "pointer" }}
          onClick={() =>
            onChangeSortOrder(
              name,
              isSorted
                ? order === constants.ORDER_ASC
                  ? constants.ORDER_DESC
                  : constants.ORDER_ASC
                : constants.ORDER_ASC
            )
          }
        >
          <FontAwesomeIcon icon={icon} color={color} />
        </span>
      )}
    </th>
  );
};

const SongList = ({
  songs,
  sort,
  order,
  onChangeAuthor,
  onChangePoet,
  onChangeArtist,
  onChangeSortOrder,
}) => {
  const auth = useContext(AuthContext);

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            {renderTableHeader(
              "Name",
              "50%",
              constants.SORT_BY_NAME,
              sort,
              order,
              onChangeSortOrder
            )}
            {renderTableHeader("Authors", "17%")}
            {renderTableHeader("Artists", "17%")}
            {renderTableHeader(
              "Likes",
              "8%",
              constants.SORT_BY_LIKES,
              sort,
              order,
              onChangeSortOrder
            )}
            {renderTableHeader(
              "Views",
              "8%",
              constants.SORT_BY_VIEWS,
              sort,
              order,
              onChangeSortOrder
            )}
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
                  {auth.isAuthenticated() && auth.isAdmin() && (
                    <>
                      <a
                        className="edit pl-2"
                        title="Edit"
                        data-toggle="tooltip"
                      >
                        <FontAwesomeIcon icon="edit" color="#5cb85c" />
                      </a>
                      <a
                        className="delete pl-2"
                        title="Delete"
                        data-toggle="tooltip"
                      >
                        <FontAwesomeIcon icon="trash" color="#d9534f" />
                      </a>
                    </>
                  )}
                  <br />
                  <em>{song.preview}...</em>
                </td>
                <td>
                  {song.authors.map((author, index) => {
                    return (
                      <Link
                        key={author.id}
                        to="/"
                        onClick={() => onChangeAuthor(author)}
                      >
                        {(index ? ", " : "") + author.name}
                      </Link>
                    );
                  })}
                  {song.poets.length > 0
                    ? song.authors.length > 0
                      ? ", "
                      : ""
                    : ""}
                  {song.poets.map((poet, index) => {
                    return (
                      <React.Fragment key={poet.id}>
                        <Link to="/" onClick={() => onChangePoet(poet)}>
                          {(index ? ", " : "") + poet.name}
                        </Link>{" "}
                        (poet)
                      </React.Fragment>
                    );
                  })}
                </td>
                <td>
                  {song.artists.map((artist, index) => {
                    return (
                      <Link
                        key={artist.id}
                        to="/"
                        onClick={() => onChangeArtist(artist)}
                      >
                        {(index ? ", " : "") + artist.name}
                      </Link>
                    );
                  })}
                </td>
                <td>{song.likes}</td>
                <td>{song.views}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

SongList.propTypes = {
  songs: PropTypes.array.isRequired,
  sort: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  onChangeAuthor: PropTypes.func.isRequired,
  onChangePoet: PropTypes.func.isRequired,
  onChangeArtist: PropTypes.func.isRequired,
  onChangeSortOrder: PropTypes.func.isRequired,
};

export default SongList;
