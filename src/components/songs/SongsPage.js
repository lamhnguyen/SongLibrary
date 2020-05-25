import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
  viewSong,
  editSong,
  deleteSong,
} from "../../actions/songActions";
import { loadKeys } from "../../actions/keyActions";
import { loadGenres } from "../../actions/genreActions";
import { loadAuthors } from "../../actions/authorActions";
import { loadPoets } from "../../actions/poetActions";
import { loadArtists } from "../../actions/artistActions";
import { expandSong } from "./helper";
import SongFilter from "./SongFilter";
import SongList from "./SongList";
import Spinner from "../common/Spinner";
import Pagination from "../common/Pagination";
import confirm from "../confirm";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function SongsPage({
  songs,
  keys,
  genres,
  authors,
  poets,
  artists,
  filter,
  isLoading,
  loadSongs,
  loadKeys,
  loadGenres,
  loadAuthors,
  loadPoets,
  loadArtists,
  changeSongView,
  changeSongAuthor,
  changeSongPoet,
  changeSongArtist,
  changeSongSortOrder,
  changeSongPage,
  changeSongPageSize,
  resetSongFilter,
  viewSong,
  editSong,
  deleteSong,
}) {
  const prevFilter = usePrevious(filter);

  // Page load
  useEffect(() => {
    if (!keys) loadKeys();
    if (!genres) loadGenres();

    if (!authors) loadAuthors();
    if (!poets) loadPoets();
    if (!artists) loadArtists();

    loadSongs(filter);
  }, []);

  // Filter changed
  useEffect(() => {
    if (filterChanged(prevFilter, filter) === true) {
      loadSongs(filter);
    }
  }, [filter]);

  function filterChanged(prevFilter, filter) {
    if (!prevFilter) return false;
    return (
      (prevFilter.author ? prevFilter.author.id : 0) !==
        (filter.author ? filter.author.id : 0) ||
      (prevFilter.poet ? prevFilter.poet.id : 0) !==
        (filter.poet ? filter.poet.id : 0) ||
      (prevFilter.artist ? prevFilter.artist.id : 0) !==
        (filter.artist ? filter.artist.id : 0) ||
      prevFilter.sort !== filter.sort ||
      prevFilter.order !== filter.order ||
      prevFilter.start !== filter.start ||
      prevFilter.search !== filter.search ||
      prevFilter.view !== filter.view ||
      prevFilter.pageSize !== filter.pageSize
    );
  }

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

  async function handleViewSong(song) {
    viewSong(song);
  }

  async function handleEditSong(song) {
    editSong(song);
  }

  async function handleDeleteSong(song) {
    const result = await confirm.show({
      message: `Are you sure of delete '${song.name}'?`,
    });
    if (result) {
      deleteSong(song.id);
    }
  }

  if (isLoading)
    return (
      <div className="container">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="container">
        <div className="row">
          <SongFilter
            view={filter.view}
            author={filter.author}
            artist={filter.artist}
            poet={filter.poet}
            search={filter.search}
            onChangeView={handleChangeView}
            onResetFilter={handleResetFilter}
          />
        </div>
        <div className="row pt-3">
          <SongList
            songs={songs || []}
            sort={filter.sort}
            order={filter.order}
            onChangeAuthor={handleChangeAuthor}
            onChangePoet={handleChangePoet}
            onChangeArtist={handleChangeArtist}
            onChangeSortOrder={handleChangeSortOrder}
            onViewSong={handleViewSong}
            onEditSong={handleEditSong}
            onDeleteSong={handleDeleteSong}
          />
        </div>
        <div className="row">
          <Pagination
            start={filter.start}
            pageSize={filter.pageSize}
            onChangePage={handleChangePage}
            onChangePageSize={handleChangePageSize}
          />
        </div>
      </div>
    </>
  );
}

SongsPage.propTypes = {
  songs: PropTypes.array,
  keys: PropTypes.array,
  genres: PropTypes.array,
  authors: PropTypes.array,
  poets: PropTypes.array,
  artists: PropTypes.array,
  filter: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadSongs: PropTypes.func.isRequired,
  loadKeys: PropTypes.func.isRequired,
  loadGenres: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadPoets: PropTypes.func.isRequired,
  loadArtists: PropTypes.func.isRequired,
  changeSongView: PropTypes.func.isRequired,
  changeSongPage: PropTypes.func.isRequired,
  changeSongAuthor: PropTypes.func.isRequired,
  changeSongPoet: PropTypes.func.isRequired,
  changeSongArtist: PropTypes.func.isRequired,
  changeSongSortOrder: PropTypes.func.isRequired,
  changeSongPageSize: PropTypes.func.isRequired,
  resetSongFilter: PropTypes.func.isRequired,
  viewSong: PropTypes.func.isRequired,
  editSong: PropTypes.func.isRequired,
  deleteSong: PropTypes.func.isRequired,
};

function isLoaded(state) {
  return (
    state.keys &&
    state.genres &&
    state.authors &&
    state.poets &&
    state.artists &&
    state.songs
  );
}

function mapStateToProps(state) {
  const expandedSongs = isLoaded(state)
    ? state.songs.map((s) => expandSong(s, state))
    : [];
  return {
    songs: expandedSongs,
    keys: state.keys,
    genres: state.genres,
    authors: state.authors,
    poets: state.poets,
    artists: state.artists,
    filter: state.songFilter,
    isLoading: state.apiStatus.count > 0,
  };
}

const mapDispatchToProps = {
  loadSongs,
  loadKeys,
  loadGenres,
  loadAuthors,
  loadPoets,
  loadArtists,
  changeSongView,
  changeSongAuthor,
  changeSongPoet,
  changeSongArtist,
  changeSongSortOrder,
  changeSongPage,
  changeSongPageSize,
  resetSongFilter,
  viewSong,
  editSong,
  deleteSong,
};

export default connect(mapStateToProps, mapDispatchToProps)(SongsPage);
