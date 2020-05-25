import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Filter = ({ name, value, onResetFilter }) => {
  return (
    <div className="p-0">
      <p className="m-0">
        {name}: <b>{value}</b>
        <span
          className="pl-2"
          title="Remove"
          style={{ cursor: "pointer" }}
          onClick={onResetFilter}
        >
          <FontAwesomeIcon icon="times" color="gray" />
        </span>
      </p>
    </div>
  );
};

const ViewButton = ({ name, value, view, onChangeView }) => {
  return (
    <button
      type="button"
      className={`btn mr-1 ${view === value ? "disabled btn-primary" : ""}`}
      {...(view === value ? { disabled: true } : {})}
      onClick={() => onChangeView(value)}
    >
      {name}
    </button>
  );
};

const Views = ({ view, onChangeView }) => {
  return (
    <div>
      <ViewButton
        name="Random"
        value="random"
        view={view}
        onChangeView={onChangeView}
      />
      <ViewButton
        name="New"
        value="new"
        view={view}
        onChangeView={onChangeView}
      />
      <ViewButton
        name="Popular"
        value="popular"
        view={view}
        onChangeView={onChangeView}
      />
      <ViewButton
        name="Like"
        value="like"
        view={view}
        onChangeView={onChangeView}
      />
    </div>
  );
};

const SongFilter = ({
  view,
  author,
  poet,
  artist,
  search,
  onChangeView,
  onResetFilter,
}) => {
  if (author)
    return (
      <Filter name="Author" value={author.name} onResetFilter={onResetFilter} />
    );

  if (poet)
    return (
      <Filter name="Poet" value={poet.name} onResetFilter={onResetFilter} />
    );

  if (artist)
    return (
      <Filter name="Artist" value={artist.name} onResetFilter={onResetFilter} />
    );

  if (search)
    return (
      <Filter name="Search" value={search} onResetFilter={onResetFilter} />
    );

  return <Views view={view} onChangeView={onChangeView} />;
};

Filter.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onResetFilter: PropTypes.func.isRequired,
};

ViewButton.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  view: PropTypes.string,
  onChangeView: PropTypes.func.isRequired,
};

Views.propTypes = {
  view: PropTypes.string,
  onChangeView: PropTypes.func.isRequired,
};

SongFilter.propTypes = {
  view: PropTypes.string,
  author: PropTypes.object,
  poet: PropTypes.object,
  artist: PropTypes.object,
  search: PropTypes.string,
  onChangeView: PropTypes.func.isRequired,
  onResetFilter: PropTypes.func.isRequired,
};

export default SongFilter;
