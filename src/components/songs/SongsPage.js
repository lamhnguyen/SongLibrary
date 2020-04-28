import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  loadSongs,
  changeSongPage,
  changeSongPageSize,
} from "../../actions/songActions";
import SongFilter from "./SongFilter";
import SongList from "./SongList";
import Spinner from "../common/Spinner";
import Pagination from "../common/Pagination";

export function SongsPage({
  songs,
  filter,
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

  function handleChangeView(view) {
    loadSongs();
  }

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
        <SongFilter
          view={filter.view}
          author={filter.author}
          artist={filter.artist}
          poet={filter.poet}
          onChangeView={handleChangeView}
        />
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
  filter: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadSongs: PropTypes.func.isRequired,
  changeSongPage: PropTypes.func.isRequired,
  changeSongPageSize: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    songs: state.songs,
    filter: state.songFilter,
    isLoading: state.apiStatus.count > 0,
  };
}

const mapDispatchToProps = {
  loadSongs,
  changeSongPage,
  changeSongPageSize,
};

export default connect(mapStateToProps, mapDispatchToProps)(SongsPage);
