import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isEqual } from "lodash";
import {
  loadSongs,
  changeSongView,
  changeSongAuthor,
  changeSongPoet,
  changeSongArtist,
  changeSongSortOrder,
  changeSongPage,
  changeSongPageSize,
  resetSongFilter,
} from "../../actions/songActions";
import SongFilter from "./SongFilter";
import SongList from "./SongList";
import Spinner from "../common/Spinner";
import Pagination from "../common/Pagination";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function SongsPage({
  songs,
  filter,
  isLoading,
  loadSongs,
  changeSongView,
  changeSongAuthor,
  changeSongPoet,
  changeSongArtist,
  changeSongSortOrder,
  changeSongPage,
  changeSongPageSize,
  resetSongFilter,
}) {
  const prevFilter = usePrevious(filter);

  useEffect(() => {
    if (songs.length === 0 || isEqual(prevFilter, filter) === false) {
      loadSongs(filter);
    }
  }, [songs, filter]);

  function handleChangeView(view) {
    changeSongView(view);
  }

  function handleChangePage(start) {
    changeSongPage(start);
  }

  function handleChangeAuthor(author) {
    changeSongAuthor(author);
  }

  function handleChangePoet(poet) {
    changeSongPoet(poet);
  }

  function handleChangeArtist(artist) {
    changeSongArtist(artist);
  }

  function handleChangeSortOrder(sort, order) {
    changeSongSortOrder(sort, order);
  }

  function handleChangePageSize(pageSize) {
    changeSongPageSize(pageSize);
  }

  function handleResetFilter() {
    resetSongFilter();
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
          onResetFilter={handleResetFilter}
        />
      </div>
      <div className="row pt-3">
        <SongList
          songs={songs}
          sort={filter.sort}
          order={filter.order}
          onChangeAuthor={handleChangeAuthor}
          onChangePoet={handleChangePoet}
          onChangeArtist={handleChangeArtist}
          onChangeSortOrder={handleChangeSortOrder}
        />
      </div>
      <div className="row d-flex justify-content-between">
        <Pagination
          start={filter.start}
          pageSize={filter.pageSize}
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
  changeSongView: PropTypes.func.isRequired,
  changeSongPage: PropTypes.func.isRequired,
  changeSongAuthor: PropTypes.func.isRequired,
  changeSongPoet: PropTypes.func.isRequired,
  changeSongArtist: PropTypes.func.isRequired,
  changeSongSortOrder: PropTypes.func.isRequired,
  changeSongPageSize: PropTypes.func.isRequired,
  resetSongFilter: PropTypes.func.isRequired,
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
  changeSongView,
  changeSongAuthor,
  changeSongPoet,
  changeSongArtist,
  changeSongSortOrder,
  changeSongPage,
  changeSongPageSize,
  resetSongFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(SongsPage);
