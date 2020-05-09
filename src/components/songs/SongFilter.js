import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const renderName = (name, value, onResetFilter) => {
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

const renderViewButton = (name, value, view, onChangeView) => {
  return (
    <button
      type="button"
      className={`btn btn-outline-primary btn-sm mr-1 ${
        view === value ? "disabled" : ""
      }`}
      {...(view === value ? { disabled: true } : {})}
      onClick={() => onChangeView(value)}
    >
      {name}
    </button>
  );
};

const renderViews = (view, onChangeView) => {
  return (
    <div>
      {renderViewButton("Random", "random", view, onChangeView)}
      {renderViewButton("New", "new", view, onChangeView)}
      {renderViewButton("Popular", "popular", view, onChangeView)}
      {renderViewButton("Like", "like", view, onChangeView)}
    </div>
  );
};

const SongFilter = ({
  view,
  author,
  poet,
  artist,
  onChangeView,
  onResetFilter,
}) => {
  if (author) return renderName("Author", author.name, onResetFilter);

  if (poet) return renderName("Poet", poet.name, onResetFilter);

  if (artist) return renderName("Artist", artist.name, onResetFilter);

  return renderViews(view, onChangeView);
};

SongFilter.propTypes = {
  view: PropTypes.string,
  author: PropTypes.object,
  poet: PropTypes.object,
  artist: PropTypes.object,
  onChangeView: PropTypes.func.isRequired,
  onResetFilter: PropTypes.func.isRequired,
};

export default SongFilter;
