import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import {
  loadSong,
  deleteSong,
  changeSongAuthor,
  changeSongPoet,
  changeSongArtist,
} from "../../actions/songActions";
import { loadKeys } from "../../actions/keyActions";
import { loadGenres } from "../../actions/genreActions";
import { loadAuthors } from "../../actions/authorActions";
import { loadPoets } from "../../actions/poetActions";
import { loadArtists } from "../../actions/artistActions";
import { expandSong } from "./helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../../security/AuthContext";
import { createMarkup } from "../../core/helper";
import confirm from "../confirm";
import { formatLyrics, transpose, transposeLyrics } from "./Song.js";
import "./Song.css";

const MIN_FONT_SIZE = 1;
const MAX_FONT_SIZE = 1.4;

const SCROLL_STEP = 2;
const SCROLL_TIMEOUT = 250; // ms

let scrollTimer;
let scrollTop;

export function ViewSongPage({
  song,
  keys,
  genres,
  authors,
  poets,
  artists,
  isLoading,
  loadSong,
  loadKeys,
  loadGenres,
  loadAuthors,
  loadPoets,
  loadArtists,
  changeSongAuthor,
  changeSongPoet,
  changeSongArtist,
  deleteSong,
  history,
  ...props
}) {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  let [fontSize, setFontSize] = useState(MIN_FONT_SIZE);
  let [key, setKey] = useState("");
  let [lyrics, setLyrics] = useState("");

  // Page load
  useEffect(() => {
    if (!keys) loadKeys();
    if (!genres) loadGenres();

    if (!authors) loadAuthors();
    if (!poets) loadPoets();
    if (!artists) loadArtists();

    const slug = props.match.params.slug;
    if (slug) {
      if (!song || song.slug !== slug) loadSong(slug);
    } else throw new Error("Slug is required");
  }, []);

  // Song loaded
  useEffect(() => {
    if (song) {
      setKey(song.key.name);
      setLyrics(song.lyrics);
    }
  }, [song]);

  function changeFontSize() {
    if (fontSize >= MAX_FONT_SIZE) setFontSize(MIN_FONT_SIZE);
    else setFontSize(fontSize + 0.1);
  }

  function changeKey(key, step) {
    setKey(transpose(key, step));
    setLyrics(transposeLyrics(lyrics, step));
  }

  function toggleScrolling() {
    if (scrollTimer) stopScrolling();
    else startScrolling();
  }

  function stopScrolling() {
    if (scrollTimer) {
      clearTimeout(scrollTimer);
      scrollTimer = null;
    }
  }

  function startScrolling() {
    window.scrollBy(0, SCROLL_STEP);

    const doc = document.documentElement;
    const newScrollTop =
      (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    if (scrollTop != null && newScrollTop == scrollTop) {
      stopScrolling();
    } else {
      scrollTop = newScrollTop;
      scrollTimer = setTimeout(() => {
        startScrolling();
      }, SCROLL_TIMEOUT);
    }
  }

  function print(song) {
    let html = `<html><head>
        <title>${song.name}</title>
    </head>
    <body>
        <div style="font-size: 14px; font-family: 'Palatino Linotype';">
            <h2>${song.name}</h2>
            <p>Authors: <strong>${song.authors
              .map((a) => a.name)
              .join(", ")}</strong></p>
            <div>${formatLyrics(song.lyrics)}</div>
        </div>
    </body></html>`;
    let newWin = window.open("", "Print");
    newWin.document.write(html);
    newWin.document.close();
  }

  function handleEditSong(/*song*/) {}

  async function handleDeleteSong(song) {
    const result = await confirm.show({
      message: `Are you sure of delete '${song.name}'?`,
    });
    if (result) {
      deleteSong(song.id).then(() => history.push("/"));
    }
  }

  if (isLoading || !song)
    return (
      <div className="container">
        <Spinner />
      </div>
    );

  return (
    <div>
      <div>
        <span className="h3">{song.name}</span>
        {isAuthenticated && isAdmin && (
          <span className="align-text-bottom">
            <Link
              to={`/song/${song.slug}`}
              className="edit pl-2"
              title="Edit"
              data-toggle="tooltip"
              style={{ cursor: "pointer" }}
              onClick={() => handleEditSong(song)}
            >
              <FontAwesomeIcon icon="edit" color="#5cb85c" />
            </Link>
            <Link
              to=""
              className="delete pl-2"
              title="Delete"
              data-toggle="tooltip"
              style={{ cursor: "pointer" }}
              onClick={() => handleDeleteSong(song)}
            >
              <FontAwesomeIcon icon="trash" color="#d9534f" />
            </Link>
          </span>
        )}
      </div>
      <div className="py-1">
        <span className="pr-2">Author:</span>
        {song.authors.map((author, index) => {
          return (
            <Link
              key={author.id}
              to="/"
              onClick={() => changeSongAuthor(author)}
            >
              {(index ? ", " : "") + author.name}
            </Link>
          );
        })}
        {song.poets.length > 0 ? (song.authors.length > 0 ? ", " : "") : ""}
        {song.poets.map((poet, index) => {
          return (
            <React.Fragment key={poet.id}>
              <Link to="/" onClick={() => changeSongPoet(poet)}>
                {(index ? ", " : "") + poet.name}
              </Link>{" "}
              (poet)
            </React.Fragment>
          );
        })}
        {song.genre && (
          <>
            <span className="px-2">| Genre:</span>
            {song.genre.name}
          </>
        )}
        <span className="px-2">| Artists:</span>
        {song.artists.map((artist, index) => {
          return (
            <Link
              key={artist.id}
              to="/"
              onClick={() => changeSongArtist(artist)}
            >
              {(index ? ", " : "") + artist.name}
            </Link>
          );
        })}
      </div>
      <div id="toolbar" className="btn-toolbar mt-2">
        <div className="btn-group mr-1">
          <span
            className="btn btn-outline-secondary btn-sm"
            title="Transpose down"
            onClick={() => changeKey(key, -1)}
          >
            b
          </span>
          <span
            className="btn btn-outline-secondary btn-sm disabled"
            title="Key"
          >
            <span className="chord">{key}</span>
          </span>
          <span
            className="btn btn-outline-secondary btn-sm"
            title="Transpose up"
            onClick={() => changeKey(key, 1)}
          >
            #
          </span>
        </div>
        <div className="btn-group mr-1">
          <span
            className="btn btn-outline-secondary btn-sm"
            title="Auto scroll"
            onClick={() => toggleScrolling()}
          >
            <FontAwesomeIcon icon="arrow-down" />
          </span>
          <span
            className="btn btn-outline-secondary btn-sm"
            title="Font size"
            onClick={() => changeFontSize()}
          >
            <FontAwesomeIcon icon="font" />
          </span>
          <span
            className="btn btn-outline-secondary btn-sm"
            title="Print"
            onClick={() => print(song)}
          >
            <FontAwesomeIcon icon="print" />
          </span>
        </div>
      </div>
      <div
        id="lyrics"
        className="mt-2"
        style={{ fontSize: `${fontSize.toFixed(1)}rem` }}
        dangerouslySetInnerHTML={createMarkup(formatLyrics(lyrics))}
      ></div>
    </div>
  );
}

ViewSongPage.propTypes = {
  song: PropTypes.object,
  keys: PropTypes.array,
  genres: PropTypes.array,
  authors: PropTypes.array,
  poets: PropTypes.array,
  artists: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  loadSong: PropTypes.func.isRequired,
  loadKeys: PropTypes.func.isRequired,
  loadGenres: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadPoets: PropTypes.func.isRequired,
  loadArtists: PropTypes.func.isRequired,
  changeSongAuthor: PropTypes.func.isRequired,
  changeSongPoet: PropTypes.func.isRequired,
  changeSongArtist: PropTypes.func.isRequired,
  deleteSong: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
  }),
};

function mapStateToProps(state) {
  const isLoading =
    !state.keys ||
    !state.genres ||
    !state.authors ||
    !state.poets ||
    !state.artists ||
    !state.song;

  const expandedSong = !isLoading ? expandSong(state.song, state) : null;

  return {
    song: expandedSong,
    keys: state.keys,
    genres: state.genres,
    authors: state.authors,
    poets: state.poets,
    artists: state.artists,
    isLoading,
  };
}

const mapDispatchToProps = {
  loadSong,
  loadKeys,
  loadGenres,
  loadAuthors,
  loadPoets,
  loadArtists,
  changeSongAuthor,
  changeSongPoet,
  changeSongArtist,
  deleteSong,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSongPage);
