import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  loadSongs,
  changeSongPage,
  changeSongPageSize,
} from "../../actions/songActions";
import SongList from "./SongList";
import Spinner from "../common/Spinner";
import Pagination from "../common/Pagination";

export function SongsPage({
  songs,
  isLoading,
  loadSongs,
  changeSongPage,
  changeSongPageSize,
}) {
  useEffect(() => {
    if (songs.length === 0) {
      loadSongs();
    }
  }, [songs]);

  function handleChangePage(start) {
    changeSongPage(start);

    loadSongs();
  }

  function handleChangePageSize(pageSize) {
    changeSongPageSize(pageSize);

    loadSongs();
  }

  if (isLoading)
    return (
      <div className="container">
        <Spinner />
      </div>
    );

  return (
    <div className="container">
      <div className="row">
        <button type="button" className="btn btn-outline-primary btn-sm mr-1">
          <Link to="/song?list=new">New</Link>
        </button>
        <button type="button" className="btn btn-outline-secondary btn-sm mr-1">
          <Link to="/song?list=popular">Popular</Link>
        </button>
        <button type="button" className="btn btn-outline-success btn-sm mr-1">
          <Link to="/song?list=recent">Recent</Link>
        </button>
        <button type="button" className="btn btn-outline-danger btn-sm mr-1">
          <Link to="/song?list=like">Like</Link>
        </button>
        <button type="button" className="btn btn-outline-warning btn-sm mr-1">
          <Link to="/song?list=random">Random</Link>
        </button>
      </div>
      <div className="row pt-3">
        <SongList songs={songs} />
      </div>
      <div className="row d-flex justify-content-between">
        <Pagination
          start="0"
          pageSize="25"
          onChangePage={handleChangePage}
          onChangePageSize={handleChangePageSize}
        />
      </div>
    </div>
  );
}

SongsPage.propTypes = {
  songs: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadSongs: PropTypes.func.isRequired,
  changeSongPage: PropTypes.func.isRequired,
  changeSongPageSize: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    songs: state.songs,
    isLoading: state.apiStatus.count > 0,
  };
}

const mapDispatchToProps = {
  loadSongs,
  changeSongPage,
  changeSongPageSize,
};

export default connect(mapStateToProps, mapDispatchToProps)(SongsPage);
